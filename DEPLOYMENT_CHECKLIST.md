# Deployment Checklist

## Current deploy folder

- `index.html`
- `partial-quantum-search-llm-evaluation/stage-2-report.html`
- `README.md`
- `styles.css`
- `script.js`

## Pre-deployment checks

- Open `index.html` locally.
- Click `View Stage 2 Results Page`.
- Confirm Stage 2 page opens.
- Click back to homepage.
- Confirm no Core Findings section exists.
- Confirm no Method section exists.
- Confirm pipeline carousel shows 4 cards on desktop.
- Confirm Stage 2 results and tables are still displayed.
- Confirm pending evidence links are visibly marked pending.

## Do not include

- `.env`
- API keys
- `stage1.db`
- raw logs
- internal app files
- `.venv`
- `__pycache__`
- archive folders
- `.DS_Store`

## GitHub Pages options

### Option A — Standalone repository

Use this if `portfolio-deploy/` becomes its own GitHub repo.

Commands:

```bash
cd portfolio-deploy
git init
git add .
git commit -m "Publish portfolio with Stage 2 PQS results"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

Then in GitHub:

- Go to repository Settings.
- Open Pages.
- Set source to `Deploy from a branch`.
- Select branch `main`.
- Select folder `/root`.

### Option B — Existing repository `/docs`

Use this if the portfolio will live inside an existing repository configured to publish from `/docs`.

Commands:

```bash
mkdir -p docs
cp -R portfolio-deploy/. docs/
git add docs
git commit -m "Add portfolio with Stage 2 PQS results"
git push
```

Then in GitHub:

- Go to repository Settings.
- Open Pages.
- Set source to `Deploy from a branch`.
- Select the publishing branch.
- Select folder `/docs`.

### Option C — `gh-pages` branch

Use this if the repository keeps source files on `main` and publishes static files from `gh-pages`.

Do not force-push unless you are sure the branch is only for deployment.

Typical manual flow:

```bash
git switch --orphan gh-pages
cp -R portfolio-deploy/. .
git add .
git commit -m "Publish portfolio with Stage 2 PQS results"
git push -u origin gh-pages
```

Then in GitHub:

- Go to repository Settings.
- Open Pages.
- Set source to `Deploy from a branch`.
- Select branch `gh-pages`.
- Select folder `/root`.

## Final verification after publishing

- Open the GitHub Pages URL.
- Confirm the homepage loads with styling.
- Confirm `View Stage 2 Results Page` opens the Stage 2 results page.
- Confirm the Stage 2 page back link returns to the homepage.
- Confirm pending evidence links are not active broken links.
- Confirm no private files, databases, or raw logs are visible in the deployed repository.
