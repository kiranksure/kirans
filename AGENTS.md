# kirans.net — Agent Guide

## Project Overview

Personal website and experiments for **kirans.net**, hosted on **Firebase Hosting** (Google Cloud).

- **Live URL**: https://kirans.net
- **Repository**: https://github.com/kiranksure/kirans.net
- **Hosting**: Firebase Hosting — the `public/` directory is the web root

---

## Repository Structure

```
/
├── public/                  # Firebase web root → served at https://kirans.net
│   ├── index.html           # Landing page (28 Card Game — "Coming soon")
│   ├── index2.html          # Personal/agency site (Bootstrap Agency theme)
│   ├── css/
│   │   └── styles.css       # Bootstrap-based theme styles
│   ├── js/
│   │   ├── scripts.js       # Main JS (Bootstrap + custom)
│   │   └── test.js
│   └── assets/
│       └── img/
│           ├── portfolio/   # Portfolio item images (1.jpg–6.jpg)
│           ├── about/       # About section images
│           ├── team/        # Team member images
│           └── logos/       # Brand logos
├── circle/                  # Experiment: animated hollow circle (canvas)
│   ├── index.html
│   └── canvas.js
├── inter/                   # Prototype: 28 card game (canvas-based)
│   └── index.html
├── index.html               # Root-level copy (not served by Firebase)
├── index2.html              # Root-level copy (not served by Firebase)
├── firebase.json            # Firebase Hosting config
└── dump.rdb                 # Redis dump (not used in hosting)
```

---

## Hosting Configuration

Firebase Hosting serves from the `public/` directory. All unmatched routes are rewritten to `/index.html` (SPA-style fallback).

```json
// firebase.json
{
  "hosting": {
    "public": "public",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

**Key URLs:**

| Path                             | File served          | Description                          |
| -------------------------------- | -------------------- | ------------------------------------ |
| `https://kirans.net/`            | `public/index.html`  | 28 Card Game landing ("Coming soon") |
| `https://kirans.net/index2.html` | `public/index2.html` | Personal/agency website              |

> The `circle/` and `inter/` directories are **not** inside `public/` and are therefore **not** served on the live site.

---

## Pages

### `public/index.html` — 28 Card Game

- Minimal Tailwind CSS page
- Shows "Coming soon" placeholder
- Live at: https://kirans.net

### `public/index2.html` — Personal Website

- Bootstrap Agency theme with Tailwind utility additions
- Sections: **Services**, **Portfolio**, **About**, **Team**, **Contact**
- Fonts: Montserrat, Roboto Slab (Google Fonts)
- Icons: Font Awesome 6
- Live at: https://kirans.net/index2.html

### `circle/index.html` — Canvas Experiment

- Animated hollow circle with semicircles using HTML5 Canvas
- Logic in `circle/canvas.js`
- Not publicly hosted (local/dev only)

### `inter/index.html` — 28 Card Game Prototype

- Canvas-based card game with bidding mechanic
- Not publicly hosted (local/dev only)

---

## Tech Stack

| Layer           | Technology                             |
| --------------- | -------------------------------------- |
| Hosting         | Firebase Hosting (Google Cloud)        |
| CSS framework   | Bootstrap 5 + Tailwind CSS 2           |
| Icons           | Font Awesome 6                         |
| Fonts           | Google Fonts (Montserrat, Roboto Slab) |
| Interactivity   | Vanilla JS, HTML5 Canvas               |
| Version control | Git / GitHub                           |

---

## Development Notes

- All changes meant for production **must** be placed inside `public/`.
- Static assets (images, CSS, JS) go under `public/assets/`, `public/css/`, `public/js/`.
- The rewrite rule in `firebase.json` means new standalone HTML pages should be added directly to `public/` and will be accessible by filename (static files take priority over rewrites in Firebase Hosting).
- There is no build step — all files are served as-is.
- Deploy with: `firebase deploy`
