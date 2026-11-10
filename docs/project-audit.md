# Portfolio Project Audit

> Generated: 2026-11-10
> Repository: rishabhkrr/rishabhkr
> Purpose: Comprehensive audit of all GitHub repositories to determine tier placement, tech stack, deployability, and status.

---

## Executive Summary

- **Total repos audited**: 44
- **Public repos**: 36 (cloned and inspected)
- **Private repos**: 8 (case-study only — `quantdesk`, `job-search-copilot`, `ticketTracker`, `ecom`, `ecom-new`, `blog`, `blogproject`, `TMS-Tour-Management-System`)
- **Empty repos**: 1 (`demo`)
- **Old portfolio duplicates**: `rishabh` (identical to current `rishabhkr`), `rishabhkr.github.io` (old compiled portfolio)
- **Forks to exclude**: `Python-for-Algorithms...`, `Website-Portfolio`, `GitIntro`, `react-redux-complete-playlist`

---

## Tier 1 — Flagship (Case-Study Pages)

| # | Repo | Privacy | Stack | Status | Deployable As | Summary |
|---|------|---------|-------|--------|---------------|---------|
| 1 | `quantdesk` | 🔒 Private | Unknown (no API access) | Unknown | Case study only | Quantitative analysis dashboard — case study from description only. Cannot link to source. |
| 2 | `job-search-copilot` | 🔒 Private | Unknown | Unknown | Case study only | AI-powered job search tool — case study from description only. |
| 3 | `ticketTracker` | 🔒 Private | Unknown | Unknown | Case study only | Ticket tracking system — case study from description only. |
| 4 | `GenAI-Project-1` (ParakeetAI Clone) | Public | Python (FastAPI), React (Vite), Docker, OpenAI API, Whisper | ✅ Builds (needs `OPENAI_API_KEY`) | Needs backend (Docker) | AI interview assistant with audio transcription. Has Docker Compose, FastAPI backend + React/Vite frontend. **Well-structured, most recent project (Sep 2025).** |

**Recommendation**: Keep `quantdesk`, `job-search-copilot`, `ticketTracker` as case-study-only pages. For `GenAI-Project-1`, deploy backend on Railway/Render and frontend on Vercel/Netlify.

---

## Tier 2 — Featured Projects (Cards + Detail Modal)

