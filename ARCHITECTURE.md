# FSCC Dynamic Church Kiosk

A local-first kiosk presentation scaffold for First Slavic Christian Church.

## Features
- local-first startup
- Overview + slide playback engine
- keyboard navigation
- offline-safe content fallback
- content persistence via localStorage
- default FSCC content and schedule
- responsive kiosk layout

## Getting started

```bash
npm install
npm run dev
```

Then open the local Vite URL in the browser.

## Production build

```bash
npm run build
npm run preview
```

## Notes
The app starts with bundled fallback content and attempts to load `/content.json` if it exists. Invalid content is rejected safely without breaking the runtime.
