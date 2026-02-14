
// Hamburger meni
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
const mobileDropdownIcon = document.getElementById('mobile-dropdown-icon');

// Toggle mobilnog menija
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Toggle mobilnog padajućeg menija
mobileDropdownBtn.addEventListener('click', () => {
    mobileDropdownMenu.classList.toggle('hidden');
    mobileDropdownIcon.classList.toggle('rotate-180');
});

// Zatvori meni pri kliknjavanju na link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileDropdownMenu.classList.add('hidden');
        mobileDropdownIcon.classList.remove('rotate-180');
    });
});