| # | Repo | Stack | Status | Deployable As | Summary |
|---|------|-------|--------|---------------|---------|
| 1 | `FIS_Microservices` | Java, Spring Boot 2.5.3, Spring Cloud, Eureka, Zuul, Maven | ⚠️ Partial (no README, needs manual wiring) | Needs backend (JAR files) | Full microservices architecture from FIS training: accounts, employee, loan, user-services, Eureka discovery, Zuul gateway. **Strong enterprise architecture showcase.** |
| 2 | `FIS_Spring` | Java, Spring Boot, Spring MVC, JPA, JDBC, Lambda, Maven | ⚠️ Partial (collection of demos) | Not deployable as single app | Collection of Spring training demos: Banking-App, EurekaServer, employee-service, item-catalog, lambda-demo, spring-jdbc, spring-jpa. Good for showing breadth. |
| 3 | `Mask--Attandance--Management` | Python, Django, OpenCV, face_recognition | ⚠️ Partial (needs OpenCV setup) | Needs backend (Django) | Face-mask-based attendance system using computer vision. Has Django models, camera module, HTML templates. **Unique project — differentiator.** |
| 4 | `Covid-19-Notification-for-Desktop` | Python, BeautifulSoup, plyer | ✅ Runs (simple script) | Not deployable (desktop script) | Desktop notification app that scrapes COVID data from mohfw.gov.in and sends system notifications. Simple but shows initiative. |
| 5 | `PowerBI-Practice-and-Projects` | Power BI (.pbix files), screenshots | ✅ Content exists | Screenshots + descriptions only | Contains .pbix files and screenshots. No web deployment possible — showcase with screenshots and descriptions. |
| 6 | `Contact-Manager` | Java, Spring Boot 2.3.4, Spring Data JPA, Thymeleaf, Spring Security, MySQL | ⚠️ Partial (needs DB setup) | Needs backend (Spring Boot) | Smart Contact Manager with auth, CRUD contacts, user profiles. Full Spring Boot app with security. |
| 7 | `Car-Rental-System` | C (data structures) | ⚠️ Partial (academic exercise) | Not deployable | C program implementing car rental with graphs, trees, stacks, linked lists. Includes PDFs of exercises. Academic, not a web app. |
| 8 | `Tourist-Management-System` | PHP, MySQL, Bootstrap, jQuery, Font Awesome | ⚠️ Partial (needs PHP + MySQL) | Needs backend (PHP/Apache) | Full tour booking website with admin panel, package management, booking system, user management. **Substantial project — 158 files.** |
| 9 | `TMS-Tourist-Management-System` | Unknown | Empty (size: 0) | N/A | Empty repo. **Merge with `Tourist-Management-System` as same project.** |
| 10 | `TMS-Tour-Management-System` | 🔒 Private | Unknown | Unknown | Unknown | Cannot audit — private repo. |
| 11 | `Jarves` | Python (pyttsx3, speech_recognition) | ⚠️ Partial (Windows-only SAPI5) | Not deployable (desktop) | AI voice assistant (like Jarvis). Uses text-to-speech, speech recognition, Wikipedia, email. **Demo video recommended.** |
| 12 | `InovatiON` | Unknown | Empty (size: 1, just .gitignore) | N/A | Only has .gitignore and README placeholder. **Drop or ask for details.** |
| 13 | `notes-taking-app` | HTML, JavaScript | ✅ Runs (static) | Static (GitHub Pages) | Simple notes app with JS. Pure HTML/CSS/JS. **Easy to deploy on GitHub Pages.** |
| 14 | `MybookSelf` | HTML, JavaScript, Bootstrap | ✅ Runs (static) | Static (GitHub Pages) | Book list manager using JS/HTML with Bootstrap. **Easy to deploy on GitHub Pages.** |

**Recommendation**:
- `InovatiON` → drop (empty).
- `Car-Rental-System` → move to Tier 3 (academic exercise, not a web app).
- `TMS-Tourist-Management-System` → merge with `Tourist-Management-System` (same project, empty duplicate).
- `notes-taking-app` and `MybookSelf` → deploy on GitHub Pages immediately (trivially static).
- `FIS_Microservices` → strong flagship material if combined with `FIS_Spring` as "Spring/Microservices at FIS".
- `Tourist-Management-System` → substantial PHP project, deploy on free-tier PHP hosting.

---

## Tier 3 — Fun / Mini Builds (Compact Grid)

| # | Repo | Stack | Status | Deployable As | Summary |
|---|------|-------|--------|---------------|---------|
| 1 | `Space-War` | Python, Pygame | ✅ Runs locally | Not web-deployable (Pygame) | Space shooter game using Pygame. Has sprites, sound, scoring. **Record demo GIF.** |
| 2 | `Tic-Tac-Tow` | Python (CLI) | ✅ Runs locally | Not web-deployable | Command-line tic-tac-toe. Very minimal (single file). **Record demo GIF or port to web.** |
| 3 | `Car-Rental-System` | C | ⚠️ Academic | Not deployable | Data structures exercise. Move here from Tier 2. |

---

## Tier 4 — Learning Archive (Collapsible "Coursework & Labs")

### Python for Data Science Track
| Repo | Language | Files | Status |
|------|----------|-------|--------|
| `Rishabh-kumar-Lab1_Python-for-DS` | Python | 2 | ✅ |
| `Rishabh-Kumar-Lab2_Python-for-DS` | Jupyter Notebook | 157 MB | ✅ |
| `Rishabh-kumar-Lab3_Python-for-DS` | Jupyter Notebook | 28 MB | ✅ |
| `Rishabh-kumar-Lab4_Python-for-DS` | Jupyter Notebook | 15 MB | ✅ |
| `Rishabh-Kumar-Lab5_Python-for-DS` | Python | 110 MB | ✅ |
| `G1B1-Project-3_Python-for-DS` | Python | 111 MB | ✅ |

