import JaneStreet from "@/assets/jane-street-white.svg";
import CitadelCombined from "@/assets/citadel-combined-white.svg";
import Hrt from "@/assets/hrt-white.svg";
import Optiver from "@/assets/optiver-white.svg";
import Point72 from "@/assets/point72-white.svg";
import Susquehanna from "@/assets/susquehanna-white.svg";
import Gbe from "@/assets/gbe-white.svg";
import SuitSpade from "@/assets/suit-spade.svg";
import SuitHeart from "@/assets/suit-heart.svg";
import SuitClub from "@/assets/suit-club.svg";
import SuitDiamond from "@/assets/suit-diamond.svg";

interface Sponsor {
  name: string;
  href?: string;
  logo: string;
  width: number;
}

interface Tier {
  name: string;
  color: string;
  suit: string;
  suitWidth: number;
  suitHeight: number;
  sponsors: Sponsor[];
  placeholders?: number;
}

// The design is drawn on a 2x canvas, so every size here is the Figma value
// halved: a 727px column, a 48px heading, logos at their design width over two.
// To add a sponsor, drop a white logo in src/assets and add it to its tier.
const TIERS: Tier[] = [
  {
    name: "Diamond",
    color: "#8CBFFF",
    suit: SuitSpade,
    suitWidth: 39.7,
    suitHeight: 45.6,
    sponsors: [
      { name: "Jane Street", href: "https://www.janestreet.com/", logo: JaneStreet, width: 300 },
      {
        name: "Citadel and Citadel Securities",
        href: "https://www.citadelsecurities.com/",
        logo: CitadelCombined,
        width: 350,
      },
    ],
  },
  {
    name: "Gold",
    color: "#F5BF67",
    suit: SuitHeart,
    suitWidth: 45,
    suitHeight: 42,
    sponsors: [
      { name: "Hudson River Trading", href: "https://www.hudsonrivertrading.com/", logo: Hrt, width: 200 },
      { name: "Optiver", href: "https://www.optiver.com/", logo: Optiver, width: 300 },
      { name: "Point72", href: "https://point72.com/", logo: Point72, width: 300 },
      { name: "Susquehanna", href: "https://sig.com/", logo: Susquehanna, width: 350 },
      { name: "GBE", logo: Gbe, width: 150 },
    ],
  },
  { name: "Silver", color: "#E3E4E4", suit: SuitClub, suitWidth: 43.9, suitHeight: 45.6, sponsors: [], placeholders: 3 },
  { name: "Bronze", color: "#946953", suit: SuitDiamond, suitWidth: 32.8, suitHeight: 45.6, sponsors: [], placeholders: 3 },
];

const TierHeader = ({ tier }: { tier: Tier }) => (
  <div className="flex items-center gap-[18px]">
    <div className="flex w-[45px] shrink-0 justify-center">
      <img src={tier.suit} alt="" aria-hidden style={{ width: tier.suitWidth, height: tier.suitHeight }} />
    </div>
    {/* The negative margin drops the letter-space after the last glyph, so the rule starts one gap after the ink. */}
    <span
      className="mr-[-0.1em] whitespace-nowrap text-[18px] uppercase leading-[22.5px] tracking-[0.1em]"
      style={{ color: tier.color }}
    >
      {tier.name}
    </span>
    <span aria-hidden className="relative h-0 min-w-px flex-1">
      <span className="absolute inset-x-0 bottom-0 h-[2px]" style={{ backgroundColor: tier.color }} />
    </span>
  </div>
);

const LogoCell = ({ sponsor, centered }: { sponsor: Sponsor; centered: boolean }) => {
  const img = (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      style={{ width: sponsor.width }}
      className="h-auto max-w-full transition-opacity duration-300 ease-out group-hover:opacity-80 motion-reduce:transition-none"
    />
  );
  const wrap = `group flex min-w-0 items-center justify-center${centered ? " md:col-span-2" : ""}`;

  return sponsor.href ? (
    <a href={sponsor.href} target="_blank" rel="noopener noreferrer" title={sponsor.name} className={wrap}>
      {img}
    </a>
  ) : (
    <div className={wrap} title={sponsor.name}>
      {img}
    </div>
  );
};

// A fixed, left-aligned box rather than centered text, which is how the design places these.
const Placeholder = () => (
  <span className="block w-[299.5px] max-w-full whitespace-nowrap text-left text-[36.36px] font-bold uppercase leading-[45.5px] tracking-[0.1em] text-white">
    Placeholder
  </span>
);

const TierBoard = ({ tier }: { tier: Tier }) => {
  const total = tier.sponsors.length + (tier.placeholders ?? 0);
  const lastIndex = total - 1;
  const oddTrailing = total % 2 === 1;

  return (
    <div className="flex flex-col gap-[57.5px]">
      <TierHeader tier={tier} />
      <div className="grid grid-cols-1 items-center gap-y-[41.5px] md:grid-cols-2">
        {tier.sponsors.map((sponsor, i) => (
          <LogoCell key={sponsor.name} sponsor={sponsor} centered={oddTrailing && i === lastIndex} />
        ))}
        {Array.from({ length: tier.placeholders ?? 0 }).map((_, j) => {
          const index = tier.sponsors.length + j;
          const centered = oddTrailing && index === lastIndex;
          return (
            <div
              key={`placeholder-${j}`}
              className={`flex items-center justify-center${centered ? " md:col-span-2 md:h-[116.5px]" : ""}`}
            >
              <Placeholder />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SponsorsShowcase = () => (
  <section className="px-6 pb-[188px] pt-[87px]">
    <div className="mx-auto w-full max-w-[727px]">
      <div className="flex flex-col items-start gap-[25px]">
        <p className="text-[18px] uppercase leading-[22.5px] tracking-[0.1em] text-white">Sponsors</p>
        <div aria-hidden className="relative h-0 w-[63px]">
          <div className="absolute inset-x-0 -top-px h-[2px] bg-white" />
        </div>
        <h1
          className="text-[48px] font-normal leading-[60.5px] text-white"
          style={{ fontFamily: '"Merriweather Display", Merriweather, serif' }}
        >
          Our Partners
        </h1>
        <p className="text-[14px] leading-[17.5px] text-white">
          We are grateful to our sponsors for supporting the Waterloo Quant Club and helping us create opportunities for our
          community to explore quantitative finance.
        </p>
      </div>

      <div className="mt-[90px] flex flex-col gap-[57.5px]">
        {TIERS.map((tier) => (
          <TierBoard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="mt-[90px] flex flex-col items-center gap-[5px]">
        <p className="text-center text-[14px] leading-[17.5px] text-white">
          Interested in sponsoring the Waterloo Quant Club?
        </p>
        <a
          href="mailto:sponsors@waterlooquantclub.com"
          className="inline-block h-[18px] border-b border-[#989999] text-[14px] leading-[17.5px] text-[#989999] transition-colors hover:text-white"
        >
          Get in touch with us.
        </a>
      </div>
    </div>
  </section>
);

export default SponsorsShowcase;
