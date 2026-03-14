const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
const mobileDropdownIcon = document.getElementById('mobile-dropdown-icon');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        hamburger.setAttribute('aria-expanded', String(!isHidden));
    });
}

if (mobileDropdownBtn && mobileDropdownMenu && mobileDropdownIcon) {
    mobileDropdownBtn.addEventListener('click', () => {
        const isHidden = mobileDropdownMenu.classList.toggle('hidden');
        mobileDropdownBtn.setAttribute('aria-expanded', String(!isHidden));
        mobileDropdownIcon.classList.toggle('rotate-180');
    });
}

if (mobileMenu && hamburger) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            hamburger.setAttribute('aria-expanded', 'false');

            if (mobileDropdownMenu && mobileDropdownBtn && mobileDropdownIcon) {
                mobileDropdownMenu.classList.add('hidden');
                mobileDropdownBtn.setAttribute('aria-expanded', 'false');
                mobileDropdownIcon.classList.remove('rotate-180');
            }
        });
    });
}