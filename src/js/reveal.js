const revealElements = document.querySelectorAll('.reveal-up');

if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}