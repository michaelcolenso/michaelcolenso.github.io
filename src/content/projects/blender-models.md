---
title: "Blender models"
tagline: "A spec-driven, provenance-tracked Blender pipeline for restoration and VDC work in occupied multifamily buildings."
github: "https://github.com/michaelcolenso/blender-models"
image: "/assets/blender-models.png"
order: 0
---

## Accuracy first, realism second

A document-driven VDC pipeline that builds Blender models headless from construction drawings, details, specs, and site photos. YAML specs are the source of truth; every dimension traces to a source or is labeled assumed.

### What it does

- Spec-driven geometry builds with automated checks for missing sources, counts, and extents
- Separate existing-conditions and proposed-repair models, with required review renders
- Quantity takeoff workbooks that keep measured inputs distinct from derived formulas
- Operator docs for method, runbook, and getting started, plus CI rebuilds for changed specs

### Stack

Blender · Python · YAML specs · automated checks · CI · quantity takeoff
