import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import {
  Calendar,
  MapPin,
  Search,
  X,
  CalendarPlus,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import EventDialog, { EventData } from "@/components/EventDialog";
import CompetitionCatalogue from "@/components/CompetitionCatalogue";
import ArchiveEventCard from "@/components/ArchiveEventCard";
import { termParts } from "@/lib/eventDates";
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
import { fetchPublicEvents, type PublicEvent } from "@/lib/portal";
import { toEventData } from "@/lib/eventMapping";
import { warnUnmatchedGalleries } from "@/lib/eventGallery";
import { competitionContentFor } from "@/lib/competitions";
import { CARD_STYLE } from "@/lib/constants";

const PORTAL_URL = "https://portal.waterlooquantclub.com";
const SHELL = "mx-auto max-w-6xl";
const ARCHIVE_PAGE_SIZE = 10;

// Flagship trading competitions get their own section; everything else is an event.
const isCompetition = (event: PublicEvent) =>
  event.event_type?.trim().toUpperCase() === "COMPETITION";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archiveQuery, setArchiveQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);
  const [archiveLimit, setArchiveLimit] = useState(ARCHIVE_PAGE_SIZE);
  const [archiveOrder, setArchiveOrder] = useState("newest");

  useEffect(() => {
    setArchiveLimit(ARCHIVE_PAGE_SIZE);
  }, [archiveQuery, selectedTags, archiveOrder]);

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

  // Newest first, so the next or most recent edition opens by default.
  const competitions = useMemo(
    () =>
      (data ?? [])
        .filter(isCompetition)
        .slice()
        .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()),
    [data],
  );

  const activeCompetition =
    competitions.find((e) => e.id === selectedCompetitionId) ?? competitions[0] ?? null;
  const activeFaq = competitionContentFor(activeCompetition?.slug)?.faq;

  const events: EventData[] = (data ?? [])
    .filter((e) => e.status === "upcoming" || e.status === "live")
    .filter((e) => !isCompetition(e))
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .map(toEventData);

  const archivedEvents = (data ?? [])
    .filter((e) => e.status === "past")
    .filter((e) => !isCompetition(e))
    .sort((a, b) => {
      const difference = new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
      return archiveOrder === "oldest" ? -difference : difference;
    })
    .map((event) => {
      const term = termParts(event.start_time);
      return {
        ...toEventData(event),
        id: event.id,
        startTime: event.start_time,
        term: term ? `${term.season} ${term.year}` : "Other events",
      };
    });

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

  const visibleArchive = filteredArchivedEvents.slice(0, archiveLimit);
  const archiveGroups = Array.from(new Set(visibleArchive.map((event) => event.term)))
    .map((term) => ({ term, events: visibleArchive.filter((event) => event.term === term) }));

  if (isPending || isError) {
    return (
      <Layout>
        <section className="px-6 py-12">
          <div className={SHELL}>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">Events</h1>
            <p role={isError ? "alert" : "status"} className="mt-4 text-sm text-muted-foreground">
              {isError ? "Couldn't load content, please try again." : "Loading events…"}
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  const renderUpcomingEvent = (event: EventData, index: number) => (
    <div
      key={index}
      onClick={() => handleEventClick(event)}
      className="p-5 sm:p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors cursor-pointer"
      style={CARD_STYLE}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
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
      {event.externalLink && (
        <a
          href={event.externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 hover:border-[#FAFAFA]/40 transition"
        >
          <ExternalLink className="w-4 h-4" />
          {event.externalLink.label}
        </a>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Trading competitions */}
      <section className="pt-12 px-6">
        <div className={SHELL}>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Events
          </h1>
          <nav aria-label="On this page" className="mt-4 mb-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#competitions" className="underline underline-offset-4 hover:text-foreground">Competitions</a>
            <a href="#upcoming" className="underline underline-offset-4 hover:text-foreground">Upcoming</a>
            <a href="#archive" className="underline underline-offset-4 hover:text-foreground">Archive</a>
          </nav>
          {competitions.length === 0 && (
            <h2 id="competitions" className="mb-2 scroll-mt-28 text-2xl md:text-3xl font-light tracking-tight">
              Trading Competitions
            </h2>
          )}

          {competitions.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No competitions to show right now. See everything on the{" "}
              <a
                href={`${PORTAL_URL}/events`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                member portal
              </a>
              .
            </p>
          )}

          {competitions.length > 0 && (
            <CompetitionCatalogue
              competitions={competitions}
              selectedId={activeCompetition?.id ?? null}
              onSelect={setSelectedCompetitionId}
              onOpenEvent={(event) => handleEventClick({
                ...toEventData(event),
                competitionContent: competitionContentFor(event.slug),
              })}
              faqHref={activeFaq?.length ? "#competition-faq" : undefined}
            />
          )}
        </div>
      </section>

      {/* Upcoming events */}
      <section id="upcoming" className="pt-12 pb-12 px-6 scroll-mt-24">
        <div className={SHELL}>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
            Upcoming Events
          </h2>
          <div className="space-y-4 max-w-3xl text-muted-foreground text-sm leading-relaxed mb-4">
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
            className="text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-s hover:text-white border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 cursor-pointer transition"
          >
            <CalendarPlus className="w-4 h-4" />
            Subscribe to WQC's Events Calendar
          </a>

          <div className="grid grid-cols-1 gap-4" aria-label="Upcoming events">
            {events.length === 0 && (
              <div
                className="p-6 border border-[#FAFAFA]/20 text-muted-foreground text-sm"
                style={CARD_STYLE}
              >
                No upcoming events right now. Follow us on Instagram or subscribe
                to the calendar above to hear about the next one.
              </div>
            )}
            {events.map(renderUpcomingEvent)}
          </div>

          <h2
            className="text-2xl md:text-3xl font-light tracking-tight mb-6 mt-12 scroll-mt-28"
            id="archive"
          >
            Events Archive
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={archiveQuery}
                onChange={(e) => setArchiveQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search archived events"
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
              <SelectTrigger aria-label="Filter archived events" className="bg-black/40 border-[#FAFAFA]/20 rounded-none focus:ring-0 focus:ring-offset-0 focus:outline-none">
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
            <div className="flex flex-wrap gap-3 mb-4">
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

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <p aria-live="polite">Showing {visibleArchive.length} of {filteredArchivedEvents.length} events</p>
            <Select value={archiveOrder} onValueChange={setArchiveOrder}>
              <SelectTrigger aria-label="Sort archived events" className="h-auto w-auto gap-2 rounded-none border-0 bg-transparent p-0 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            {filteredArchivedEvents.length === 0 && (
              <p className="text-muted-foreground text-sm">
                {archivedEvents.length === 0
                  ? "No past events yet."
                  : "No events match your search."}
              </p>
            )}
            {archiveGroups.map((group) => (
              <section key={group.term} aria-label={group.term}>
                <h3 className="mb-4 flex items-center gap-4 text-base font-medium text-foreground">
                  {group.term}<span className="h-px flex-1 bg-border" aria-hidden="true" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.events.map((event) => (
                    <ArchiveEventCard key={event.id} event={event} startTime={event.startTime} term={event.term} onOpen={handleEventClick} />
                  ))}
                </div>
              </section>
            ))}
          </div>
          {visibleArchive.length < filteredArchivedEvents.length && (
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={() => setArchiveLimit((limit) => limit + ARCHIVE_PAGE_SIZE)} className="py-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                Load more events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Competition FAQ */}
      {activeFaq?.length ? (
        <section id="competition-faq" className="pb-24 px-6 scroll-mt-24">
          <div className={SHELL}>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
              Competition FAQ
            </h2>
            <div
              className="border border-[#FAFAFA]/20 p-5 sm:p-6"
              style={CARD_STYLE}
            >
              {activeFaq.map((entry, index) => (
                <details
                  key={entry.question}
                  open={index === 0}
                  className={`group py-5 first:pt-0 last:pb-0 ${index > 0 ? "border-t border-border" : ""}`}
                >
                  <summary className="flex justify-between gap-4 cursor-pointer list-none font-medium text-[17px] leading-snug [&::-webkit-details-marker]:hidden">
                    {entry.question}
                    <ChevronDown className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7] whitespace-pre-line max-w-[900px]">
                    {entry.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <EventDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default Events;
