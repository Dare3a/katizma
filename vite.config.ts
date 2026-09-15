import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const getBlogEntries = () => {
    const blogDir = fileURLToPath(new URL('./blog/', import.meta.url))
    const entries: Record<string, string> = {}

    if (fs.existsSync(blogDir)) {
        for (const file of fs.readdirSync(blogDir)) {
            if (file.endsWith('.html')) {
                const name = path.parse(file).name

                entries[`blog/${name}`] = fileURLToPath(
                    new URL(`./blog/${file}`, import.meta.url)
                )
            }
        }
    }

    return entries
}

export default defineConfig({
    plugins: [tailwindcss()],

    build: {
        rollupOptions: {
            input: {
                index: fileURLToPath(new URL('./index.html', import.meta.url)),
                '404': fileURLToPath(new URL('./404.html', import.meta.url)),
                kontakt: fileURLToPath(new URL('./kontakt.html', import.meta.url)),
                'o-nama': fileURLToPath(new URL('./o-nama.html', import.meta.url)),
                portfolio: fileURLToPath(new URL('./portfolio.html', import.meta.url)),
                'seo-optimizacija': fileURLToPath(new URL('./seo-optimizacija.html', import.meta.url)),
                'izrada-web-sajta': fileURLToPath(new URL('./izrada-web-sajta.html', import.meta.url)),
                'google-ads': fileURLToPath(new URL('./google-ads.html', import.meta.url)),
                'google-business-profile': fileURLToPath(new URL('./google-business-profile.html', import.meta.url)),
                blog: fileURLToPath(new URL('./blog.html', import.meta.url)),

                ...getBlogEntries(),
            },
        },
    },
})
