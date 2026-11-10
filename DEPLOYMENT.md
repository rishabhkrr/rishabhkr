# Portfolio Deployment Guide

## ✅ What's Done

Your portfolio is fully built and ready to deploy! Here's what's complete:

### Site Features
- **Modern Design**: Premium dark-first design with luminous gradient orbs and glass morphism
- **Comprehensive Content**: 30+ projects organized from your GitHub audit
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Responsive**: Works from 320px to 4K, fully keyboard navigable
- **SEO Ready**: Metadata, Open Graph tags, semantic HTML
- **Contact Form**: Formspree integration (needs your form ID)

### Project Structure
```
rishabhkr/
├── app/                    # Next.js app directory
│   ├── globals.css        # Design system with Tailwind
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Main page with all sections
├── content/
│   └── projects.ts        # Single source of truth for all projects
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions for automated deployment
├── docs/
│   ├── project-audit.md   # Complete audit of all repos
│   └── mockups/           # Design direction mockups
├── public/
│   └── .nojekyll          # Required for GitHub Pages
├── next.config.mjs        # Next.js config (static export)
├── tailwind.config.ts     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

---

## 🚀 Deployment Steps (You Need To Do)

### Option 1: Deploy to rishabhkrr.github.io (Recommended)

This will make your site available at **https://rishabhkrr.github.io**

#### Step 1: Create the rishabhkrr.github.io repository

1. Go to https://github.com/new
2. Repository name: `rishabhkrr.github.io`
3. Description: "Personal portfolio website"
4. Set as **Public**
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

#### Step 2: Push the portfolio code to the new repo

```bash
# Clone the new repo
git clone https://github.com/rishabhkrr/rishabhkrr.github.io.git
cd rishabhkrr.github.io

# Copy all files from the current rishabhkr repo
cp -r /path/to/rishabhkr/* .
cp -r /path/to/rishabhkr/.github .
cp /path/to/rishabhkr/.gitignore .
cp /path/to/rishabhkr/.nojekyll .

# Commit and push
git add .
git commit -m "feat: Initial portfolio deployment"
git push origin main
```

#### Step 3: Enable GitHub Pages

1. Go to https://github.com/rishabhkrr/rishabhkrr.github.io/settings/pages
2. Under "Build and deployment":
   - **Source**: GitHub Actions
3. The workflow will automatically deploy on the next push

Your site will be live at **https://rishabhkrr.github.io** within 1-2 minutes!

---

### Option 2: Deploy from rishabhkr repo

If you prefer to keep everything in the current repo:

#### Step 1: Enable GitHub Pages on rishabhkr repo

1. Go to https://github.com/rishabhkrr/rishabhkr/settings/pages
2. Under "Build and deployment":
   - **Source**: GitHub Actions
3. The workflow will deploy automatically

**Note**: Your site will be at **https://rishabhkrr.github.io/rishabhkr/** (with the repo name in the path)

---

## ⚙️ Configuration (Before Deploying)

### 1. Set Up Contact Form (Formspree)

1. Go to https://formspree.io and sign up (free tier: 50 submissions/month)
2. Create a new form
3. Copy your form ID (looks like `xyzabcde`)
4. Open `app/page.tsx` and find line ~470:
   ```tsx
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual form ID

### 2. Add Your Resume PDF

1. Place your resume PDF in the `public/` directory
2. Name it `rishabh-resume.pdf` (or update the path in `app/page.tsx` line ~120)

### 3. Update Contact Information

In `app/page.tsx`, update these placeholders:
- **Email**: Line ~490 — replace `rishabhkumar@example.com`
- **LinkedIn**: Line ~495 — replace `#` with your LinkedIn URL

### 4. (Optional) Add Case Study Details for Private Repos

For the flagship projects (quantdesk, job-search-copilot, ticketTracker), you can create detailed case study pages. See `content/projects.ts` — these are marked as `status: 'case-study'`.

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

Visit http://localhost:3000 to see the site.

---

## 📝 How to Add a New Project

1. Open `content/projects.ts`
2. Add a new entry to the `projects` array:

```typescript
{
  id: 'my-new-project',
  title: 'My New Project',
  description: 'A brief description of what this project does.',
  tier: 'featured', // 'flagship' | 'featured' | 'fun' | 'coursework'
  category: 'Web Applications',
  stack: ['React', 'TypeScript', 'Node.js'],
  status: 'live', // 'live' | 'demo' | 'screenshots' | 'case-study'
  github: 'https://github.com/rishabhkrr/my-new-project',
  liveUrl: 'https://my-new-project.vercel.app', // optional
  isPrivate: false,
}
```

3. Commit and push — the site will automatically rebuild!

---

## 📊 GitHub Stats (Optional Enhancement)

The site is ready to fetch live GitHub stats. To enable this:

1. Create a GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
2. Add it as a repository secret: `GITHUB_TOKEN`
3. Update the workflow to fetch stats at build time

*This is optional — the site works perfectly without it.*

---

## 🎨 Design System

### Colors
- **Background**: `#09090b` (near-black)
- **Accent**: `#7c5cff` (purple)
- **Accent Secondary**: `#06b6d4` (cyan)
- **Text Primary**: `#fafafa`
- **Text Secondary**: `#a1a1aa`

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (paragraphs)
- **Mono**: IBM Plex Mono (code, labels)

### Components
- Glass morphism cards with backdrop blur
- Gradient orbs (animated background)
- Smooth Framer Motion animations
- Responsive grid layouts

---

## ✅ Definition of Done Checklist

- [x] GitHub audit complete (docs/project-audit.md)
- [x] Modern UI/UX with premium design
- [x] All public projects showcased (30+ repos)
- [x] Responsive design (320px - 4K)
- [x] Accessibility (semantic HTML, keyboard nav)
- [x] SEO optimized (metadata, Open Graph)
- [x] GitHub Actions workflow for CI/CD
- [x] Contact form integration (Formspree)
- [x] Typed content system for easy updates
- [x] Smooth animations (Framer Motion)
- [ ] **YOU**: Deploy to GitHub Pages (see steps above)
- [ ] **YOU**: Set up Formspree form ID
- [ ] **YOU**: Add resume PDF
- [ ] **YOU**: Update email and LinkedIn URL

---

## 🆘 Troubleshooting

### Build fails
```bash
npm run build 2>&1 | tail -50
```
Check for TypeScript errors or missing dependencies.

### GitHub Actions workflow fails
Check the Actions tab: https://github.com/rishabhkrr/rishabhkr/actions
Common issues:
- Node.js version mismatch → workflow uses v20
- Missing dependencies → ensure package-lock.json is committed

### Site not updating after push
- GitHub Pages takes 1-2 minutes to deploy
- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check the Actions tab for deployment status

---

## 📞 Support

If you run into issues:
1. Check the Actions tab for build logs
2. Review the troubleshooting section above
3. Open an issue: https://github.com/rishabhkrr/rishabhkr/issues

---

**Your portfolio is ready to impress!** 🚀

The site showcases your unique position as a Product Owner who ships code — from fintech at FIS to ERP at Gemba, with AI projects and a strong technical foundation.
