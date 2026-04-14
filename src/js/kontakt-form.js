document.addEventListener('DOMContentLoaded', function () {
    const state = window.contactFormState || null;
    const form = document.getElementById('kontakt-form');
    const statusBox = document.getElementById('form-status');

    if (!form || !statusBox || !state) return;

    const fields = ['name', 'surname', 'phone', 'email', 'subject', 'message'];

    if (state.old && typeof state.old === 'object') {
        fields.forEach((field) => {
            const el = form.querySelector(`[name="${field}"]`);
            if (el && typeof state.old[field] === 'string') {
                el.value = state.old[field];
            }
        });
    }

    if (state.success === true) {
        form.reset();

        statusBox.className = 'rounded-2xl border border-teal-300/30 bg-teal-400/10 px-5 py-4 text-sm text-teal-100 shadow-[0_0_25px_rgba(45,212,191,0.16)] backdrop-blur';
        statusBox.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-300 text-slate-950 font-bold">
                    ✓
                </div>
                <div>
                    <p class="font-medium text-teal-200">Uspešno poslato</p>
                    <p class="mt-1 text-teal-100/80">Vaša poruka je uspešno poslata. Kontaktiraćemo vas u najkraćem roku.</p>
                </div>
            </div>
        `;
    } else if (state.error) {
        statusBox.className = 'rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.14)] backdrop-blur';
        statusBox.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-400 text-slate-950 font-bold">
                    !
                </div>
                <div>
                    <p class="font-medium text-rose-200">Slanje nije uspelo</p>
                    <p class="mt-1 text-rose-100/80">${state.error}</p>
                </div>
            </div>
        `;
    } else {
        return;
    }

    statusBox.classList.remove('hidden');

    setTimeout(() => {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
});