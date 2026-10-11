import { Calendar, ArrowUpRight } from "lucide-react";
import { applicationsAreOpen, competitionDetailsFor } from "@/lib/competitionDetails";
import { formatApplicationDeadline } from "@/lib/eventDates";
import type { PublicEvent } from "@/lib/portal";

export default function CompetitionApplication({ event }: { event: PublicEvent }) {
  const { applicationDeadline } = competitionDetailsFor(event);
  const label = formatApplicationDeadline(applicationDeadline);
  const open = applicationsAreOpen(event);
  if (!event.application_only || event.status !== "upcoming") return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
      {open && event.application_url ? (
        <a href={event.application_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-muted-foreground transition-colors">
          Apply <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : <span className="text-sm font-medium">Applications closed</span>}
      {label && (
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          <time dateTime={applicationDeadline!}>{open ? "Apply by" : "Deadline:"} {label}</time>
        </span>
      )}
    </div>
  );
}
