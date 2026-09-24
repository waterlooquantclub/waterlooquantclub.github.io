/**
 * Long-form content for trading competitions, keyed by the event's slug in the
 * member portal.
 *
 * The portal stays the source of truth for dates, location, description and
 * links; this file only holds the writing that has nowhere to live there.
 * A competition with no entry here still renders — it just shows what the
 * portal provides plus whatever photos sit in `src/assets/events/<slug>/`.
 */
import citadelLogo from "@/assets/citadel-logo.png";
import hrtLogo from "@/assets/hrt-logo.png";
import janeStreetLogo from "@/assets/jane-street-logo.png";
import polymarketLogo from "@/assets/polymarket-logo-white.png";

export interface CompetitionSponsor {
  name: string;
  src: string;
  /** Height in px; the logos have very different aspect ratios. */
  height?: number;
  /** Dark-ink marks need inverting to read on black. */
  invert?: boolean;
  /** Wide lockups take the full width of the sponsor grid. */
  wide?: boolean;
}

export interface CompetitionFaqEntry {
  question: string;
  answer: string;
}

export interface CompetitionContent {
  about?: string[];
  headline?: { value: string; label: string };
  sponsors?: CompetitionSponsor[];
  faq?: CompetitionFaqEntry[];
}

const CONTENT: Record<string, CompetitionContent> = {
  "w26-trading-competition": {
    about: [
      "The Waterloo Trading Competition brings together university students from across Canada and the United States to compete in a fast-paced, simulated trading environment. Hosted by the Waterloo Quant Club, the competition is designed to test quantitative intuition, risk management, and real-time decision-making.",
      "No prior trading experience is required. The event is accessible to students from a wide range of academic backgrounds, while still offering meaningful challenges for experienced participants.",
    ],
    headline: {
      value: "$10,000+",
      label: "Prize pool (CAD)",
    },
    sponsors: [
      { name: "Hudson River Trading", src: hrtLogo, height: 40 },
      { name: "Jane Street", src: janeStreetLogo, height: 42, invert: true },
      { name: "Citadel and Citadel Securities", src: citadelLogo, invert: true, wide: true },
      { name: "Polymarket", src: polymarketLogo, height: 26, wide: true },
    ],
    faq: [
      {
        question: "What is a trading competition? What is it that is being traded?",
        answer:
          "Think of it as a high-stakes strategy tournament. Rather than trading actual stocks, you will participate in a series of “trading games” that simulate the core logic of quantitative trading.\nFor example, imagine a game where every participant receives a card, and the “price” of a contract is the sum of all cards across all participants. You only know your own card, so you have to infer what others are holding based on how they are buying or selling. If you think the total sum is 50, but the market is trading at 40, you “buy.” However, you have to be strategic: if you buy too aggressively, others might realize you have a high card, and the price will move against you before you can finish your trade.",
      },
      {
        question: "Do I need prior experience to participate?",
        answer:
          "Not at all! You especially don’t need a background in finance. Instead, a passion for problem-solving and a “trader’s mindset” (quick decision-making and risk assessment) are essential. A strong foundation in probability, mental math, and game theory will give you a significant edge.",
      },
      {
        question: "Will this be online or in-person?",
        answer:
          "The competition is a strictly in-person event hosted on the University of Waterloo campus in Waterloo, Ontario, Canada. Some trading games will be played on a digital competition platform.",
      },
      {
        question: "Are food, travel, and accommodation provided?",
        answer:
          "Food will be provided throughout the event, with options for most dietary restrictions. Travel and accommodation are subsidized up to a maximum amount based on where you are coming from. To receive reimbursement, you must participate in the full schedule and provide receipts post-event.",
      },
      {
        question: "Are there teams, or is it individual?",
        answer:
          "Overall rankings will be individual. However, some games will be team-based, where you will be randomly assigned a team. For these games, the overall contribution to your ranking will be based on your team's performance. Teams may change across games.",
      },
      {
        question: "What is the format and duration of the event?",
        answer:
          "This is a full-day, high-intensity event. More information will be available soon, but you can expect 5–6 distinct trading games throughout the day.",
      },
      {
        question: "What are the prizes? How are winners determined?",
        answer:
          "We offer a guaranteed prize pool of at least $10,000 CAD. Overall rankings will be computed by combining your performances across all trading games. There will also be prizes for winning each individual game. All prizes will be paid in cash, with the option to receive the equivalent in CAD or USD.",
      },
      {
        question: "Who is eligible to participate?",
        answer:
          "All current university students are allowed to participate. Although we welcome students from all countries, our travel subsidy policies are designed to accommodate those in Canada and the United States. Also, since the competition will be taking place in-person in Canada, prospective participants should be wary of Canadian entry and visa requirements.",
      },
    ],
  },
};

export function competitionContentFor(slug: string | null | undefined): CompetitionContent | undefined {
  if (!slug) return undefined;
  return CONTENT[slug];
}
