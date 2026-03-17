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

const desktopServicesItem = document.getElementById('desktop-services-item');
const desktopServicesBtn = document.getElementById('desktop-services-btn');
const desktopDropdownMenu = document.getElementById('desktop-dropdown-menu');
const desktopServicesIcon = document.getElementById('desktop-services-icon');
let dropdownTimeout;

function openDesktopDropdown() {
    if (!desktopDropdownMenu || !desktopServicesBtn || !desktopServicesIcon) return;

    desktopDropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    desktopDropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
    desktopServicesBtn.setAttribute('aria-expanded', 'true');
    desktopServicesIcon.classList.add('rotate-180');
}

function closeDesktopDropdown() {
    if (!desktopDropdownMenu || !desktopServicesBtn || !desktopServicesIcon) return;

    desktopDropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
    desktopDropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
    desktopServicesBtn.setAttribute('aria-expanded', 'false');
    desktopServicesIcon.classList.remove('rotate-180');
}

if (desktopServicesItem) {
    desktopServicesItem.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
        openDesktopDropdown();
    });

    desktopServicesItem.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            closeDesktopDropdown();
        }, 120); // možeš menjati: 100–200ms
    });
}

if (desktopServicesBtn) {
    desktopServicesBtn.addEventListener('click', () => {
        const isOpen = desktopServicesBtn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeDesktopDropdown();
        } else {
            openDesktopDropdown();
        }
    });
}

document.addEventListener('click', (e) => {
    if (!desktopServicesItem) return;
    if (!desktopServicesItem.contains(e.target)) {
        closeDesktopDropdown();
    }
});