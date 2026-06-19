# data/

Structured metadata and (eventually) exported results for the benchmark.

## Files

- **`sample_metrics.json`** — placeholder clean-release metadata describing the planned run.
  It documents the project name, status, planned model/scenario/trial counts, taxonomy
  version, and publication status.

## Status

The site does **not** load this file dynamically — it is included as portable, machine-readable
documentation of the planned clean release. The numbers describe a *planned* run, not published
results.

```json
{
  "project": "Controlled LLM Benchmark for Partial Quantum Search Reasoning",
  "status": "clean_release_in_preparation",
  "models_planned": 8,
  "scenarios": 5,
  "trials_per_model_scenario": 3,
  "total_planned_responses": 120,
  "taxonomy": "v2",
  "public_results": "not_yet_published"
}
```

## After the clean release run

- Update `sample_metrics.json` (or add new files such as `clean_release_metrics.json`,
  `taxonomy_counts.csv`, `pass_rates.json`) with the real, human-reviewed results.
- Keep pipeline artifacts separated from model-performance statistics, consistent with
  taxonomy-v2.
- Only data from the clean release run should be presented as public results.

> If you later wire the site to read this JSON via `fetch()`, serve the folder over HTTP
> (e.g. `python3 -m http.server`) because browsers block `fetch()` of local files via
> the `file://` protocol. The current site intentionally avoids this so it works offline
> by double-clicking `index.html`.
