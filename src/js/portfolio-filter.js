const portfolioFilterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (portfolioFilterButtons.length && portfolioCards.length) {
    portfolioFilterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            portfolioFilterButtons.forEach((btn) => {
                btn.classList.remove(
                    'active',
                    'border-lime-300/70',
                    'bg-lime-300',
                    'text-slate-950'
                );
                btn.classList.add(
                    'border-white/10',
                    'bg-black/30',
                    'text-white/88'
                );
            });

            button.classList.add(
                'active',
                'border-lime-300/70',
                'bg-lime-300',
                'text-slate-950'
            );
            button.classList.remove(
                'border-white/10',
                'bg-black/30',
                'text-white/88'
            );

            portfolioCards.forEach((card) => {
                const categories = card.dataset.category.split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}