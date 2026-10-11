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

export interface Sponsor {
  id: string;
  name: string;
  href?: string;
  logo: string;
  width: number;
}

export interface Tier {
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
export const SPONSOR_TIERS: Tier[] = [
  {
    name: "Diamond",
    color: "#8CBFFF",
    suit: SuitSpade,
    suitWidth: 39.7,
    suitHeight: 45.6,
    sponsors: [
      { id: "jane", name: "Jane Street", href: "https://www.janestreet.com/", logo: JaneStreet, width: 300 },
      {
        id: "citadel", name: "Citadel and Citadel Securities",
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
      { id: "hrt", name: "Hudson River Trading", href: "https://www.hudsonrivertrading.com/", logo: Hrt, width: 160 },
      { id: "optiver", name: "Optiver", href: "https://www.optiver.com/", logo: Optiver, width: 240 },
      { id: "point", name: "Point72", href: "https://point72.com/", logo: Point72, width: 240 },
      { id: "susquehanna", name: "Susquehanna", href: "https://sig.com/", logo: Susquehanna, width: 280 },
      { id: "gbe", name: "GBE Energy", href: "https://www.gbe.energy/", logo: Gbe, width: 120 },
    ],
  },
  // { name: "Silver", color: "#E3E4E4", suit: SuitClub, suitWidth: 43.9, suitHeight: 45.6, sponsors: [], placeholders: 3 },
  // { name: "Bronze", color: "#946953", suit: SuitDiamond, suitWidth: 32.8, suitHeight: 45.6, sponsors: [], placeholders: 3 },
];

