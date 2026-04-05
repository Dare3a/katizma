    document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll(".counter-trigger");
    const duration = 1400;

    if (!triggers.length) return;

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

    const startTriggerCounters = (trigger) => {
    if (trigger.dataset.counted === "true") return;
    trigger.dataset.counted = "true";

    const counters = trigger.querySelectorAll(".counter");
    counters.forEach(counter => animateCounter(counter));
};

    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
    startTriggerCounters(entry.target);
    observer.unobserve(entry.target);
}
});
}, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
});

    triggers.forEach((trigger) => {
    observer.observe(trigger);

    // fallback ako je element već vidljiv pri učitavanju
    const rect = trigger.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
    startTriggerCounters(trigger);
    observer.unobserve(trigger);
}
});
});
