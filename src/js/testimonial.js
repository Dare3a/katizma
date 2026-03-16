const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

if (testimonialTrack && testimonialPrev && testimonialNext && testimonialDots.length) {
    let testimonialIndex = 0;
    const totalTestimonials = testimonialDots.length;
    let testimonialInterval;

    const updateTestimonialSlider = () => {
        testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

        testimonialDots.forEach((dot, index) => {
            if (index === testimonialIndex) {
                dot.classList.remove('bg-teal-300/40');
                dot.classList.add('bg-teal-300');
            } else {
                dot.classList.remove('bg-teal-300');
                dot.classList.add('bg-teal-300/40');
            }
        });
    };

    const goToTestimonial = (index) => {
        testimonialIndex = index;
        if (testimonialIndex < 0) testimonialIndex = totalTestimonials - 1;
        if (testimonialIndex >= totalTestimonials) testimonialIndex = 0;
        updateTestimonialSlider();
    };

    const startTestimonialAutoplay = () => {
        testimonialInterval = setInterval(() => {
            goToTestimonial(testimonialIndex + 1);
        }, 6000);
    };

    const stopTestimonialAutoplay = () => {
        clearInterval(testimonialInterval);
    };

    testimonialPrev.addEventListener('click', () => {
        stopTestimonialAutoplay();
        goToTestimonial(testimonialIndex - 1);
        startTestimonialAutoplay();
    });

    testimonialNext.addEventListener('click', () => {
        stopTestimonialAutoplay();
        goToTestimonial(testimonialIndex + 1);
        startTestimonialAutoplay();
    });

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTestimonialAutoplay();
            goToTestimonial(index);
            startTestimonialAutoplay();
        });
    });

    // swipe support
    let startX = 0;
    let endX = 0;

    testimonialTrack.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
        stopTestimonialAutoplay();
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToTestimonial(testimonialIndex + 1);
            } else {
                goToTestimonial(testimonialIndex - 1);
            }
        }

        startTestimonialAutoplay();
    }, { passive: true });

    // pause on hover desktop
    testimonialTrack.addEventListener('mouseenter', stopTestimonialAutoplay);
    testimonialTrack.addEventListener('mouseleave', startTestimonialAutoplay);

    updateTestimonialSlider();
    startTestimonialAutoplay();
}