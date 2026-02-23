---
title: "Cull the Herd"
tagline: "AI-powered CLI that scores hundreds of photos so you don't have to — composition, lighting, subject, technical quality"
github: "https://github.com/michaelcolenso/cull-the-herd"
image: "/assets/cull-the-herd.jpg"
order: 4
---

## Find your best shots, fast

Point it at a folder of photos. Get back a ranked list of your best work.

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
