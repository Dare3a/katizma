// PORTFOLIO FILTER

const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length && portfolioCards.length) {

    // FUNKCIJA ZA AKTIVNO DUGME
    function setActiveButton(button) {

        filterButtons.forEach((btn) => {
            btn.classList.remove(
                'border-teal-300/70',
                'bg-teal-400',
                'text-slate-950',
                'hover:border-teal-300/30',
                'hover:bg-white/5'
            );

            btn.classList.add(
                'border-white/10',
                'bg-black/30',
                'text-white/85',
                'hover:border-teal-300/30',
                'hover:bg-white/5'
            );
        });

        button.classList.add(
            'border-teal-300/70',
            'bg-teal-400',
            'text-slate-950',
            'hover:border-teal-300/30',
            'hover:bg-white/5'
        );

        button.classList.remove(
            'border-white/10',
            'bg-black/30',
            'text-white/85',
            'hover:border-teal-300/30',
            'hover:bg-white/5'
        );
    }

    // FUNKCIJA ZA FILTRIRANJE
    function filterCards(filter) {
        portfolioCards.forEach((card) => {
            const categories = card.dataset.category.split(' ');

            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // EVENT LISTENER
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            setActiveButton(button);
            filterCards(filter);
        });
    });

    // DEFAULT AKTIVNO (Svi projekti)
    const defaultButton = document.querySelector('[data-filter="all"]');

    if (defaultButton) {
        setActiveButton(defaultButton);
        filterCards('all');
    }
}