# RISE — project page

Project page for **RISE: Single Static Radar-based Indoor Scene Understanding**
(Kaichen Zhou, Laura Dodds, Sayed Saad Afzal, Fadel Adib — MIT Media Lab).

- Paper: https://arxiv.org/abs/2511.14019
- Code: https://github.com/kaichen-z/RISE
- Live: https://rise-cvpr.github.io/

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Whole page (single document) |
| `style.css` | Design system: light "paper" palette, teal/amber accents |
| `main.js` | Sticky-nav state, scroll-spy, scroll reveal, BibTeX copy |
| `static/images/` | Paper figures, self-hosted as WebP (~900 KB total) |

Figures are self-hosted rather than hot-linked from arXiv, so the page keeps
working if arXiv's HTML build for the paper changes.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

No build step, no dependencies. Fonts load from Google Fonts.
