import { Calendar, MapPin, HelpCircle, Image as ImageIcon, FileText, ExternalLink } from "lucide-react";
import { CARD_STYLE } from "@/lib/constants";
import { formatEventDate, termParts } from "@/lib/eventDates";
import { galleryFor } from "@/lib/eventGallery";
import { competitionContentFor } from "@/lib/competitions";
import type { PublicEvent } from "@/lib/portal";

interface CompetitionCatalogueProps {
  competitions: PublicEvent[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onOpenGallery: (event: PublicEvent) => void;
  faqHref?: string;
}

const BOX = "border border-[#FAFAFA]/20 p-6 md:p-8";
const LABEL = "block text-[11px] tracking-[0.14em] uppercase text-muted-foreground";
const PILL =
  "inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 hover:border-[#FAFAFA]/40 transition-colors";
const CARD_PILL =
  "inline-flex items-center gap-2 rounded-full border border-[#FAFAFA]/20 px-3 py-1.5 text-muted-foreground hover:text-white hover:border-[#FAFAFA]/50 cursor-pointer transition";

/** Term selector: one box per edition, newest first. */
const TermRail = ({
  competitions,
  selectedId,
  onSelect,
}: Pick<CompetitionCatalogueProps, "competitions" | "selectedId" | "onSelect">) => (
  <div
    role="tablist"
    aria-label="Trading competitions"
    className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {competitions.map((event) => {
      const term = termParts(event.start_time);
      const active = event.id === selectedId;
      return (
        <button
          key={event.id}
          role="tab"
          aria-selected={active}
          onClick={() => onSelect(event.id)}
          style={CARD_STYLE}
          className={`shrink-0 min-w-[168px] text-left px-5 py-4 border transition-colors ${
            active
              ? "border-[#FAFAFA]/50 text-foreground"
              : "border-[#FAFAFA]/20 text-muted-foreground hover:border-[#FAFAFA]/50"
          }`}
        >
          <span className="block text-[11px] tracking-[0.16em] uppercase">
            {term?.season ?? "Competition"}
          </span>
          <span
            className={`block text-[26px] font-light tracking-tight leading-tight tabular-nums text-foreground transition-opacity ${
              active ? "opacity-100" : "opacity-60"
            }`}
          >
            {term?.year ?? event.title}
          </span>
        </button>
      );
    })}
  </div>
);

/** Sponsor logos, spread across their box. */
const SponsorGrid = ({ sponsors }: { sponsors: NonNullable<ReturnType<typeof competitionContentFor>>["sponsors"] }) => (
  <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-5 place-items-center">
    {sponsors?.map((sponsor) => (
      <img
        key={sponsor.name}
        src={sponsor.src}
        alt={sponsor.name}
        style={{
          height: sponsor.height ? `${sponsor.height}px` : undefined,
          width: sponsor.height ? "auto" : "96%",
          filter: sponsor.invert ? "brightness(0) invert(1)" : undefined,
        }}
        className={`max-w-full opacity-95 ${sponsor.wide ? "col-span-2" : ""}`}
      />
    ))}
  </div>
);

/** Everything shown for the selected competition. */
const Dossier = ({
  event,
  onOpenGallery,
  faqHref,
}: {
  event: PublicEvent;
  onOpenGallery: (event: PublicEvent) => void;
  faqHref?: string;
}) => {
  const content = competitionContentFor(event.slug);
  const photos = galleryFor(event.slug);
  const pdf = event.links.find((link) => link.kind === "pdf");
  const hasAside = Boolean(content?.headline || content?.sponsors?.length);

  return (
    <div className="mt-12">
      <div className="max-w-[680px]">
        <span className="inline-block text-xs tracking-widest uppercase text-foreground bg-[#132C7B]/60 px-2 py-1">
          {event.event_type ?? "Competition"}
        </span>
        <h3 className="text-[clamp(28px,3.4vw,42px)] font-light leading-[1.1] tracking-tight mt-2">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground text-sm mt-3">
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
          <p className="text-muted-foreground leading-relaxed mt-5">{event.description}</p>
        )}
        {faqHref && content?.faq?.length ? (
          <a href={faqHref} style={CARD_STYLE} className={`${CARD_PILL} mt-5`}>
            <HelpCircle className="w-4 h-4" />
            Competition FAQ
          </a>
        ) : null}
      </div>

      {(content?.about?.length || hasAside) && (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-5 items-stretch mt-8">
          {content?.about?.length ? (
            <div className="flex flex-col gap-5">
              <div style={CARD_STYLE} className={`${BOX} flex-1`}>
                <span className={LABEL}>About</span>
                <div className="mt-5 space-y-5">
                  {content.about.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="text-muted-foreground text-[17px] leading-[1.7]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {hasAside && (
            <aside className="flex flex-col gap-5">
              {content?.headline && (
                <div style={CARD_STYLE} className={BOX}>
                  <b className="block text-[40px] font-light tracking-tight leading-none tabular-nums">
                    {content.headline.value}
                  </b>
                  <span className={`${LABEL} mt-2`}>{content.headline.label}</span>
                </div>
              )}
              {content?.sponsors?.length ? (
                <div style={CARD_STYLE} className={`${BOX} flex-1 flex flex-col`}>
                  <span className={`${LABEL} mb-5`}>Sponsors</span>
                  <SponsorGrid sponsors={content.sponsors} />
                </div>
              ) : null}
            </aside>
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div style={CARD_STYLE} className={`${BOX} mt-5`}>
          <span className={`${LABEL} mb-5`}>Gallery</span>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[110px] md:auto-rows-[126px] gap-2.5">
            {photos.slice(0, 5).map((photo, index) => (
              <div key={photo.src} className={`overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={() => onOpenGallery(event)} className={PILL}>
              <ImageIcon className="w-4 h-4" />
              All photos
            </button>
            {pdf && (
              <a href={pdf.url} target="_blank" rel="noopener noreferrer" className={PILL}>
                <FileText className="w-4 h-4" />
                {pdf.label ?? "View Event Details"}
              </a>
            )}
            {event.registration_url && (
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className={PILL}>
                <ExternalLink className="w-4 h-4" />
                RSVP
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CompetitionCatalogue = ({
  competitions,
  selectedId,
  onSelect,
  onOpenGallery,
  faqHref,
}: CompetitionCatalogueProps) => {
  const selected = competitions.find((event) => event.id === selectedId) ?? competitions[0];
  if (!selected) return null;

  return (
    <>
      <TermRail competitions={competitions} selectedId={selected.id} onSelect={onSelect} />
      <Dossier event={selected} onOpenGallery={onOpenGallery} faqHref={faqHref} />
    </>
  );
};

export default CompetitionCatalogue;
