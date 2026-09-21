import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Search, X, CalendarPlus, ExternalLink } from "lucide-react";
import EventDialog, { EventData } from "@/components/EventDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchPublicEvents } from "@/lib/portal";
import { toEventData } from "@/lib/eventMapping";
import { warnUnmatchedGalleries } from "@/lib/eventGallery";

const CARD_STYLE = {
  background:
    "linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)",
};

const PORTAL_URL = "https://portal.waterlooquantclub.com";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archiveQuery, setArchiveQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Events come from the member portal, so this page and the portal never drift.
  // Photos are the one thing kept in this repo; see src/lib/eventGallery.ts.
  const { data, isPending, isError } = useQuery({
    queryKey: ["portal", "public-events"],
    queryFn: ({ signal }) => fetchPublicEvents(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (data) warnUnmatchedGalleries(data.map((e) => e.slug));
  }, [data]);

  const events: EventData[] = (data ?? [])
    .filter((e) => e.status === "upcoming" || e.status === "live")
    .map(toEventData);

  const archivedEvents: EventData[] = (data ?? [])
    .filter((e) => e.status === "past")
    .map(toEventData);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const normalizeTag = (tag: string) => tag.trim().toUpperCase();

  const TERM_TAG_RE = /^(FALL|WINTER|SPRING|SUMMER)\s*\d{2}$/i;

  const termTags = Array.from(
    new Set(
      archivedEvents.flatMap((e) =>
        (e.tags ?? []).map(normalizeTag).filter((t) => TERM_TAG_RE.test(t)),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const typeTags = Array.from(
    new Set(archivedEvents.map((e) => normalizeTag(e.type))),
  ).sort((a, b) => a.localeCompare(b));

  const typeTagSet = new Set(typeTags);

  const otherTags = Array.from(
    new Set(
      archivedEvents.flatMap((e) =>
        (e.tags ?? [])
          .map(normalizeTag)
          .filter((t) => !TERM_TAG_RE.test(t) && !typeTagSet.has(t)),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const filteredArchivedEvents = archivedEvents.filter((event) => {
    const haystack = [
      event.title,
      event.description,
      event.location,
      event.date,
      event.type,
      ...(event.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = archiveQuery.trim()
      ? haystack.includes(archiveQuery.trim().toLowerCase())
      : true;

    const tagSet = new Set([event.type, ...(event.tags ?? [])].map(normalizeTag));
    const matchesTags =
      selectedTags.length === 0
        ? true
        : selectedTags.every((t) => tagSet.has(normalizeTag(t)));

    return matchesQuery && matchesTags;
  });

  const renderEventCard = (event: EventData, index: number, showLink: boolean) => (
    <div
      key={index}
      onClick={() => handleEventClick(event)}
      className="group p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors cursor-pointer"
      style={CARD_STYLE}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
        <span className="text-xs tracking-widest uppercase text-[#FAFAFA] bg-[#132C7B]/60 px-2 py-1 w-fit">
          {event.type}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">{event.title}</h3>
      <p className="text-muted-foreground text-sm">{event.description}</p>
      {showLink && event.externalLink && (
        <a
          href={event.externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 hover:border-[#FAFAFA]/40 transition"
        >
          <ExternalLink className="w-4 h-4" />
          {event.externalLink.label}
        </a>
      )}
    </div>
  );

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Events
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">
            Upcoming Events
          </h1>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
            <p>
              We hold regular events on campus, including workshops, panels,
              game nights, and competitions. We try to record all of our
              educational events, so if you miss one, check out our{" "}
              <a href="#archive" className="underline" onClick={() => {
                setSelectedTags(["RECORDING"]);
              }}>
                Events Archive
              </a>{" "}
              below!
            </p>
            <p>
              If you're looking to attend our application-based competitions,
              one of the best ways to show interest is to attend and check-in to
              our events! To do so, make sure you have signed up on our{" "}
              <a
                href="https://me.waterlooquantclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                member portal
              </a>
              .
            </p>
          </div>

          <a
            href={
              "https://calendar.google.com/calendar/u/0?cid=MDBmYzFhYzhlODJkY2Q3YTIzMTg4ZWRkNDZjYjg0OTUwYTA5ZjlhYTE0MGJmODZmOWJjNzI1MmFlNGIwNjBlOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={CARD_STYLE}
            className="text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-s hover:text-white border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 cursor-pointer transition"
          >
            <CalendarPlus className="w-4 h-4" />
            Subscribe to WQC's Winter 2026 Events Calendar
          </a>

          {isError && (
            <div
              className="p-6 border border-[#FAFAFA]/20 text-muted-foreground text-sm mb-6"
              style={CARD_STYLE}
            >
              We couldn't load events right now. Try again in a moment, or see
              them on the{" "}
              <a
                href={`${PORTAL_URL}/events`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                member portal
              </a>
              .
            </div>
          )}

          <div className="space-y-6">
            {isPending && (
              <p className="text-muted-foreground text-sm">Loading events…</p>
            )}
            {!isPending && !isError && events.length === 0 && (
              <div
                className="p-6 border border-[#FAFAFA]/20 text-muted-foreground text-sm"
                style={CARD_STYLE}
              >
                No upcoming events right now. Follow us on Instagram or subscribe
                to the calendar above to hear about the next one.
              </div>
            )}
            {events.map((event, index) => renderEventCard(event, index, true))}
          </div>

          <h1
            className="text-4xl md:text-6xl font-light tracking-tight mb-8 mt-16"
            id="archive"
          >
            Events Archive
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={archiveQuery}
                onChange={(e) => setArchiveQuery(e.target.value)}
                placeholder="Search"
                className="pl-9 bg-black/40 border-[#FAFAFA]/20 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
              />
            </div>
            <Select
              key={selectedTags.join("|")}
              onValueChange={(value) => {
                const tag = normalizeTag(value);
                setSelectedTags((prev) =>
                  prev.includes(tag) ? prev : [...prev, tag],
                );
              }}
            >
              <SelectTrigger className="bg-black/40 border-[#FAFAFA]/20 rounded-none focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {termTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Term
                      </SelectLabel>
                      {termTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    {(typeTags.length > 0 || otherTags.length > 0) && (
                      <SelectSeparator />
                    )}
                  </>
                )}

                {typeTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Type
                      </SelectLabel>
                      {typeTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    {otherTags.length > 0 && <SelectSeparator />}
                  </>
                )}

                {otherTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Other
                      </SelectLabel>
                      {otherTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTags((prev) => prev.filter((t) => t !== tag))
                  }
                  className="inline-flex items-center gap-2 border border-[#0DBAFF]/60 text-[#0DBAFF] px-3 py-1 text-xs tracking-widest uppercase hover:border-[#0DBAFF] transition-colors"
                >
                  {tag}
                  <X className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {!isPending && !isError && filteredArchivedEvents.length === 0 && (
              <p className="text-muted-foreground text-sm">
                {archivedEvents.length === 0
                  ? "No past events yet."
                  : "No events match your search."}
              </p>
            )}
            {filteredArchivedEvents.map((event, index) =>
              renderEventCard(event, index, false),
            )}
          </div>
        </div>
      </section>

      <EventDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default Events;
