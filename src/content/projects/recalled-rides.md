---
title: "Recalled Rides"
tagline: "A Cloudflare vehicle-recall search with LLM plain-English summaries and a public MCP server."
link: "https://recalledrides.com"
github: "https://github.com/michaelcolenso/recall-radar"
image: "/assets/recalled-rides.png"
order: 0
---

## NHTSA data, clearer language

Recalled Rides aggregates NHTSA safety recall data, enriches it with LLM plain-English summaries, and serves pages from the edge. Raw government text stays separate from enriched text, with fallback to the source.

### What it does

- Vehicle recall search across makes, models, and years
- Public read-only MCP tools for vehicle search, model lists, recall details, and campaign lookup
- Cloudflare Workflows for ingestion and enrichment, with authenticated admin and ingest routes
- Documented deploy and operations so the same data is available through the website and MCP

### Stack

Hono · Cloudflare Workers · D1 · Cache API · Workflows · Workers AI · MCP
