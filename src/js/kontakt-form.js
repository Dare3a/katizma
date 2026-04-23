document.addEventListener('DOMContentLoaded', function () {
    // 1. Postavljanje vremena učitavanja (zaštita od botova)
    const timeField = document.getElementById('form_time');
    if (timeField) {
        timeField.value = Date.now();
    }

    // 2. Logika za telefon (samo brojevi i validacija)
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

    const form = document.getElementById('kontakt-form');
    const statusBox = document.getElementById('form-status');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !statusBox) return;

    // 3. GLAVNA IZMENA: Slanje forme putem Fetch API-ja
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // ZAUSTAVLJA odlazak na kontakt.php

        // Onemogući dugme da ne bi kliknuli dvaput
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = 'Slanje u toku...';
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('kontakt.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            // Čak i ako PHP vrati ceo HTML, response.ok će biti true
            if (response.ok) {
                form.reset();
                if (timeField) timeField.value = Date.now();

                // Prikazujemo tvoj dizajn za USPEH
                statusBox.className = 'rounded-2xl border border-teal-300/30 bg-teal-400/10 px-5 py-4 text-sm text-teal-100 shadow-[0_0_25px_rgba(45,212,191,0.16)] backdrop-blur';
                statusBox.innerHTML = `
                    <div class="flex items-start gap-3">
                        <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-300 text-slate-950 font-bold">✓</div>
                        <div>
                            <p class="font-medium text-teal-200">Uspešno poslato</p>
                            <p class="mt-1 text-teal-100/80">Vaša poruka je uspešno poslata. Kontaktiraćemo vas u najkraćem roku.</p>
                        </div>
                    </div>
                `;
                statusBox.classList.remove('hidden');
            } else {
                throw new Error('Greška');
            }
        } catch (error) {
            // Prikazujemo tvoj dizajn za GREŠKU
            statusBox.className = 'rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.14)] backdrop-blur';
            statusBox.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-400 text-slate-950 font-bold">!</div>
                    <div>
                        <p class="font-medium text-rose-200">Slanje nije uspelo</p>
                        <p class="mt-1 text-rose-100/80">Došlo je do tehničke greške. Pokušajte ponovo kasnije.</p>
                    </div>
                </div>
            `;
            statusBox.classList.remove('hidden');
        } finally {
            // Vraćamo dugme u život i skrolujemo do poruke
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Pošalji poruku';
            }
            setTimeout(() => {
                statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });

    // 4. Fallback (za svaki slučaj ako ostane neki stari state)
    const state = window.contactFormState || null;
    if (state && state.success) {
        // Ovo će se aktivirati samo ako se stranica ipak nekim čudom osveži
    }
});