# NeuroFollow
A responsive neuroradiology reference website with 12 topic guides, clinical-context recommendations, source links, saved topics, and dark/light themes.

## Run
Requires Python 3 and Node.js (for tests). No dependency installation or build step.

```sh
npm run dev
npm test
```

The development server listens on port 3000. The site is static and can be deployed on any static host. Fonts use Google Fonts, with local system fallbacks. No patient data is sent to a backend. Saved topic identifiers and theme preferences are stored in localStorage.

## Evidence limitations
This is an educational prototype, not a clinically validated medical device. Guidance is curated from named publications, not a systematic current literature review. Only the pituitary topic includes an ACR white paper; other recommendations are explicitly sourced to specialty guidelines or reviews. Recommendations omit clinical factors and require individual interpretation. Full-text retrieval was blocked during development, so source content/links and newer guidance require clinical editorial review before clinical use. Acute presentations bypass incidental recommendations. No universal surveillance interval is invented for lesions lacking one.

## Structure
`data.js` contains the cited reference catalog and recommendation rules. `app.js` implements interactions. `style.css` contains the responsive theme. `tests/` exercises safety branches, topic coverage, and key thresholds.
