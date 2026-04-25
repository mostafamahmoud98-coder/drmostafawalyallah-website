# Dr. Mostafa Walyallah — Ophthalmology Website

Bilingual (Arabic RTL / English LTR) static website for the Ismailia clinic, the Ferdaws Eye Hospital retina fellowship in Zagazig, and the Cairo Tuesday clinic. Built for Google Search, Bing, and the AI engines (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) with structured data and explicit AI-bot allowlisting.

**Live at:** https://www.drmostafawalyallah.com

---

## How edits get deployed

This repo is connected to Netlify. Every push to the `main` branch triggers an automatic deploy to the live site (~60 seconds). No manual zip-dragging required.

**Edit workflow:**
1. Edit the relevant files (or use the CMS at `/admin/` once Phase 2 is wired).
2. Commit and push via GitHub Desktop.
3. Netlify auto-deploys.
4. Live in ~1 minute.

---

## Project structure

```
website/
├── index.html                       Arabic homepage (default language)
├── about.html                       Arabic about page
├── contact.html                     Arabic contact page
├── services/                        Arabic service pages (cataract, lasik, retina, injections)
├── en/                              English mirror of the entire site
├── assets/
│   ├── css/style.css                Shared stylesheet (RTL + LTR via CSS logical properties)
│   ├── js/script.js                 Vanilla JS (nav, scroll-reveal, lightbox, year stamp)
│   └── images/                      Real OR + conference photos, favicon
├── admin/                           Decap CMS (live after Phase 2)
├── robots.txt                       AI + search crawler allowlist
├── sitemap.xml                      Bilingual sitemap with hreflang alternates
└── README.md                        This file
```

---

## What's wired

- **SEO**: canonical URLs + hreflang (ar / en / x-default) on every page.
- **Schema.org JSON-LD**: Physician, MedicalBusiness, MedicalProcedure, FAQPage, BreadcrumbList.
- **Open Graph + Twitter cards** on every page.
- **AI crawler allowlist**: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Meta-ExternalAgent, Applebot-Extended, Bytespider.
- **Mobile-first responsive layout**.
- **HTTPS**: provisioned automatically by Netlify.

---

## Compliance note

Copy is deliberately conservative — no outcome guarantees, no fabricated testimonials, no pricing, no superlatives. Every service page closes with a note that treatment decisions require an in-person exam. This aligns with Egyptian Medical Syndicate advertising guidance and Google's medical content quality standards (YMYL).
