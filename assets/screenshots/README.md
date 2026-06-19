# assets/screenshots/

Screenshots of the benchmark pipeline and outputs. These make the case study
concrete once they are available.

## Suggested screenshots

- `scenario-builder.png` — controlled prompt + gold-answer definition
- `model-runner.png` — identical prompts dispatched across models
- `numeric-checker.png` — deterministic numeric comparison output
- `autograder-labels.png` — Sonnet-assisted advisory labels
- `review-queue.png` — human review queue
- `failure-dashboard.png` — failure-analysis dashboard
- `pass-rate-by-model.png` — final chart (after clean release run)
- `model-by-scenario-heatmap.png` — final chart (after clean release run)

## How to embed

In `index.html`, replace a `.chartph` placeholder or add an `<img>` in the relevant section:

```html
<img src="assets/screenshots/failure-dashboard.png" alt="Failure analysis dashboard" />
```

Use descriptive `alt` text and keep file sizes compressed.

> Until the clean release run is complete, do not present screenshots as final results.
