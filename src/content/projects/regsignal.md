---
title: "RegSignal"
tagline: "Tracks how construction regulations propagate from Federal law down to local enforcement — and when they'll cost you money"
github: "https://github.com/michaelcolenso/rip"
image: "/assets/regsignal.jpg"
order: 1
---

## Federal Signal. Local Revenue.

Construction professionals face financial losses when regulations become locally enforceable — not when they're published federally. Existing policy-tracking tools completely miss this propagation timeline.

RegSignal is a regulatory intelligence platform that connects the dots: Federal Register entries → state building code updates → city council adoption → local enforcement dates.

### What it does

- **Propagation graph** — links federal rules to state updates to municipal decisions
- **Diff engine** — surfaces the specific text changes that matter
- **Lag forecaster** — estimates when a rule will actually hit your jobsite
- **Targeted ingestion** — scrapes unstructured municipal data from city planning portals

The MVP tracks energy code adoption in the Pacific Northwest: US DOE → Washington State Building Code Council → Seattle SDCI.

### Stack

Python · FastAPI · PostgreSQL · spaCy · sentence-transformers · BeautifulSoup · aiohttp
