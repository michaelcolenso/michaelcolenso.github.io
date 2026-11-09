---
title: "Building Seattle"
tagline: "A public Seattle construction-permit database with search, API docs, and an MCP endpoint."
link: "https://buildingseattle.com"
github: "https://github.com/michaelcolenso/buildingseattle"
image: "/assets/building-seattle.png"
order: 0
---

## Permits, projects, and daily SDCI changes

Building Seattle is a public database of Seattle construction permits, projects, contractor activity, neighborhoods, and daily SDCI status changes, built from the City’s open-data feeds.

### What it does

- Search surfaces for permits, contractors, neighborhoods, projects, and addresses
- Documented REST API, OpenAPI spec, and a public MCP endpoint
- Daily scheduled ingest into D1, with permits cleaned, clustered, and scored against a published methodology
- Token-gated admin and ingest routes so a second owner can operate the system

### Stack

Cloudflare Worker · Python ingestion · D1 · scheduled ingest · REST · OpenAPI · MCP
