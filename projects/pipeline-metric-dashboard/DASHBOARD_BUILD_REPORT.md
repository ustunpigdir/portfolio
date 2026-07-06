# Dashboard Build Report

## Inputs

Built from `/mnt/data/metric_comparison_findings_report_v1.zip`.

## Baseline

- Rows: 252
- PASS: 117
- FAIL: 135
- Models: 8
- Scenarios: 32

## Files

- `dashboard.html`
- `dashboard.css`
- `dashboard.js`
- `dashboard_data.js`
- `figures/` copied from the findings report

## Validation

The dashboard data contains 8 models, 32 scenarios, and 8 categories. Tolerance and large-numeric-failure headline values match the findings report.

No model calls, API calls, BERTScore reruns, ROSCOE reruns, database edits, or raw-output edits were performed.
