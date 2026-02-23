---
title: "Refract"
tagline: "Drop a photo into a repo — AI critics from three different models tear it apart, an editor fixes it, and the result publishes itself"
github: "https://github.com/michaelcolenso/Refract"
image: "/assets/refract.png"
order: 3
---

## A self-correcting photography log

Push a photo to GitHub. That's it. Refract takes it from there.

A GitHub Actions workflow triggers a three-stage pipeline: multiple LLMs (Claude, GPT-4o, Gemini) analyze the photo and generate critique + improvement suggestions, an AI editor applies the enhancements, and a static site generator publishes the before/after with full documentation of what changed and why.

### Pipeline

1. **Multi-Critic** — Claude + GPT-4o + Gemini each review the photo independently
2. **Editor** — Gemini image generation applies the agreed improvements
3. **Generator** — Jinja2 rebuilds the static site; GitHub Pages deploys it

### Stack

Python · GitHub Actions · Anthropic Claude · OpenAI GPT-4o · Google Gemini · Jinja2 · PIL
