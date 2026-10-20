import type { PublicEvent } from "./portal";

interface CompetitionDetails {
  publicLocation?: string;
  applicationDeadline?: string;
  prizePool?: string;
}

// Confirmed public details for this edition. The portal does not yet expose
// application deadlines; prefer its value when that field becomes available.
const DETAILS: Record<string, CompetitionDetails> = {
  "waterloo-fall-trading-competition": {
    publicLocation: "Waterloo, Ontario",
    applicationDeadline: "2026-10-21T23:59:00-04:00",
    prizePool: "$10,000",
  },
};

export function competitionDetailsFor(event: PublicEvent) {
  const details = event.slug ? DETAILS[event.slug] : undefined;
  return {
    location: details?.publicLocation ?? event.location,
    applicationDeadline: event.application_deadline ?? details?.applicationDeadline ?? null,
    prizePool: details?.prizePool,
  };
}

export function applicationsAreOpen(event: PublicEvent, now = Date.now()): boolean {
  const { applicationDeadline } = competitionDetailsFor(event);
  const deadline = applicationDeadline ? Date.parse(applicationDeadline) : NaN;
  return event.application_only === true && Boolean(event.application_url) &&
    event.status === "upcoming" && (!Number.isFinite(deadline) || now < deadline);
}

export function nextCompetition(events: PublicEvent[]): PublicEvent | undefined {
  return events
    .filter(event => event.event_type?.trim().toUpperCase() === "COMPETITION" && event.status === "upcoming")
    .sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time))[0];
}
