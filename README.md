# Ustunpasa Igdir — LLM Evaluation Portfolio

A static, single-page portfolio that positions Ustunpasa Igdir as a physics-trained
**LLM evaluator, scientific-reasoning benchmark designer, and data-annotation specialist**.

It is built with plain **HTML, CSS, and vanilla JavaScript** — no frameworks, no build
tools, no backend, no external CDNs, and no external fonts. It works offline and deploys
directly to GitHub Pages.

---

## Project purpose

Showcase domain-specific LLM evaluation work — controlled benchmarks, gold-answer rubrics,
a grouped failure-mode taxonomy (taxonomy-v2), and human-review workflows — in a credible,
academic-meets-modern technical case-study format. The featured case study is a controlled
benchmark for **partial quantum search reasoning** whose clean release run is in preparation.

---

## Research source and answer-key verification

The partial quantum search benchmark is source-grounded. The initial mathematical setup was
derived from V. E. Korepin, “Partial Quantum Search of a Database,” arXiv:quant-ph/0504157. The
benchmark scenarios are controlled variants created for LLM evaluation and are not copied directly
from the paper.

Gold answers were calculated and checked using Python scientific libraries such as SymPy, NumPy,
SciPy, and mpmath where appropriate, then manually verified step by step before being used for
evaluation.

Source: <https://arxiv.org/abs/quant-ph/0504157>

---

## File structure

```text
ustunpasa-portfolio/
├── index.html              # All page content (15 sections, single page)
├── styles.css              # Design tokens + all styling (system fonts only)
├── script.js               # Mobile nav toggle + active-section highlight
├── README.md               # This file
├── assets/
│   ├── README.md           # Where to place images/logos
│   └── screenshots/
│       └── README.md       # Where to place pipeline/dashboard screenshots
└── data/
    ├── README.md           # Notes on the data directory
    └── sample_metrics.json # Placeholder clean-release metadata
```

---

## How to open locally

No server or install step is required.

- **Easiest:** double-click `index.html` to open it in your browser, **or**
- From a terminal:
  ```bash
  open index.html          # macOS
  xdg-open index.html      # Linux
  start index.html         # Windows
  ```

Optional (only if you later add `fetch()`-based JSON loading, which is **not** required):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## How to deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `ustunpasa-portfolio`).
2. Put the contents of this folder at the **repository root** (so `index.html` is at the top).
3. Commit and push:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ustunpasa-portfolio.git
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment**.
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/ (root)**
5. Wait ~1 minute. Your site will be live at
   `https://<your-username>.github.io/ustunpasa-portfolio/`.

> Tip: For a cleaner URL, name the repo `<your-username>.github.io` to serve from the root domain.

---

## Placeholders to replace

These are intentionally generic until real links/results exist:

| Where | Current placeholder | Replace with |
| --- | --- | --- |
| Nav "View GitHub" button | `https://github.com/` | Your GitHub profile or repo URL |
| Links → GitHub repository | `https://github.com/` | Project repo URL |
| Links → Hugging Face dataset | `https://huggingface.co/` | Your HF dataset URL |
| Links → Clean release report | `Coming soon` (disabled) | Report URL once published |
| Links → Failure examples | `Coming soon` (disabled) | Failure-cases URL once published |
| Links → CV | `Coming soon` (disabled) | CV file or URL |
| LinkedIn (nav/links/contact) | `https://www.linkedin.com/in/ustunpasaigdir` | Confirm exact handle |
| Email (contact + CTA) | `guiaustunigdir@icloud.com` | Confirm preferred address |

Search `index.html` for `https://github.com/`, `https://huggingface.co/`, and
`Coming soon` to find every spot quickly.

---

## Where to add screenshots

Place image files in `assets/screenshots/` (PNG/JPG/WebP/SVG). Suggested shots:
scenario builder, model runner, numeric checker output, autograder labels, human review
queue, and the failure-analysis dashboard.

To display one, add an `<img>` in the relevant section of `index.html`, e.g.:

```html
<img src="assets/screenshots/dashboard.png" alt="Failure analysis dashboard" />
```

Always include descriptive `alt` text for accessibility.

---

## Where to add final benchmark charts / results

The **Results preview** section (`#results`) contains two clearly marked
`.chartph` chart placeholders. After the clean release run:

1. Export your charts as images (or inline SVG) into `assets/screenshots/`.
2. Replace each `.chartph` block's contents with the real chart, e.g.:
   ```html
   <div class="chartph">
     <img src="assets/screenshots/pass-rate-by-model.png" alt="Pass rate by model" />
   </div>
   ```
3. Update the explanatory copy and remove the `Pending` / placeholder text.
4. Optionally update `data/sample_metrics.json` with final numbers.

> Do not present any number as a final result until it comes from the clean release run.

---

## How to update GitHub / Hugging Face links

All external links live in two places in `index.html`:

- The **nav** "View GitHub" button.
- The **Links** section (`#links`) cards.

Replace the placeholder `href` values listed in the table above. For disabled
"Coming soon" cards, change the `<span class="linkcard linkcard--disabled">` to an
`<a class="linkcard" href="...">` and remove the `aria-disabled`/`tabindex` attributes
and the `badge--soon` badge once the resource is live.

---

## Tech notes

- **No external dependencies.** Fonts use a system stack (Inter requested, system fallback).
- **JavaScript is optional.** With JS disabled the site is fully readable; only the mobile
  menu toggle and active-link highlight are enhancements.
- **Accessibility:** skip link, focus-visible states, semantic landmarks, `alt`-ready images,
  and accessible color contrast on the navy/off-white palette.
- **Responsive:** breakpoints at 900px (stack two-column layouts) and 680px (mobile nav).

---

© 2026 Ustunpasa Igdir · LLM evaluation · Scientific reasoning · Multilingual annotation
