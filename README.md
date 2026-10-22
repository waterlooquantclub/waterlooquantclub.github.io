# Waterloo Quant Club website

Static Vite + React site deployed to GitHub Pages from `client/`.

## Game tests

Run these commands from `client/`:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:e2e
```

The browser tests build the app and start a local preview server. They cover
24 Game keyboard controls, dialogs, mobile settings, and timer transitions.
To use an installed Chrome instead of Playwright's Chromium, set
`PLAYWRIGHT_CHANNEL=chrome` in your shell before running `npm run test:e2e`.

## Events

The events page does not keep its own list of events. It fetches
`GET /events/public` from the member portal at page load (URL in
`client/.env` as `VITE_PORTAL_API_URL`) and renders whatever the portal
returns. Create, edit, and archive events in the portal admin UI; archiving
an event there removes it from this site.

The homepage highlights the next upcoming competition from the same feed.
`client/src/lib/competitionDetails.ts` holds confirmed public details that the
feed does not yet supply: the Fall 2026 deadline, public location, and prize
pool. A deadline supplied by the portal takes precedence; the Apply action
closes after the deadline. The competition FAQ is shared across editions in
`client/src/lib/competitions.ts`. Sponsor assets and tiers are shared between
the homepage and Sponsors page in `client/src/lib/sponsors.ts`.

### Adding photos to an event

Photos are kept in this repo because the portal has no
public file storage. They are matched to events by **slug**:

1. Find the event's slug in the portal admin (the "Slug" field on the event's
   details page, e.g. `f26cubist`).
2. Put the photos in `client/src/assets/events/<slug>/`. Any `.jpg`, `.jpeg`,
   `.png`, or `.webp` in that folder is shown in the gallery, in filename order
   (numeric-aware, so `photo2.jpg` sorts before `photo10.jpg`).
3. Optionally add `captions.json` to the folder, mapping filename to caption:
   `{ "harry.jpg": "Harry Jiang: QT @ Jane Street" }`.
4. Open a PR. The gallery is resolved at build time, so nothing else needs
   editing.

Recordings, slide decks, and PDFs are links, and are added on the event in
the portal, not here. In development, a folder whose name matches no portal
slug logs a warning in the browser console.
