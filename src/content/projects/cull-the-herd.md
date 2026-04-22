---
title: "Cull the Herd"
tagline: "A CLI that ranks photo sets with local quality checks and AI vision critique."
github: "https://github.com/michaelcolenso/cull-the-herd"
image: "/assets/cull-the-herd.jpg"
order: 4
---

## Find your best shots, fast

Point it at a folder of photos and get back a ranked view of the strongest images.

Cull the Herd uses OpenAI's vision API to critique photos in batch, scoring each one across four dimensions: composition, lighting, subject matter, and technical quality. A local pre-pass using burst clustering and quality heuristics reduces API calls before the heavy lifting starts.

### Features

- Batch processing via OpenAI batch API (async, cheap)
- Local pre-pass: burst clustering + blur/exposure metrics to cut API spend
- Score filtering — surface only the shots above your threshold
- JSON or Markdown output
- HTML gallery + XMP rating export
- HEIC support

### Stack

Python · OpenAI Vision API · SQLite · Rich CLI
