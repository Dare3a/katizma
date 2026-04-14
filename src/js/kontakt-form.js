document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/[^0-9+()\/\s-]/g, '');
        });

        phoneInput.addEventListener('blur', () => {
            const value = phoneInput.value.trim();
            const phoneRegex = /^\+?[0-9][0-9\s()/-]{5,19}$/;

            if (value !== '' && !phoneRegex.test(value)) {
                phoneInput.setCustomValidity('Unesite ispravan broj telefona.');
                phoneInput.classList.add('border-rose-400/60', 'ring-2', 'ring-rose-400/20');
            } else {
                phoneInput.setCustomValidity('');
                phoneInput.classList.remove('border-rose-400/60', 'ring-2', 'ring-rose-400/20');
            }
        });
    }
    const state = window.contactFormState || null;
    const form = document.getElementById('kontakt-form');
    const statusBox = document.getElementById('form-status');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !statusBox) return;

    const fields = ['name', 'surname', 'phone', 'email', 'subject', 'message'];

    if (state && state.old && typeof state.old === 'object') {
        fields.forEach((field) => {
            const el = form.querySelector(`[name="${field}"]`);
            if (el && typeof state.old[field] === 'string') {
                el.value = state.old[field];
            }
        });
    }

    if (state && state.success === true) {
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
        statusBox.classList.remove('hidden');
    } else if (state && state.error) {
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
        statusBox.classList.remove('hidden');
    }

    if (!form.hasAttribute('novalidate')) {
        form.addEventListener('submit', function () {
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        });
    }

    if (statusBox.children.length > 0) {
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
    }
});