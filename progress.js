// Bestående elevprogress (localStorage) – delas av startsidan, områdessidorna och övningssidorna.
// Ett separat lager ovanpå sidornas sessionsbaserade rank och verifieringskod, som inte rörs:
// här sparas bara elevens bästa resultat per sida, och bara på den egna enheten.
//
//   JHProgress.getProgress(id)        → { rank, passed, attempted, pct, done, total, date } eller null
//   JHProgress.saveProgress(id, data) → sparar bara om resultatet är bättre än det sparade
//   JHProgress.resetAll()             → tar bort all sparad progress
//   JHProgress.render()               → fyller alla [data-jh-progress]-platshållare
//
// Sid-ID = filnamnet utan .html. Allt ligger under en enda nyckel, "jh_progress_v1".
// Är lagringen blockerad (inkognito, in-app-webbläsare) kastas inga fel – bara en console.warn.
(function () {
    var KEY = 'jh_progress_v1';
    var RANK_ORDER = { D: 1, C: 2, B: 3, A: 4, S: 5 };

    function warn(what, e) {
        try { console.warn('[JHProgress] ' + what, e); } catch (x) {}
    }

    // Samma ID oavsett om adressen är "/mapp/sida", "sida.html" eller har ?query/#hash (Netlify pretty URLs)
    function normId(id) {
        if (id === null || id === undefined) return '';
        var s = String(id).trim().split('#')[0].split('?')[0];
        s = s.replace(/\/+$/, '');
        s = s.substring(s.lastIndexOf('/') + 1);
        return s.replace(/\.html?$/i, '');
    }

    function readAll() {
        try {
            var raw = window.localStorage.getItem(KEY);
            var all = raw ? JSON.parse(raw) : null;
            if (all && typeof all === 'object' && !Array.isArray(all)) return all;
        } catch (e) {
            warn('kunde inte läsa ' + KEY, e);
        }
        return {};
    }

    function writeAll(all) {
        try {
            window.localStorage.setItem(KEY, JSON.stringify(all));
            return true;
        } catch (e) {
            warn('kunde inte spara ' + KEY, e);
            return false;
        }
    }

    function today() {
        var d = new Date();
        var m = d.getMonth() + 1;
        var day = d.getDate();
        return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
    }

    // Städar en post (inkommande eller redan sparad) till ett känt format
    function normalize(data) {
        if (!data || typeof data !== 'object') return null;
        var done = [];
        if (Array.isArray(data.done)) {
            for (var i = 0; i < data.done.length; i++) {
                if (typeof data.done[i] === 'string' && done.indexOf(data.done[i]) === -1) done.push(data.done[i]);
            }
        }
        var pct = Number(data.pct);
        var total = Number(data.total);
        return {
            rank: RANK_ORDER.hasOwnProperty(data.rank) ? data.rank : null,
            passed: data.passed === true,       // sidor utan rank-bokstav (klarat / inte klarat)
            attempted: data.attempted === true, // genomfört försök, även under gränsen
            pct: isFinite(pct) ? Math.max(0, Math.min(100, Math.round(pct))) : 0,
            done: done,
            total: total > 0 ? Math.round(total) : null,
            date: typeof data.date === 'string' ? data.date : null
        };
    }

    // Ett resultat räknas när det gett en rank, ett klarat prov eller ett genomfört försök
    function counts(entry) {
        return !!entry && (!!entry.rank || entry.passed || entry.attempted);
    }

    // En sparad post utan sådant resultat betyder att sidan inte är påbörjad
    function entryFrom(all, id) {
        if (!id || !Object.prototype.hasOwnProperty.call(all, id)) return null;
        var entry = normalize(all[id]);
        return counts(entry) ? entry : null;
    }

    // Bästa rank vinner. Därefter klarat före inte klarat, fler avklarade vyer, högre procent.
    function isBetter(next, prev) {
        var a = RANK_ORDER[next.rank] || 0;
        var b = RANK_ORDER[prev.rank] || 0;
        if (a !== b) return a > b;
        if (next.passed !== prev.passed) return next.passed;
        if (next.done.length !== prev.done.length) return next.done.length > prev.done.length;
        return next.pct > prev.pct;
    }

    function getProgress(id) {
        return entryFrom(readAll(), normId(id));
    }

    function saveProgress(id, data) {
        try {
            id = normId(id);
            var next = normalize(data);
            if (!id || !next) return false;
            var all = readAll();
            var prev = entryFrom(all, id);
            // Inget genomfört och inget sparat sedan tidigare: sidan räknas inte som påbörjad
            if (!prev && !counts(next)) return false;
            var improved = !prev || (counts(next) && isBetter(next, prev));
            var entry = improved ? next : prev;
            if (prev && !improved && counts(next)) entry.attempted = entry.attempted || next.attempted;
            entry.date = today();   // senast övad uppdateras även när resultatet inte var bättre
            all[id] = entry;
            var ok = writeAll(all);
            if (ok) render();
            return ok && improved;
        } catch (e) {
            warn('saveProgress(' + id + ') misslyckades', e);
            return false;
        }
    }

    function resetAll() {
        try { window.localStorage.removeItem(KEY); } catch (e) { warn('kunde inte nollställa ' + KEY, e); }
        render();
    }

    // Bygger en post av en begreppssidas sessionstillstånd ({ completed, best }).
    // pct = snittet av bästa procent över poängvyerna, där ogjorda vyer räknas som 0.
    // attempted = någon vy är klar eller har ett resultat (även under 80 %).
    function fromViews(progress, views, scoreViews, rank) {
        var completed = (progress && progress.completed) || {};
        var best = (progress && progress.best) || {};
        var done = [];
        var sum = 0;
        var tried = false;
        var i;
        for (i = 0; i < views.length; i++) {
            if (completed[views[i]]) done.push(views[i]);
        }
        for (i = 0; i < scoreViews.length; i++) {
            if (typeof best[scoreViews[i]] === 'number') tried = true;
            sum += Number(best[scoreViews[i]]) || 0;
        }
        return {
            rank: rank,
            attempted: done.length > 0 || tried,
            pct: scoreViews.length ? sum / scoreViews.length : 0,
            done: done,
            total: views.length
        };
    }

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Sidor med vyer visar "X/5 tester", sidor med bara en procentpoäng visar "bäst X %".
    // Badgen visar rank-bokstaven, ✓ om sidan saknar rank men är klarad, annars ingen badge.
    function chipHtml(entry, label) {
        var result = entry.total ? entry.done.length + '/' + entry.total + ' tester' : 'bäst ' + entry.pct + ' %';
        var badge = entry.rank || (entry.passed ? '✓' : '');
        var title = 'Ditt bästa resultat: '
            + (entry.rank ? 'rank ' + entry.rank : (entry.passed ? 'klarat' : 'påbörjat'))
            + ' · ' + result
            + (entry.total ? ' · ' + entry.pct + ' %' : '')
            + (entry.date ? ' · senast övad ' + entry.date : '');
        return '<span class="jh-chip" title="' + esc(title) + '">'
            + (badge ? '<span class="jh-rank">' + badge + '</span>' : '')
            + '<span>' + (label ? esc(label) + ' · ' : '') + result + '</span>'
            + '</span>';
    }

    var STYLE_ID = 'jh-progress-style';
    var STYLE = '[data-jh-progress]{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}'
        + '[data-jh-progress]:empty{display:none}'
        + '.jh-chip{display:inline-flex;align-items:center;gap:6px;font-size:.92rem;font-weight:700;line-height:1;white-space:nowrap;color:var(--jh-ink,#475569)}'
        + '.jh-rank{display:inline-flex;align-items:center;justify-content:center;min-width:1.55em;height:1.55em;padding:0 .3em;border-radius:.45em;font-size:.9em;background:var(--jh-c,#64748b);color:var(--jh-on,#fff)}';

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = STYLE;
        document.head.appendChild(style);
    }

    // Platshållare: <div data-jh-progress="id1,id2" data-jh-labels="Del 1|Del 2" style="--jh-c:#0891b2"></div>
    // Fylls med en chip per påbörjad sida och lämnas tom (dold) om inget är påbörjat.
    function render() {
        try {
            var els = document.querySelectorAll('[data-jh-progress]');
            if (!els.length) return;
            ensureStyle();
            var all = readAll();
            for (var i = 0; i < els.length; i++) {
                var ids = (els[i].getAttribute('data-jh-progress') || '').split(',');
                var labels = (els[i].getAttribute('data-jh-labels') || '').split('|');
                var html = '';
                for (var j = 0; j < ids.length; j++) {
                    var entry = entryFrom(all, normId(ids[j]));
                    if (entry) html += chipHtml(entry, (labels[j] || '').trim());
                }
                els[i].innerHTML = html;
            }
        } catch (e) {
            warn('render misslyckades', e);
        }
    }

    window.JHProgress = {
        KEY: KEY,
        normId: normId,
        getProgress: getProgress,
        saveProgress: saveProgress,
        resetAll: resetAll,
        fromViews: fromViews,
        render: render
    };

    // pageshow täcker både första laddningen och när eleven backar hit via bfcache.
    // visibilitychange fångar flikbyten, storage ändringar gjorda i en annan flik.
    document.addEventListener('DOMContentLoaded', function () { render(); });
    window.addEventListener('pageshow', function () { render(); });
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') render();
    });
    window.addEventListener('storage', function (e) {
        if (!e.key || e.key === KEY) render();
    });
})();
