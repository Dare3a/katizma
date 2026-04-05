
    document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const duration = 1400;
    let started = false;

    const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(eased * target);

    if (progress < 1) {
    requestAnimationFrame(updateCounter);
} else {
    counter.textContent = target;
}
};

    requestAnimationFrame(updateCounter);
};

    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting && !started) {
    started = true;
    counters.forEach(counter => animateCounter(counter));
    observer.disconnect();
}
});
}, { threshold: 0.35 });

    if (counters.length) {
    observer.observe(counters[0].closest("section"));
}
});
