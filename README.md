<<<<<<< HEAD
# Rooted 🌱

An NGO donation and volunteer platform where campaigns are treated like
something you plant and grow — not just progress bars to fill. Built as
a team project to practice React Router, Context API, component reuse,
and real Git collaboration across a 5-person team.

## Live demo
[link once deployed]

## Features
- Browse, search, filter, and sort campaigns
- Full CRUD for campaigns
- Volunteer signup and donation forms (simulated) with validation
- Responsive design, loading and error states

## Tech stack
React · Vite · React Router · Context API

## Team & task breakdown

| Person | Owns |
|--------|------|
| A | Infrastructure — repo setup, routing, Context, theme tokens, PR reviews |
| B | Landing page, Card + ReusableButton components |
| C | Campaign browsing — search, filter, sort |
| D | Campaign details + CRUD wiring, Modal component |
| E | Volunteer form + Donation form, Loader + error states |

## Design tokens

```css
--color-primary: #1F4D2C;    /* canopy green */
--color-accent: #E0A526;      /* marigold - CTAs */
--color-secondary: #7A4B32;   /* soil brown */
--color-success: #4C8C4A;     /* growth green - progress meter */
--color-bg: #FAF6EE;          /* cream */
--color-text: #22281F;        /* charcoal moss */
```

Defined in `src/theme.css` — use these variables in every component instead of hardcoding colors.

## Git workflow

- Never push directly to `main`
- One branch per task: `feature/landing-page`, `feature/campaign-browsing`, etc.
- Open a PR into `main`, get at least one teammate's review before merging
- Commit messages: `feat:`, `fix:`, `style:`, `docs:` prefixes

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/rooted-ngo-platform.git
cd rooted-ngo-platform
npm install
npm run dev
```

## Timeline

- **Week 1** — setup, routing, Context (done)
- **Week 2** — individual page builds
- **Week 3** — integration, bug fixes
- **Week 4** — polish, responsive pass, deploy, presentation prep
=======
# NGO Donation & Volunteer Platform — Team Project Plan

## 1. Tech Stack Decision

Before anyone writes code, agree on this as a team:

- **React + Vite** (fast setup, matches what most of you already know)
- **React Router** for the 5 pages
- **Context API + useState** for shared state (campaigns list, volunteers, donations) — no need for Redux at this scale
- **CSS**: plain CSS Modules or Tailwind (pick one, don't mix)
- **Data**: since this is a simulation with no real backend, store campaign/volunteer/donation data in a `data.js` file to start, then persist changes with **localStorage** so CRUD actually "sticks" on refresh
- **Deployment**: GitHub Pages (like your quiz app) or Vercel

Lock this in as a team before splitting tasks. If two people build in different styles, integration becomes painful.

---

## 2. GitHub Collaboration Setup

**Repo setup (one person, ideally whoever's most comfortable with Git, does this first):**

1. Create the repo, add all 5 teammates as collaborators
2. Set up a `main` branch (protected — no direct pushes) and a `dev` branch (where everyone merges into)
3. Create a base Vite + React project, push it, so everyone starts from the same skeleton
4. Set up a `README.md` skeleton immediately (fill it in fully at the end)
5. Set up folder structure so nobody argues about "where do I put this":

```
src/
  components/     -> Navbar, Footer, Cards, Modal, Loader, ReusableButton, SearchBar, FilterPanel, SortDropdown
  pages/          -> LandingPage, CampaignsPage, CampaignDetails, VolunteerForm, DonationForm
  context/        -> CampaignContext.jsx (shared state + CRUD functions)
  data/           -> campaigns.js (seed/mock data)
  App.jsx
  main.jsx
