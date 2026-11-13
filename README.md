# Rishabh Kumar — Portfolio

Personal portfolio for a Product-Focused Business Analyst & Product Owner (Fintech · ERP/WMS · AI automation).

**Stack:** Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS · shadcn/ui (Radix) · Magic UI-style effects · Framer Motion (desktop tilt only, lazy) · GSAP ScrollTrigger · Lenis · Lottie · three.js · Geist · Lucide icons

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script               | What it does                              |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Dev server with hot reload                |
| `npm run build`      | Production static export to `out/`        |
| `npm run lint`       | ESLint (`next/core-web-vitals`)           |
| `npm run type-check` | TypeScript, no emit                       |

## Editing content

You can change all copy without touching the UI code.

| File                       | Contains                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `content/site.ts`          | Profile, links, impact metrics, experience, skills, certifications, insights, navigation       |
| `content/case-studies.ts`  | The four flagship case studies shown in Projects and the case-study modal                      |
| `content/projects.ts`      | Public GitHub side builds, shown in the "Hands-on side builds" list                            |

Rules the UI follows:

- **Missing facts stay hidden.** If you leave `period`, `provider` or `credentialUrl` undefined, the UI does not render that field, so no placeholder text ever appears on the page.
- **Metrics are labelled by kind.** Each metric is `profile`, `delivered` or `target`, and targets are always marked as goals for ongoing work.
- **Insights are drafts until published.** An article only becomes a link when it has `published: true` and an `href`.
- **Items marked `VERIFY` need checking.** Values commented `VERIFY` in `content/site.ts` were taken from older material. Confirm them before going live.

### Files you can drop in

| Add this file                                         | Effect                                                                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `public/resume.pdf`                                    | The "Download Resume" buttons appear on the next build. Without the file, the button is "Request Resume" and prefills the contact form. |
| `public/profile.webp`, `.jpg` or `.png`               | Replaces the RK monogram in the About section with your photo (portrait, 4:5 works best).                                             |

### Insights articles

The full text of each article lives in `content/articles.ts`. To publish one, set `published: true` on its matching entry in `insights` (`content/site.ts`). The build then creates `/insights/<slug>` and links to it from the homepage. All six articles are currently published.

### Contact form

The site is fully static, so the form has two modes:

- **Default:** submitting validates the fields, then opens the visitor's email app with the message ready to send to `links.email`.
- **Formspree (recommended):** create a free form at formspree.io and set `NEXT_PUBLIC_FORMSPREE_ID=<form id>` at build time. The form then posts directly, with success and error states.

## Project structure

```
app/                 layout (fonts, theme script, SEO, JSON-LD), page, sitemap, robots, icon, OG image
components/
  animations/        Lenis smooth scroll (+ MotionConfig), Lottie player
  ui/                shadcn/ui primitives: button, badge, card, dialog, tabs, accordion, input
  magicui/           dot-pattern, blur-fade, border-beam, number-ticker, marquee, shiny-text, beam-flow, text-reveal (GSAP)
  sections/          navbar, hero, impact, about, experience, projects (+ case-study dialog), skills, contact
  navigation/        Navbar (active section, mobile drawer), ThemeToggle, Logo
content/             all editable copy and data
hooks/               useActiveSection, useTheme
lib/                 contact prefill event, asset() base-path helper
app/globals.css      design tokens (light + dark), component classes
tailwind.config.ts   token-backed colours, type scale, radii, shadows, z-index, durations
```

### Adding your own Lottie

Drop a JSON file into `public/lottie/` and render `<Lottie src="/lottie/your-file.json" />` from `components/animations/Lottie.tsx`. Check the licence of any LottieFiles asset before using it.

### Design system

- **Preset.** shadcn/ui's zinc theme: HSL CSS variables in `app/globals.css`, defined once for `:root` (light) and once for `.dark`. Status colours are `--success` (delivered) and `--warning` (target).
- **Typography.** Geist Sans and Geist Mono, self-hosted via the `geist` package.
- **Theme selection.** A first visit follows the system preference. A choice made with the toggle is saved in `localStorage` (`rk-theme`) and applied before first paint.

### Motion

| Area          | What it does |
| ------------- | ------------ |
| Hero          | Dot-grid background, shiny-text availability badge, blur-fade entrance, tools marquee |
| Impact        | Bento grid with number tickers, a border beam, animated bars and a beam-flow pipeline |
| About         | GSAP ScrollTrigger word-by-word text reveal (GSAP is lazy-loaded) |
| Case studies  | Radix Dialog with Tabs (Overview, My role, Solution, Impact) and prev/next navigation |
| Lottie        | Two original animations in `public/lottie/`; lazy-loaded, played once, theme-coloured |
| Accessibility | `<MotionConfig reducedMotion="user">` and CSS turn motion off for reduced-motion users; Lenis is skipped; counters show final values |

## Deployment

The build is a static export (`out/`), so it can be hosted anywhere.

### Vercel (recommended)

1. Import the GitHub repo at vercel.com/new. The framework is auto-detected as Next.js and no extra settings are needed.
2. Optionally add the environment variables `NEXT_PUBLIC_SITE_URL` (your domain, used for canonical, OG and sitemap) and `NEXT_PUBLIC_FORMSPREE_ID`.
3. **Custom domain:** in Project → Settings → Domains, add the domain and follow the DNS instructions. HTTPS is issued automatically.

### GitHub Pages

The site is served from `/rishabhkr`, so build with `BASE_PATH=/rishabhkr`. The workflow `.github/workflows/nextjs.yml` uses `configure-pages` with `static_site_generator: next`, which injects the base path itself.

> ⚠️ `.github/workflows/deploy.yml` targets a `main` branch that doesn't exist and has a daily `cron` that rebuilds the default branch without the base path. Consider deleting it so the two Pages workflows don't overwrite each other.

### Environment variables

| Variable                   | Required | Purpose                                                                                       |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | No       | Canonical, OG and sitemap URL. Defaults to `https://rishabhkrr.github.io/rishabhkr`.          |
| `NEXT_PUBLIC_FORMSPREE_ID` | No       | Enables direct form submission.                                                               |
| `BASE_PATH`                | No       | Sub-path hosting, e.g. `/rishabhkr` on GitHub Pages.                                          |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console token (HTML-tag method). |
| `NEXT_DIST_DIR`            | No       | Build into another folder, e.g. `.next-verify`; export output then lands there instead of `out/`. Note: a running dev server still needs a restart after a build. |

Vercel Analytics is enabled automatically on Vercel builds (`VERCEL=1`) and is off everywhere else.

### Pre-launch checklist

- [ ] Confirm the `VERIFY` items in `content/site.ts`: email, LinkedIn URL, experience dates
- [ ] Review the case-study narrative in `content/case-studies.ts` for accuracy and confidentiality
- [ ] Add `public/resume.pdf` and, optionally, `public/profile.jpg`
- [ ] Set `NEXT_PUBLIC_SITE_URL` once the domain is final
- [ ] (Optional) Set `NEXT_PUBLIC_FORMSPREE_ID`
- [ ] Run `npm run lint && npm run type-check && npm run build`

See `docs/QA-REPORT.md` for the latest test results.
