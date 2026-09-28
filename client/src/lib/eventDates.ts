/** Formatting for event times, always shown in Waterloo's time zone. */

const TIME_ZONE = "America/Toronto";

export function formatShortEventDate(startIso: string): string {
  const date = new Date(startIso);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "short",
    day: "numeric",
  }).format(date);
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
  year: "numeric",
});

const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

const zoneFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  timeZoneName: "short",
});

function zoneAbbrev(d: Date): string {
  return zoneFmt.formatToParts(d).find((p) => p.type === "timeZoneName")?.value ?? "";
}

/**
 * "September 24, 2026, 6:00–8:00 PM EDT" for a same-day range,
 * "September 24, 2026, 6:00 PM EDT" with no end time, and
 * "November 22, 2025, 10:00 AM – November 23, 2025, 5:00 PM EST" across days.
 */
export function formatEventDate(startIso: string, endIso: string | null): string {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return "";
  const zone = zoneAbbrev(start);
  const end = endIso ? new Date(endIso) : null;

  if (!end || Number.isNaN(end.getTime())) {
    return `${dateFmt.format(start)}, ${timeFmt.format(start)} ${zone}`;
  }

  if (dateFmt.format(start) === dateFmt.format(end)) {
    const startTime = timeFmt.format(start);
    const endTime = timeFmt.format(end);
    // Collapse "6:00 PM–8:00 PM" to "6:00–8:00 PM" when both share a period.
    const period = /\s(AM|PM)$/;
    const startPeriod = period.exec(startTime)?.[1];
    const endPeriod = period.exec(endTime)?.[1];
    const startPart =
      startPeriod && startPeriod === endPeriod ? startTime.replace(period, "") : startTime;
    return `${dateFmt.format(start)}, ${startPart}–${endTime} ${zone}`;
  }

  return `${dateFmt.format(start)}, ${timeFmt.format(start)} – ${dateFmt.format(end)}, ${timeFmt.format(end)} ${zone}`;
}

/** "FALL 26" style term tag derived from the event's start, matching the archive filters. */
export function termTag(startIso: string): string | null {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "numeric",
    year: "2-digit",
  }).formatToParts(start);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const year = parts.find((p) => p.type === "year")?.value;
  if (!month || !year) return null;
  const term = month <= 4 ? "WINTER" : month <= 8 ? "SPRING" : "FALL";
  return `${term} ${year}`;
}

/** Season and four-digit year for the competition catalogue, e.g. `{ season: "Winter", year: "2026" }`. */
export function termParts(startIso: string): { season: string; year: string } | null {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "numeric",
    year: "numeric",
  }).formatToParts(start);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const year = parts.find((p) => p.type === "year")?.value;
  if (!month || !year) return null;
  const season = month <= 4 ? "Winter" : month <= 8 ? "Spring" : "Fall";
  return { season, year };
}
