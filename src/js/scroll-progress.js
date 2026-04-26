document.addEventListener("DOMContentLoaded", function () {

    const scrollProgress = document.getElementById('scrollProgress');
    const scrollProgressCircle = document.getElementById('scrollProgressCircle');

    if (!scrollProgress || !scrollProgressCircle) return;

    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    scrollProgressCircle.style.strokeDasharray = circumference;
    scrollProgressCircle.style.strokeDashoffset = circumference;

    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

        const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
        const offset = circumference - progress * circumference;

        scrollProgressCircle.style.strokeDashoffset = offset;

        if (scrollTop > 300) {
            scrollProgress.classList.remove('opacity-0', 'pointer-events-none');
            scrollProgress.classList.add('opacity-100');
        } else {
            scrollProgress.classList.add('opacity-0', 'pointer-events-none');
            scrollProgress.classList.remove('opacity-100');
        }
    };

    // ✅ ULTRA SMOOTH SCROLL (bez bugova na mobilnom)
    const smoothScrollToTop = () => {
        const start = window.scrollY;
        const duration = 600;
        let startTime = null;

        const easeInOutCubic = (t) =>
            t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // klik na dugme
    scrollProgress.addEventListener('click', smoothScrollToTop);

    // scroll listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    updateScrollProgress();
});