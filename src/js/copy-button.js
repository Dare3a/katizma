// Copy Link sa vizuelnom kvačicom
function copyArticleLink(btn) {
    if (!btn) return;

    const originalHTML = btn.innerHTML;

    // 1. Trenutna promena dugmeta na ekranu
    btn.innerHTML = `
    <svg viewBox="0 0 24 24" class="h-4 w-4 stroke-emerald-400 fill-none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span class="text-emerald-400 font-semibold">Kopirano!</span>
  `;
    btn.classList.add('border-emerald-500/50', 'bg-emerald-500/10');

    // 2. Kopiranje URL-a
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(window.location.href);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = window.location.href;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    } catch (e) {
        console.log('Kopiranje nije uspelo');
    }

    // 3. Vraćanje na staro posle 2 sekunde
    setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.classList.remove('border-emerald-500/50', 'bg-emerald-500/10');
    }, 2000);
}

// Globalna registracija za Vite / ES Modules
window.copyArticleLink = copyArticleLink;