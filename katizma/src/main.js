
// Hamburger meni
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
const mobileDropdownIcon = document.getElementById('mobile-dropdown-icon');

// Toggle mobilnog menija
hamburger.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    hamburger.setAttribute('aria-expanded', String(!isHidden));
});

// Toggle mobilnog padajućeg menija
mobileDropdownBtn.addEventListener('click', () => {
    const isHidden = mobileDropdownMenu.classList.toggle('hidden');
    mobileDropdownBtn.setAttribute('aria-expanded', String(!isHidden));
    mobileDropdownIcon.classList.toggle('rotate-180');
});

// Zatvori meni pri kliknjavanju na link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');

        mobileDropdownMenu.classList.add('hidden');
        mobileDropdownBtn.setAttribute('aria-expanded', 'false');

        mobileDropdownIcon.classList.remove('rotate-180');
    });
});