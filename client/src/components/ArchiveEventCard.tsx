import { ArrowUpRight } from "lucide-react";
import type { EventData } from "@/components/EventDialog";
import { CARD_STYLE } from "@/lib/constants";
import { formatShortEventDate } from "@/lib/eventDates";

interface ArchiveEventCardProps {
  event: EventData;
  startTime: string;
  term: string;
  onOpen: (event: EventData) => void;
}

const ArchiveEventCard = ({ event, startTime, term, onOpen }: ArchiveEventCardProps) => (
  <button
    type="button"
    onClick={() => onOpen(event)}
    aria-label={`Event details: ${event.title}`}
    className="flex h-full min-h-[220px] min-w-0 flex-col border border-[#FAFAFA]/20 p-5 text-left transition-colors hover:border-[#FAFAFA]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:p-6"
    style={CARD_STYLE}
  >
    <span className="flex w-full flex-wrap items-center justify-between gap-2">
      <span className="bg-[#132C7B]/60 px-2 py-1 text-xs tracking-widest uppercase text-foreground">{event.type}</span>
      <time dateTime={startTime} className="text-xs text-muted-foreground">{formatShortEventDate(startTime)}</time>
    </span>
    <span className="mt-4 block text-xl font-medium leading-snug text-foreground">{event.title}</span>
    <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{event.description}</span>
    <span className="mt-4 mb-4 text-xs text-muted-foreground">{term}</span>
    <span className="mt-auto flex w-full items-center justify-between border-t border-[#FAFAFA]/20 pt-4 text-sm text-foreground">
      Event details
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </span>
  </button>
);

export default ArchiveEventCard;
