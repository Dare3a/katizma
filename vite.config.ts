import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                index: new URL('./index.html', import.meta.url).pathname,
                '404': new URL('./404.html', import.meta.url).pathname,
                kontakt: new URL('./kontakt.html', import.meta.url).pathname,
                'kontakt-php': new URL('./kontakt.php', import.meta.url).pathname,
                'o-nama': new URL('./o-nama.html', import.meta.url).pathname,
                portfolio: new URL('./portfolio.html', import.meta.url).pathname,
                'seo-optimizacija': new URL('./seo-optimizacija.html', import.meta.url).pathname,
                'izrada-web-sajta': new URL('./izrada-web-sajta.html', import.meta.url).pathname,
                'google-ads': new URL('./google-ads.html', import.meta.url).pathname,
            },
        },
    },
})
