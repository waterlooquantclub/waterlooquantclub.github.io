import { Calendar, MapPin, HelpCircle, ArrowUpRight } from "lucide-react";
import { CARD_STYLE } from "@/lib/constants";
import { formatEventDate, termParts } from "@/lib/eventDates";
import { competitionContentFor } from "@/lib/competitions";
import type { PublicEvent } from "@/lib/portal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompetitionCatalogueProps {
  competitions: PublicEvent[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onOpenEvent: (event: PublicEvent) => void;
  faqHref?: string;
}

const EditionSelector = ({
  competitions,
  selectedId,
  onSelect,
}: Pick<CompetitionCatalogueProps, "competitions" | "selectedId" | "onSelect">) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div className="flex flex-col xl:flex-row xl:items-baseline gap-2 xl:gap-4">
      <h2 id="competitions" className="scroll-mt-28 text-2xl md:text-3xl font-light tracking-tight">
        Trading Competitions
      </h2>
      <p className="text-sm text-muted-foreground">Explore our trading competitions!</p>
    </div>
    <div className="flex items-center gap-3 min-w-0">
      <label htmlFor="competition-edition" className="text-sm text-muted-foreground">Select:</label>
      <Select value={selectedId == null ? undefined : String(selectedId)} onValueChange={(value) => onSelect(Number(value))}>
        <SelectTrigger id="competition-edition" aria-label="Browse competition editions" className="w-44 rounded-none border-[#FAFAFA]/20 bg-black/40 text-left">
          <SelectValue placeholder="Browse editions" />
        </SelectTrigger>
        <SelectContent className="rounded-none max-h-80">
          {competitions.map((event) => {
            const term = termParts(event.start_time);
            return (
              <SelectItem key={event.id} value={String(event.id)}>
                {term ? `${term.season} ${term.year}` : event.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  </div>
);

const FeaturedCompetition = ({
  event,
  onOpenEvent,
  faqHref,
}: {
  event: PublicEvent;
  onOpenEvent: (event: PublicEvent) => void;
  faqHref?: string;
}) => {
  const content = competitionContentFor(event.slug);

  return (
    <div className="mt-6 border border-[#FAFAFA]/20 p-5 sm:p-6" style={CARD_STYLE}>
      <div className="min-w-0">
        <span className="inline-block text-xs tracking-widest uppercase text-foreground bg-[#132C7B]/60 px-2 py-1">
          {event.event_type ?? "Competition"}
        </span>
        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h3 className="max-w-[760px] text-2xl md:text-4xl font-medium leading-tight tracking-tight">
            {event.title}
          </h3>
          {content?.headline && (
            <div className="flex shrink-0 flex-col gap-1 sm:items-end">
              <span className="text-4xl font-light leading-tight tracking-tight text-foreground">{content.headline.value}</span>
              <span className="text-xs text-muted-foreground">{content.headline.label}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground text-sm mt-2">
          <span className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatEventDate(event.start_time, event.end_time)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </span>
          )}
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">{event.description}</p>
        )}
        {faqHref && content?.faq?.length ? (
          <a href={faqHref} className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            <HelpCircle className="w-4 h-4" />
            Competition FAQ
          </a>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onOpenEvent(event)}
        className="mt-6 flex w-full items-center justify-between border-t border-[#FAFAFA]/20 pt-4 text-left text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Explore details
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

const CompetitionCatalogue = ({
  competitions,
  selectedId,
  onSelect,
  onOpenEvent,
  faqHref,
}: CompetitionCatalogueProps) => {
  const selected = competitions.find((event) => event.id === selectedId) ?? competitions[0];
  if (!selected) return null;

  return (
    <>
      <EditionSelector competitions={competitions} selectedId={selected.id} onSelect={onSelect} />
      <FeaturedCompetition event={selected} onOpenEvent={onOpenEvent} faqHref={faqHref} />
    </>
  );
};

export default CompetitionCatalogue;
