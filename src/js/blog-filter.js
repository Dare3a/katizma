document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogTitles = document.querySelectorAll('.blog-title-item');
    const blogTextSection = document.getElementById('blog-text-section');

    const MAX_CARDS_VISIBLE = 3;

    function filterPosts(selectedCategory) {
        // 1. Sakrij sve kartice i sve naslove na početku
        blogCards.forEach(card => card.classList.add('hidden'));
        blogTitles.forEach(title => title.classList.add('hidden'));

        // 2. Filtriraj kartice koje odgovaraju kategoriji
        const matchingCards = Array.from(blogCards).filter(card => {
            const cat = card.dataset.category;
            return selectedCategory === 'all' || cat.split(' ').includes(selectedCategory);
        });

        // 3. Filtriraj naslove koji odgovaraju kategoriji
        const matchingTitles = Array.from(blogTitles).filter(title => {
            const cat = title.dataset.category;
            return selectedCategory === 'all' || cat.split(' ').includes(selectedCategory);
        });

        // 4. Prikaži do MAX_CARDS_VISIBLE kartica
        matchingCards.slice(0, MAX_CARDS_VISIBLE).forEach(card => {
            card.classList.remove('hidden');
        });

        // 5. Prikaži odgovarajuće tekstualne naslove
        // Ako ima više kartica od limita, ili ako želimo da prikažemo odgovarajuće naslove ispod:
        matchingTitles.forEach(title => {
            title.classList.remove('hidden');
        });

        // 6. Sakrij sekciju "Ostale vesti" ako nema vidljivih naslova
        const hasVisibleTitles = matchingTitles.length > 0;
        if (hasVisibleTitles) {
            blogTextSection.classList.remove('hidden');
        } else {
            blogTextSection.classList.add('hidden');
        }
    }

    // Event listeneri za filter dugmad
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => {
                b.classList.remove('active', 'border-teal-500/30', 'bg-teal-500/10', 'text-teal-300');
                b.classList.add('border-white/10', 'bg-slate-900/60', 'text-slate-300');
            });

            btn.classList.add('active', 'border-teal-500/30', 'bg-teal-500/10', 'text-teal-300');
            btn.classList.remove('border-white/10', 'bg-slate-900/60', 'text-slate-300');

            const filterValue = btn.dataset.filter;
            filterPosts(filterValue);
        });
    });
});