### Java / OOP / DSA Track
| Repo | Language | Status |
|------|----------|--------|
| `RishabhKumar_FOPJava_LabOOPs1` | Unknown (4 KB) | ✅ |
| `Rishabh_FOPJava_LabAlgo2` | Unknown (7 KB) | ✅ |
| `RishabhKumar_OOP_Lab1` | Java | ✅ |
| `Rishabh_DSA_LabDSA` | Java | ✅ |

### Backend Track
| Repo | Language | Status |
|------|----------|--------|
| `RishabhKumar_BED_Lab6` | Java | ✅ |
| `RishabhKumar_rishabhkrr-RishabhKumar_BED_LabSpringMVC1` | Unknown (67 KB) | ✅ |

### Frontend Track
| Repo | Language | Status |
|------|----------|--------|
| `RishabhKumar_JS_Lab` | Unknown (2 KB) | ✅ |
| `RishabhKumar_JS3_Lab` | JavaScript (70 KB) | ✅ |
| `G3B1_JS_GradedProject2` | JavaScript (17 KB) | ✅ |
| `Rishabhkumar_HTML-CSS_Lab` | CSS (4 KB) | ✅ |

### Other
| Repo | Language | Status |
|------|----------|--------|
| `Excel-Projects-and-worksheets` | Mixed (413 KB) | ✅ Screenshots |
| `Lab` | TypeScript (FIS Angular training) | ✅ Coursework material |

---

## Excluded Repos

| Repo | Reason |
|------|--------|
| `demo` | Empty repository (0 files) |
| `Python-for-Algorithms--Data-Structures--and-Interviews` | Fork (course files) |
| `Website-Portfolio` | Fork (course template) |
| `GitIntro` | Fork (intro exercise) |
| `react-redux-complete-playlist` | Fork (Net Ninja tutorial code) |
| `rishabh` | Old portfolio duplicate of `rishabhkr` |

## Needs User Decision (Private Repos)

| Repo | Question |
|------|----------|
| `ecom` | Private — should it be shown? |
| `ecom-new` | Private — should it be shown? |
| `blog` | Private — should it be shown? |
| `blogproject` | Private — should it be shown? |
| `quantdesk` | Private — provide case-study details? |
| `job-search-copilot` | Private — provide case-study details? |
| `ticketTracker` | Private — provide case-study details? |

---

## Tier Reassignment Proposals

| Repo | Proposed Tier | Reason |
|------|--------------|--------|
| `Car-Rental-System` | Tier 3 (down from 2) | C academic exercise, not a web app |
| `InovatiON` | Exclude | Empty repo with no content |
| `TMS-Tourist-Management-System` | Merge with `Tourist-Management-System` | Empty duplicate |
| `FIS_Microservices` + `FIS_Spring` | Keep Tier 2 but consider combining as one entry | Related Spring/Microservices work from FIS |
| `GenAI-Project-1` | Strong Tier 1 candidate | Most recent, well-structured, AI/GenAI — very relevant |
| `Lab` | Tier 4 (FIS Angular training) | Coursework material, not a standalone project |

---

## Deployability Summary

### Easy to deploy (static / GitHub Pages)
- `notes-taking-app` → static HTML/JS
- `MybookSelf` → static HTML/JS

### Needs backend hosting (Railway/Render/Fly.io)
- `GenAI-Project-1` → FastAPI + React (Docker)
- `FIS_Microservices` → Spring Boot microservices
- `Contact-Manager` → Spring Boot + MySQL
- `Tourist-Management-System` → PHP + MySQL
- `Mask--Attandance--Management` → Django + OpenCV

### Demo recording only (desktop/CLI)
- `Covid-19-Notification-for-Desktop` → Python desktop script
- `Jarves` → Python voice assistant
- `Space-War` → Pygame
- `Tic-Tac-Tow` → Python CLI

### Screenshots/descriptions only
- `PowerBI-Practice-and-Projects` → .pbix files
- `Excel-Projects-and-worksheets` → Excel files
- `Car-Rental-System` → C source code + PDFs
