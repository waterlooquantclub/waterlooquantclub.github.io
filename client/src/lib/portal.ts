/**
 * Read-only client for the member portal's public events feed.
 *
 * The portal is the single source of truth for event data; this site only
 * renders it (and supplies photos from `src/assets/events/<slug>/`).
 */

export const PORTAL_API_URL =
  import.meta.env.VITE_PORTAL_API_URL?.trim().replace(/\/$/, "") ||
  "https://portal.waterlooquantclub.com/api";

export type PublicEventStatus = "upcoming" | "live" | "past";
export type PublicEventLinkKind = "video" | "slides" | "pdf" | "external";

export interface PublicEventLink {
  kind: PublicEventLinkKind;
  url: string;
  label: string | null;
}

export interface PublicRankingEntry {
  rank: number;
  name: string;
  score: number;
}

export interface PublicEvent {
  id: number;
  slug: string | null;
  title: string;
  start_time: string; // ISO-8601, UTC
  end_time: string | null;
  description: string | null;
  location: string | null;
  status: PublicEventStatus;
  event_type: string | null;
  tags: string[];
  links: PublicEventLink[];
  rankings: PublicRankingEntry[];
  registration_url: string | null;
  calendar_url: string;
}

export async function fetchPublicEvents(signal?: AbortSignal): Promise<PublicEvent[]> {
  const res = await fetch(`${PORTAL_API_URL}/events/public`, { signal });
  if (!res.ok) {
    throw new Error(`Portal responded with ${res.status}`);
  }
  return (await res.json()) as PublicEvent[];
}
