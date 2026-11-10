# Rishabh Kumar — portfolio

Static Next.js (App Router) + TypeScript + Tailwind site, exported to `out/` and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

## Updating content

All copy lives in typed data files in `src/content/`. Edit, push to `master`, and the site redeploys.

| What | File |
|---|---|
| Personal details, links, on/off switches (freelance, pricing, form key, testimonials, cert years/verify links) | `src/content/site.ts` |
| Nav, hero, proof bar, domains, about, process, artefacts, contact, footer, /now, 404, SEO text | `src/content/copy.ts` |
| Services + engagement models | `src/content/services.ts` |
| Case studies (home cards + `/work/<slug>/` pages) | `src/content/caseStudies.ts` |
| Experience timeline | `src/content/experience.ts` |
| More projects grid + coursework | `src/content/projects.ts` |
| Skills, tools, domains | `src/content/skills.ts` |
| Certifications, education, recognition | `src/content/credentials.ts` |
| FAQ | `src/content/faq.ts` |

Blank values hide what they feed — nothing is invented to fill a gap.

## Optional files (picked up automatically at build time)

| Put it here | Shows up as |
|---|---|
| `public/resume.pdf` | Résumé buttons + `/resume/` (keep client names out of it) |
| `public/images/headshot.{jpg,png,webp}` | About photo (otherwise an "RK" monogram) |
| `public/images/work/<case-study-slug>.{png,jpg,webp}` | Case-study cover |
| `public/images/projects/<project-slug>.{png,jpg,webp}` | Project card screenshot |
| `public/artefacts/<file>.pdf` (names in `copy.ts` → `artefacts`) | Artefacts gallery (hidden while empty) |

Share image and Apple touch icon: edit the SVGs in `scripts/brand/` and run `python scripts/brand/render.py` (needs `pip install pymupdf`).

## Hosting path

`next.config.mjs` reads `GITHUB_REPOSITORY` in CI: a repo named `rishabhkrr.github.io` serves from the domain root, any other name serves from `/<repo-name>/`. Renaming the repo needs no code change.
