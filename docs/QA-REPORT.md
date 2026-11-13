# QA Report — Portfolio Redesign (shadcn/ui + Magic UI)

**Date:** 2026-11-13
**Build:** Next.js 14.2.35 static export
**Tested against:** production build (`out/`), served locally, headless Chrome (puppeteer-core)

## Technical checks

| Check                          | Result                                                    |
| ------------------------------ | --------------------------------------------------------- |
| `tsc --noEmit`                 | ✅ Pass                                                   |
| `next lint`                    | ✅ No warnings or errors                                  |
| `next build`                   | ✅ Pass. Home page first-load JS 169 kB (GSAP and Lottie are lazy-loaded chunks) |
| Runtime console / page errors  | ✅ None across all automated runs                         |
| robots.txt, sitemap.xml        | ✅ Generated                                              |
| Canonical URL, OG image        | ✅ Generated                                              |
| JSON-LD (`Person`)             | ✅ Emitted in `<head>`                                    |

## Responsive QA (automated)

The run covered 10 viewports in both themes, 20 runs in total: 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390 and 360 px wide.

| Check                                   | Result                                                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Horizontal page overflow                | ✅ None (20/20). Intentional scrollers such as the project carousel and tab rows are excluded from the check by design. |
| Console errors                          | ✅ None (20/20)                                                                                                         |
| Visual review at 1440 px (light, dark) | ✅ Reviewed from screenshots                                                                                            |
| Visual review at 390 px (dark)          | ✅ Reviewed from screenshots                                                                                            |
| Modal and mobile-menu screenshots       | ✅ Reviewed                                                                                                             |

## Functional QA (automated): 32/32 passed

Run against the production build.

- **Theme.** System preference is detected; the toggle switches and persists; the saved choice overrides the OS on reload.
- **Navigation.** All six nav links scroll to their section and highlight it; the navbar turns to glass on scroll.
- **Hero.** "View my work" scrolls to Projects; "Request resume" scrolls to Contact and prefills the subject.
- **Contact form.** An empty submit shows 4 errors and focuses the first; an invalid email is flagged on blur; a valid submit shows the success state with the Lottie check.
- **Case-study dialog.** Opens with focus trapped inside; tabs switch; next/prev work; ERP modules appear in the Solution tab; Esc closes it and page scroll unlocks.
- **Other sections.** Side builds expand; experience accordion opens.
- **Links.** All external links use `noopener`; there are no empty or `#` links.
- **Mobile.** The menu opens, and its links close it and scroll; the dialog opens.
- **Reduced motion.** Lenis is off and final values show immediately.
- **Console.** No runtime or console errors across all runs.

## Bugs found and fixed during QA

### Redesign pass

| Bug | Cause | Fix |
| --- | ----- | --- |
| Hydration error (React #418) for reduced-motion visitors | `initial` depended on `useReducedMotion`, which differs between server and client | Stable `initial` values plus a global `MotionConfig reducedMotion="user"` |
| First click on "Send" was sometimes lost | A blur-validation message shifted the button mid-click | The error slot always reserves its height |

### Earlier passes

| Bug                                                       | Cause                                                                                        | Fix                                                                         |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Nav scrolled sections 80 px too low                       | Lenis already applies the `scroll-padding-top`, so the extra offset was counted twice         | Removed the duplicate offset                                                |
| Modal stayed in the DOM after closing once an ERP tab had been clicked | A `layoutId` shared-layout pill inside the modal stalled the `AnimatePresence` exit | Replaced it with a plain background                                         |
| Fading modal overlay briefly blocked clicks               | Exit animation took too long                                                                 | Shortened the exit; `pointer-events: none` is now applied at the start of exit |
| Console warning from the custom cursor                    | It animated a CSS-variable colour, which can't be animated                                    | Moved the colour to CSS transitions                                         |
| Console warning from `useScroll`                          | The target container had no position set                                                     | Made the container `relative`                                               |
| Pinned scroll stopped short of the last card on wide screens | The pin distance was measured before the pinned layout rendered | Call `ScrollTrigger.refresh()` once pinned |
| Pinned arrow clicks hit the fixed header                  | The pinned area was centred under the 72 px nav                                              | Offset the pinned area by the nav height; pinning only on viewports ≥820 px tall |
| Hydration warning after adding GSAP                       | `registerPlugin` ran at module scope, before hydration                                        | Register inside the effect, with GSAP lazy-loaded |
| OG image failed to build on Windows                       | Known `@vercel/og` path bug                                                                  | Replaced with a static `opengraph-image.png`                                |

## Not executed

- **Lighthouse / Core Web Vitals audit.** Not run in this pass. Run it against the deployed URL: Chrome DevTools → Lighthouse.
- **Real-device testing (iOS Safari, Android Chrome).** Only emulated viewports were tested.
- **Formspree submission path.** Not exercised because no form ID is configured. The mailto fallback was tested.
- **Resume download path.** Not exercised because `public/resume.pdf` doesn't exist yet. The "Request Resume" fallback was tested.
- **Comparison with the three reference images.** Not done; the images were not provided in the session.
