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
