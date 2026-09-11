import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
import OptiverLogo from "@/assets/optiver-logo-transparent.png";
import Point72Logo from "@/assets/point72.png";

interface Sponsor {
  name: string;
  href: string;
  logo: string;
}

const DIAMOND: Sponsor[] = [
  { name: "Jane Street", href: "https://www.janestreet.com/", logo: JaneStreetLogo },
  { name: "Citadel Securities", href: "https://www.citadelsecurities.com/", logo: CitadelLogo },
];

const GOLD: Sponsor[] = [
  { name: "Hudson River Trading", href: "https://www.hudsonrivertrading.com/", logo: HrtLogo },
  { name: "Optiver", href: "https://www.optiver.com/", logo: OptiverLogo },
  { name: "Point72", href: "https://point72.com/", logo: Point72Logo },
];

/**
 * Two treatments, both square-cornered to match the rest of the site:
 *
 *   plaque  off-white cards with a drop shadow, lifting on hover (default)
 *   glass   frosted panes over a pane-sized light plate
 *
 * Most partner marks are dark ink on transparent, so each needs a light backing
 * either way. The variants differ in how that light is presented.
 */
export type SponsorVariant = "plaque" | "glass";

export const SPONSOR_VARIANTS: { id: SponsorVariant; label: string; note: string }[] = [
  { id: "plaque", label: "Plaques", note: "Off-white cards, drop shadow, lift on hover" },
  { id: "glass", label: "Glass", note: "Frosted panes over a pane-sized light plate" },
];

// Most partner marks are dark ink on transparent, so each needs a light backing.
// Two things keep that from reading as white holes punched into the page: the
// tone is pulled off pure white, and each plaque carries a drop shadow, so it
// sits ON the dark surface rather than being cut out of it.
//
// Cells are a fixed height with object-contain rather than a percentage width.
// These marks run from roughly 2:1 to 12:1, and width-driven sizing gave them
// very different optical weight - the wide wordmarks shrank to slivers next to
// the squarer lockups.
const IMG =
  "w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const LogoRow = ({
  sponsors,
  cellClass,
  logoClass,
  variant,
}: {
  sponsors: Sponsor[];
  cellClass: string;
  logoClass: string;
  variant: SponsorVariant;
}) => (
  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${sponsors.length}, minmax(0, 1fr))` }}>
    {sponsors.map((sponsor) => {
      const img = <img src={sponsor.logo} alt={sponsor.name} className={`${IMG} ${logoClass}`} />;

      if (variant === "glass") {
        // The lift lives on the wrapper so the plate travels with the pane.
        // Move the pane alone and it samples a different backdrop mid-hover,
        // which reads as the glass darkening.
        return (
          <div
            key={sponsor.name}
            className={`group relative transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${cellClass}`}
          >
            <div className="sponsor-glass-plate absolute inset-0" aria-hidden="true" />
            <a
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              title={sponsor.name}
              className={`sponsor-glass absolute inset-0 flex items-center justify-center overflow-hidden ${cellClass}`}
            >
              {img}
            </a>
          </div>
        );
      }

      return (
        <a
          key={sponsor.name}
          href={sponsor.href}
          target="_blank"
          rel="noopener noreferrer"
          title={sponsor.name}
          className={`group flex min-w-0 items-center justify-center overflow-hidden bg-[#F7F7F5] shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${cellClass}`}
        >
          {img}
        </a>
      );
    })}
  </div>
);

const SponsorSection = ({
  withCta,
  hideTitle,
  title,
  variant = "plaque",
}: {
  withCta?: boolean;
  hideTitle?: boolean;
  title?: string;
  variant?: SponsorVariant;
}) => {
  return (
    <div className="container mx-auto max-w-3xl">
      {!hideTitle && <h2 className="text-3xl md:text-4xl font-light mb-12">{title || "Our Partners"}</h2>}

      {/* Diamond card */}
      <div className="border p-6 md:p-8 bg-black/70 border-[#0DBAFF]/40">
        <h2 className="text-2xl font-semibold mb-8">Diamond</h2>
        <LogoRow sponsors={DIAMOND} cellClass="h-[92px] px-5" logoClass="max-h-[62px]" variant={variant} />
      </div>

      {/* Gold card */}
      <div className="border p-6 md:p-8 mt-6 bg-black/70 border-[#f7c75e]/40">
        <h2 className="text-2xl font-semibold mb-8">Gold</h2>
        <LogoRow sponsors={GOLD} cellClass="h-[76px] px-4" logoClass="max-h-[48px]" variant={variant} />
      </div>

      {withCta && (
        <div className="mt-16 pt-6">
          <h2 className="text-2xl font-semibold mb-8">Become a Sponsor</h2>
          <p className="text-muted-foreground">
            Interested in sponsoring the Waterloo Quant Club?{" "}
            <a
              href="mailto:sponsors@waterlooquantclub.com"
              className="underline hover:text-foreground transition-colors"
            >
              Get in touch with us
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default SponsorSection;
