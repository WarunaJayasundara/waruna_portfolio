# Waruna Jayasundara - Portfolio

**Live:** https://warunajayasundara.github.io/waruna_portfolio/ (GitHub Pages, deployed automatically on every push to `main`)

Personal portfolio site. A static React app with no backend, so it can be hosted free on Vercel, Netlify or GitHub Pages.

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Lucide icons and Lenis (smooth scrolling). The particle effects are hand-written canvas code. All motion switches off under `prefers-reduced-motion`.

## Run it locally

Requires Node.js 20+.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, build to `dist/`, and copy `index.html` to `404.html` |
| `npm run preview` | Serve the production build on http://localhost:4173 |
| `npm run typecheck` | TypeScript only |
| `npm run images` | Regenerate optimised WebP images from `assets-src/` |

## Editing content

You can change all of the text without touching any layout code:

| File | Contents |
|---|---|
| `src/data/profile.ts` | Name, email, phone, WhatsApp number, links, education, availability line |
| `src/data/projects.ts` | Selected projects, case studies (`caseStudy`), the archive list |
| `src/data/experience.ts` | Roles, leadership, certifications |
| `src/data/skills.ts` | Technology groups and where each one is used |
| `public/Waruna_Jayasundara_CV.pdf` | The downloadable résumé. Replace the file but keep the same name. |

**Adding a project:** append an object to `projects`. If you give it a `caseStudy`, it gets a page at `/work/<slug>` automatically.

**Images:** put the raw files in `assets-src/`, add them to `scripts/optimize-images.mjs`, run `npm run images`, then set `image.base` on the project.

Design tokens (colours, fonts, easing) are all in `src/index.css` under `@theme`.

**Services and WhatsApp:** the offers are in `src/sections/Services.tsx`. Every WhatsApp button uses `whatsappLink()` from `src/data/profile.ts`, so changing `whatsappNumber` updates them all.

**Logo:** the WJ mark is defined once in `src/components/Logo.tsx` (also used by the particle logo). The favicon and app icons are in `public/` and use the same paths.

## Deploying

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project** and import the repository. Vercel detects Vite, and `vercel.json` already sets the build command, the output folder, SPA rewrites for `/work/*` and asset caching.
3. Click **Deploy**.

### Netlify

Import the repository on netlify.com. `netlify.toml` already sets `npm run build`, publishes `dist`, and adds the SPA redirect.

### GitHub Pages

1. In the repository go to **Settings → Pages → Source** and choose **GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy-pages.yml` builds with `BASE_PATH=/<repo-name>/` and publishes the site.
3. For a user site (`<username>.github.io`) or a custom domain, change `BASE_PATH` in the workflow to `/`.

Deep links such as `/work/helaiq` work on Pages because the build also writes `404.html`.

### After the first deploy

Set `VITE_SITE_URL` to the live URL with no trailing slash (for example `https://waruna.dev`), either in `.env` or in the host's environment variables, and redeploy. This turns the Open Graph image URL into an absolute URL, which LinkedIn and other link previews need.

### Custom domain later

- **Vercel / Netlify:** open the project's **Domains** settings, add the domain, and create the DNS records they show you (usually an `A` record for the root domain and a `CNAME` for `www`). HTTPS is issued automatically.
- **GitHub Pages:** add the domain under **Settings → Pages → Custom domain**, create a `CNAME` DNS record pointing to `<username>.github.io`, and set `BASE_PATH` to `/`.

## Quality checks (last run 19 Oct 2026, local production build)

- `npm run build` passes with no TypeScript errors. JS is about 83 kB gzipped; case studies load as a separate 2 kB chunk.
- Lighthouse 12.2.1, desktop, on the home page and `/work/helaiq`: 100 in Performance, Accessibility, Best Practices and SEO.
- Lighthouse 12.2.1, mobile (simulated slow phone), home page: Accessibility 100, Best Practices 100, SEO 100. Performance was 81-88 across three runs; the animated particle canvases cost about 0.4 s of main-thread time on that simulated device.
- Tested in real Chrome: wheel scrolling, nav links, `/#section` deep links, case-study navigation, no horizontal overflow at 390 px, no console errors. With reduced motion, smooth scrolling and animations are off and all content is visible.