```

**Branching workflow (everyone follows this):**

- Never push directly to `main` or `dev`
- Each task gets its own branch: `feature/landing-page`, `feature/campaign-browsing`, `feature/donation-form`, etc.
- Work → commit → push your branch → open a Pull Request into `dev`
- **At least one other teammate reviews and approves before merging** — this is what makes it "collab" instead of 5 people working alone
- Only merge `dev` into `main` when a milestone is stable and demo-ready

**Commit message convention** (keeps history readable):
```
feat: add search bar component
fix: campaign filter not resetting on category change
style: navbar responsive layout
docs: update README with setup instructions
```

**Task tracking:** Use GitHub Projects (Kanban board — To Do / In Progress / In Review / Done). Turn every item in the task list below into an Issue, assign it, link it to a branch. This alone will make your group look organized if a lecturer checks the repo.

---

## 3. Task Breakdown (5 People)

Split by page/feature so each person owns something end-to-end and there's minimal overlap.

### Person A — Project Lead / Infrastructure
- Initial repo setup, folder structure, Vite config
- React Router setup (all routes wired, even before pages are built — use placeholder pages)
- Navbar + Footer components (shared across all pages)
- `CampaignContext.jsx` — the shared state and CRUD functions (add/edit/delete campaign) that everyone else will plug into
- Merges PRs, keeps `dev` branch clean, chases people for updates

### Person B — Landing Page + Core Reusable Components
- Landing Page (hero section, intro to the NGO, call-to-action buttons)
- `Card` component (used for displaying campaigns)
- `ReusableButton` component (variants: primary, secondary, danger — used everywhere)
- Responsive design pass on their own pages

### Person C — Campaign Browsing Page
- Campaign listing page pulling from Context
- `SearchBar` component (search by title)
- `FilterPanel` component (filter by category)
- `SortDropdown` component (sort by newest/title)
- Wires all three together so browsing page is fully functional

### Person D — Campaign Details + CRUD
- Campaign Details page (dynamic route, `/campaigns/:id`)
- `Modal` component (used for edit/delete confirmation)
- Full CRUD wiring: create, edit, delete campaign — connects to the Context Person A built
- Form validation for the "add/edit campaign" form

### Person E — Volunteer Form + Donation Form
- Volunteer Form page (name, email, availability, skills — validated)
- Donation Form page (simulation only — amount, campaign selection, mock "success" state)
- `Loader` component (bonus: loading state)
- Error state handling (bonus requirement)

**Note:** Whoever finishes early helps with the bonus requirements (loading/error states) and the presentation/demo prep — don't let one person carry that alone.

---

## 4. Suggested Timeline (adjust to your deadline)

**Week 1 — Setup & Foundations**
- Team agrees on tech stack, folder structure, design (maybe a quick Figma or just a shared mood board for colors/fonts)
- Person A finishes repo setup, routing skeleton, Context
- Everyone clones the repo, confirms they can push a branch and open a PR (do a test PR as a group to make sure Git is working for everyone before real work starts)

**Week 2 — Individual Build**
- Everyone builds their assigned page/components in their own branch
- Daily or every-other-day check-in (WhatsApp group is fine) — "what did you finish, what are you stuck on"
- PRs opened as pieces are done, not all at once at the end

**Week 3 — Integration**
- Merge everything into `dev`, fix conflicts and styling mismatches
- Connect all pages through the Navbar/routing
- Test CRUD end-to-end (add a campaign, see it show up in browsing page, edit it, delete it)
- Fix bugs found during integration

**Week 4 — Polish & Deliverables**
- Responsive design pass across all pages
- Loading/error states (bonus)
- Write the full README (setup instructions, screenshots, team member contributions)
- Deploy (GitHub Pages/Vercel)
- Prepare presentation/demo — decide who presents what

---

## 5. Practical Tips

- **Don't let one person do all the merging alone under pressure at the end** — merge early and often, even half-finished features, into `dev`
- **Agree on prop names and data shape early** (e.g. what fields does a "campaign" object have: `id, title, category, description, goalAmount, raisedAmount, image`). Write this down in `data/campaigns.js` on day one so nobody builds against a different shape
- **Use GitHub Issues for bugs**, not WhatsApp messages that get lost
- The README should credit each person's contribution — good for accountability and good if this gets graded individually too
>>>>>>> 0bc4653280c07de54d599c9f6e75224308d62262
