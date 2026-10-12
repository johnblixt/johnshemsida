// Delad "tillbaka"-navigering för Juridik 1 (jur1_-filer)
// Går tillbaka i historiken om sidan nåddes via en länk på samma domän,
// annars faller den tillbaka till områdessidan som anges i `fallback`
// (eller startsidan index.html om ingen fallback skickas med).
function jur1GoBack(e, fallback) {
    if (e) e.preventDefault();
    var ref = document.referrer;
    if (ref) {
        try {
            if (new URL(ref).origin === window.location.origin) {
                history.back();
                return;
            }
        } catch (err) {}
    }
    window.location.href = fallback || 'index.html';
}
