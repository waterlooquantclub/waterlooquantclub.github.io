/** Turns a portal event plus this site's photos into what the events page renders. */
import type { EventData, GalleryItem } from "@/components/EventDialog";
import { formatEventDate, termTag } from "@/lib/eventDates";
import { galleryFor } from "@/lib/eventGallery";
import type { PublicEvent } from "@/lib/portal";
import { applicationsAreOpen, competitionDetailsFor } from "@/lib/competitionDetails";

/** Accepts watch, short, or embed YouTube URLs and returns an embeddable one. */
export function toYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) return url;
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const live = /^\/(live|shorts)\/([^/]+)/.exec(parsed.pathname);
      if (live) return `https://www.youtube.com/embed/${live[2]}`;
    }
  } catch {
    // Not a URL we understand; the iframe will show whatever it is.
  }
  return url;
}

export function toEventData(event: PublicEvent): EventData {
  const { location } = competitionDetailsFor(event);
  let calendarlink = event.status === "upcoming" ? event.calendar_url : undefined;
  if (calendarlink && location && location !== event.location) {
    try {
      const url = new URL(calendarlink);
      url.searchParams.set("location", location);
      calendarlink = url.toString();
    } catch {
      // Preserve the portal's URL if it is not an absolute calendar link.
    }
  }
  const videos: GalleryItem[] = event.links
    .filter((l) => l.kind === "video")
    .map((l) => ({
      type: "video",
      src: toYouTubeEmbedUrl(l.url),
      alt: l.label ?? `${event.title} Recording`,
    }));

  const labels = { video: "Watch Recording", slides: "View Slide Deck", pdf: "View Event Details", external: "Learn More" };
  const resourceLinks = event.links.map((link) => ({
    label: link.label?.trim() || labels[link.kind],
    url: link.url,
  }));

  const tags = new Set<string>();
  const term = termTag(event.start_time);
  if (term) tags.add(term);
  if (videos.length > 0) tags.add("RECORDING");
  for (const tag of event.tags) tags.add(tag.toUpperCase());

  const externalLink = event.application_only
    ? applicationsAreOpen(event) ? { label: "Apply", url: event.application_url! } : undefined
    : event.registration_url ? { label: "RSVP", url: event.registration_url } : undefined;

  return {
    title: event.title,
    date: formatEventDate(event.start_time, event.end_time),
    location: location ?? "TBA",
    type: event.event_type ?? "Event",
    tags: Array.from(tags),
    description: event.description ?? "",
    galleryImages: [...videos, ...galleryFor(event.slug)],
    resourceLinks,
    rankings: event.rankings.length > 0 ? event.rankings : undefined,
    calendarlink,
    externalLink,
  };
}
