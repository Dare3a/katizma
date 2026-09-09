
function handleTocState() {
    const toc = document.getElementById('toc-accordion');
    if (!toc) return;

    // Provera da li je ekran lg (1024px) ili širi
    if (window.innerWidth >= 1024) {
        toc.setAttribute('open', '');
    } else {
        toc.removeAttribute('open');
    }
}

// Pokreni pri učitavanju stranice
document.addEventListener('DOMContentLoaded', handleTocState);

// Opciono: ažuriraj ako korisnik menja veličinu prozora
window.addEventListener('resize', handleTocState);