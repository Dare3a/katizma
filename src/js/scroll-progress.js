const scrollProgress = document.getElementById('scrollProgress');
const scrollProgressCircle = document.getElementById('scrollProgressCircle');

if (scrollProgress && scrollProgressCircle) {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    scrollProgressCircle.style.strokeDasharray = `${circumference}`;
    scrollProgressCircle.style.strokeDashoffset = `${circumference}`;

    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
        const offset = circumference - progress * circumference;

        scrollProgressCircle.style.strokeDashoffset = `${offset}`;

        if (scrollTop > 300) {
            scrollProgress.classList.remove('opacity-0', 'pointer-events-none');
            scrollProgress.classList.add('opacity-100');
        } else {
            scrollProgress.classList.add('opacity-0', 'pointer-events-none');
            scrollProgress.classList.remove('opacity-100');
        }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
}