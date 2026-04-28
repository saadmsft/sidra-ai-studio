# Sidra AI Use-Case Studio

An interactive studio that walks Sidra Medicine through nine governed AI use cases adapted by **Nanox Technologies** from the M42 portfolio (originally proposed by Jad Salloum).

🌐 **Live site:** https://saadmsft.github.io/sidra-ai-studio/

## What's inside

For every use case, the studio surfaces:

- Business goals, personas, and Sidra-specific considerations (JCI, family-centered care, Arabic + English, Qatar MoPH residency)
- Functional and non-functional requirements + success metrics
- Integration systems and data sources
- A logical **architecture diagram** (Mermaid `flowchart`)
- An **end-to-end flow** sequence diagram
- Risks / mitigations and a Discovery → Pilot → Scale phasing

## The nine use cases

1. Clinical Pathway / CPG Agent
2. Patient Voice Bot (omnichannel, AR + EN)
3. ITSM AI Agent
4. Sidra AI Landing Zone
5. Patient Administrative Assistant
6. OR Scheduling Automation
7. Critical Lab Results Automation
8. Occupational Health Automation
9. Revenue Cycle Management Optimization

## Run locally

```bash
python3 -m http.server 8801
# then open http://localhost:8801
```

The app is fully static (HTML + CSS + vanilla JS, Mermaid + Marked from CDN). No build step.

## Tech notes

- Theme: maroon / teal / gold palette inspired by Sidra's brand cues
- Light + dark mode (toggle in the header)
- Mermaid 10.9 for diagrams, themed for both modes
- Plus Jakarta Sans + Fraunces typography

---

© 2026 Nanox Technologies · Sales material prepared for Sidra Medicine, Doha
