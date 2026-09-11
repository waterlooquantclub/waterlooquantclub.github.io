import type { CSSProperties } from "react";
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
 * Most partner marks are dark ink on transparent, so light has to sit behind
 * them somewhere - that constraint is fixed and every variant below is just a
 * different answer to where it goes.
 *
 *  plaque  rounded off-white cards that lift on hover; light reads as an object
 *  bloom   the same plaques, bleeding a soft halo instead of a hard edge
 *  lit     plaques rimmed and glowing in the tier colour
 *  glass   frosted panes over a pane-sized light plate
 *  flat    square white cells, no shadow - closest to the site's own language
 */
export type SponsorVariant = "plaque" | "bloom" | "lit" | "glass" | "flat";

export const SPONSOR_VARIANTS: { id: SponsorVariant; label: string; note: string }[] = [
  { id: "plaque", label: "Plaques", note: "Off-white rounded cards, shadow, lift on hover" },
  { id: "bloom", label: "Bloom", note: "Plaques that bleed a soft halo instead of a hard edge" },
  { id: "lit", label: "Lit", note: "Plaques rimmed and glowing in the tier colour - cyan, then gold" },
  { id: "glass", label: "Glass", note: "Same layout as Plaques, frosted panes instead of solid" },
  { id: "flat", label: "Flat cells", note: "Square white cells, hairline, no shadow" },
];

const CELL: Record<
  SponsorVariant,
  { wrap: string; d: string; g: string; dImg: string; gImg: string; plate?: boolean }
> = {
  plaque: {
    wrap: "group flex min-w-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7F7F5] shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    d: "h-[92px] px-5",
    g: "h-[76px] px-4",
    dImg: "max-h-[62px]",
    gImg: "max-h-[48px]",
  },
  bloom: {
    wrap: "sponsor-bloom group flex min-w-0 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    d: "h-[92px] px-5",
    g: "h-[76px] px-4",
    dImg: "max-h-[62px]",
    gImg: "max-h-[48px]",
  },
  lit: {
    wrap: "sponsor-lit group flex min-w-0 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    d: "h-[92px] px-5",
    g: "h-[76px] px-4",
    dImg: "max-h-[62px]",
    gImg: "max-h-[48px]",
  },
  glass: {
    plate: true,
    wrap: "sponsor-glass flex min-w-0 items-center justify-center overflow-hidden rounded-xl",
    d: "h-[92px] px-5",
    g: "h-[76px] px-4",
    dImg: "max-h-[62px]",
    gImg: "max-h-[48px]",
  },
  flat: {
    wrap: "group flex min-w-0 items-center justify-center overflow-hidden bg-white transition-opacity duration-300 hover:opacity-85",
    d: "h-[92px] px-5",
    g: "h-[76px] px-4",
    dImg: "max-h-[62px]",
    gImg: "max-h-[48px]",
  },
};

const LogoCells = ({
  sponsors,
  variant,
  tier,
}: {
  sponsors: Sponsor[];
  variant: SponsorVariant;
  tier: "d" | "g";
}) => {
  const c = CELL[variant];
  return (
    <div
      className="grid gap-4"
      style={
        {
          gridTemplateColumns: `repeat(${sponsors.length}, minmax(0, 1fr))`,
          "--tier-rgb": tier === "d" ? "13 186 255" : "247 199 94",
        } as CSSProperties
      }
    >
      {sponsors.map((sponsor) => {
        const img = (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={`w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              tier === "d" ? c.dImg : c.gImg
            }`}
          />
        );
        const link = (
          <a
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            title={sponsor.name}
            className={`${c.wrap} ${tier === "d" ? c.d : c.g} ${c.plate ? "absolute inset-0" : ""}`}
          >
            {img}
          </a>
        );
        return c.plate ? (
          <div
            key={sponsor.name}
            className={`group relative transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              tier === "d" ? c.d : c.g
            }`}
          >
            <div className="sponsor-glass-plate absolute inset-0 rounded-xl" aria-hidden="true" />
            {link}
          </div>
        ) : (
          <div key={sponsor.name} className="contents">
            {link}
          </div>
        );
      })}
    </div>
  );
};

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

      <div className="border p-6 md:p-8 bg-black/70 border-[#0DBAFF]/40">
        <h2 className="text-2xl font-semibold mb-8">Diamond</h2>
        <LogoCells sponsors={DIAMOND} variant={variant} tier="d" />
      </div>
      <div className="border p-6 md:p-8 mt-6 bg-black/70 border-[#f7c75e]/40">
        <h2 className="text-2xl font-semibold mb-8">Gold</h2>
        <LogoCells sponsors={GOLD} variant={variant} tier="g" />
      </div>

      {withCta && (
        <div className="mt-16 pt-6">
          <h2 className="text-2xl font-semibold mb-8">Become a Sponsor</h2>
          <p className="text-muted-foreground">
            Interested in sponsoring the Waterloo Quant Club?{" "}
            <a href="mailto:sponsors@waterlooquantclub.com" className="underline hover:text-foreground transition-colors">
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
