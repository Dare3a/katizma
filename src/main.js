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

const revealEls = document.querySelectorAll('.reveal-up');

// reveal-up na scrollovani element
const io = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // animira samo jednom
            }
        });
    },
    {threshold: 0.2, rootMargin: '0px 0px -10% 0px'}
);

revealEls.forEach((el) => io.observe(el));

/*strelice projekata na indexnoj*/

const projectsSlider = document.getElementById('projectsSlider');
const projectsPrev = document.getElementById('projectsPrev');
const projectsNext = document.getElementById('projectsNext');

if (projectsSlider && projectsPrev && projectsNext) {
    const scrollProjects = (direction) => {
        const scrollAmount = projectsSlider.clientWidth * 0.85;

        projectsSlider.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    };

    projectsPrev.addEventListener('click', () => scrollProjects(-1));
    projectsNext.addEventListener('click', () => scrollProjects(1));
}
