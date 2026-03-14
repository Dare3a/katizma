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