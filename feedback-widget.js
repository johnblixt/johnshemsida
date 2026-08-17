// Delad feedback-knapp för hela portalen.
// Bygger en mailto-länk med sidans titel och URL hämtade dynamiskt,
// så knappen fungerar likadant oavsett vilken sida den läggs på.
(function () {
    var FEEDBACK_EMAIL = 'john.blixt@praktiska.se';

    function initFeedbackWidget() {
        if (document.getElementById('feedback-widget-btn')) return;

        var wrap = document.createElement('div');
        wrap.style.cssText = 'margin-top:3rem;padding:1.5rem 1rem 2rem;text-align:center;border-top:1px solid #e2e8f0;';

        var btn = document.createElement('a');
        btn.id = 'feedback-widget-btn';
        btn.href = '#';
        btn.textContent = '✉️ Ge feedback på den här sidan';
        btn.style.cssText = "display:inline-block;font-family:'EB Garamond',serif;font-size:0.95rem;font-weight:700;color:#64748b;background:#f1f5f9;padding:0.6rem 1.4rem;border-radius:0.75rem;text-decoration:none;cursor:pointer;transition:background 0.2s ease,color 0.2s ease;";
        btn.addEventListener('mouseover', function () { btn.style.background = '#e2e8f0'; btn.style.color = '#475569'; });
        btn.addEventListener('mouseout', function () { btn.style.background = '#f1f5f9'; btn.style.color = '#64748b'; });

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var title = document.title || window.location.pathname;
            var url = window.location.href;
            var subject = 'Feedback: ' + title;
            var body = 'Hej John,\n\nJag har feedback på den här sidan:\n' + url + '\n\nMin feedback:\n';
            window.location.href = 'mailto:' + FEEDBACK_EMAIL
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);
        });

        wrap.appendChild(btn);
        document.body.appendChild(wrap);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeedbackWidget);
    } else {
        initFeedbackWidget();
    }
})();
