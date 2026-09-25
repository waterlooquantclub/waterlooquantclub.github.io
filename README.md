# Waterloo Quant Club website

Static Vite + React site deployed to GitHub Pages from `client/`.

## Events

The events page does not keep its own list of events. It fetches
`GET /events/public` from the member portal at page load (URL in
`client/.env` as `VITE_PORTAL_API_URL`) and renders whatever the portal
returns. Create, edit, and archive events in the portal admin UI; archiving
an event there removes it from this site.

### Adding photos to an event

Photos are the one thing this repo still holds, because the portal has no
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

## Colonel Blotto

Same pattern as Events: the leaderboard page fetches `GET
/blotto/leaderboard/public` from the portal (`fetchPublicBlottoLeaderboard`
in `client/src/lib/portal.ts`) instead of keeping its own copy — it used to
read a public Google Sheet before the portal had this data. Submission
links point at `${VITE_PORTAL_APP_URL}/blotto` (defaults to
`https://portal.waterlooquantclub.com`) — the actual round/scenario
management and CSV-based scoring all happen in the portal, not here.
