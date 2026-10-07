# NeuroFollow

Responsive neuroradiology reference website with 12 finding-specific questionnaires, source-linked recommendations, clinical team considerations, saved topics, and dark/light themes.

## Run

Requires Python 3 and Node.js (tests). No dependency installation or build step.

```sh
npm run dev
npm test
```

The server listens on port 3000. Deploy these static files on any static host. Google Fonts have system-font fallbacks. Case inputs remain in page memory; they are not sent to a backend or saved to localStorage. Only topic identifiers and theme preferences are persisted locally.

## Evidence

The supplied **2026 ACR pineal cyst** paper and both CT/MRI flowcharts were reviewed directly. Other topics combine radiology reviews with identified specialty guidelines. The pineal pathway is a source transcription; other pathways are simplified clinical-reference summaries, not complete validated algorithms. Pituitary surveillance is explicitly attributed to Endocrine Society 2011 rather than mislabeled ACR guidance.

Read [the evidence and pathway audit](docs/EVIDENCE.md) for branch thresholds, source provenance, clinical-team considerations, and remaining verification limits. Network policy blocked independent retrieval of external publications. Those references and newer guidelines require clinical editorial verification before clinical deployment. This is an educational prototype, not a clinically validated medical device.

## Files

- `data.js`: source catalog, topic-specific input schemas, and recommendation rules.
- `app.js`: form rendering, input validation, tab-state preservation, result panels, and browser interactions.
- `style.css`: responsive themes.
- `tests/recommendations.test.cjs`: clinical branch and input-validation regression tests.
- `docs/EVIDENCE.md`: evidence audit and complete pineal branch table.

## Optional browser integration checks
With Playwright and Chromium separately available, run `node tests/browser.cjs` while the development server is running. Set `CHROMIUM_PATH` if Chromium is not at `/usr/bin/chromium`. This checks every topic form, cited results, tab-state retention, input-change invalidation, pineal CT/MRI branching, immediate acute alerts, and mobile width. Playwright is not required to serve the website or run `npm test`.
