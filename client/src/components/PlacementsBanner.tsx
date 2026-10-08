import JaneStreet from "@/assets/jane-street-white.svg";
import Hrt from "@/assets/hrt-white.svg";
import Citadel from "@/assets/citadel-white.svg";
import Optiver from "@/assets/optiver-white.svg";
import Point72 from "@/assets/point72-white.svg";
import Quadrature from "@/assets/quadrature-white.svg";

interface Placement {
  name: string;
  logo?: string;
  height?: number;
}

// Radix doesn't have real logo, so just using text for now
const PLACEMENTS: Placement[] = [
  { name: "Jane Street", logo: JaneStreet, height: 44 },
  { name: "Hudson River Trading", logo: Hrt, height: 38 },
  { name: "Citadel", logo: Citadel, height: 20 },
  { name: "Optiver", logo: Optiver, height: 64 },
  { name: "Point72", logo: Point72, height: 40 },
  { name: "Radix Trading" },
  { name: "Quadrature", logo: Quadrature, height: 24 },
];

const Track = ({ hidden }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden} className={`flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center${hidden ? " motion-reduce:hidden" : ""}`}>
    {PLACEMENTS.map((placement) => (
      <li key={placement.name} className="flex h-16 shrink-0 items-center px-10 md:px-14" title={placement.name}>
        {placement.logo ? (
          <img
            src={placement.logo}
            alt={hidden ? "" : placement.name}
            style={{ height: placement.height }}
            className="w-auto max-w-none"
          />
        ) : (
          <span className="whitespace-nowrap text-[17px] font-semibold uppercase leading-none tracking-[0.2em] text-white">
            {placement.name}
          </span>
        )}
      </li>
    ))}
  </ul>
);

const PlacementsBanner = () => (
  <section className="border-t border-border py-16">
    <p className="mb-10 px-6 text-center text-[18px] uppercase leading-[22.5px] tracking-[0.1em] text-white">
      Member Placements
    </p>
    <div
      className="group overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        <Track />
        <Track hidden />
      </div>
    </div>
  </section>
);

export default PlacementsBanner;
