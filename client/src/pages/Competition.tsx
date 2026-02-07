import Layout from "@/components/Layout";
import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
import PolymarketLogo from "@/assets/polymarket-logo-white.png";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Trophy,
  GraduationCap,
  Plane,
  Clock4,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const applicationLink = "https://me.waterlooquantclub.com/forms/2026-waterloo-trading-competition-application/";

const detailCards = [
  {
    title: "Prize Pool",
    value: "$10,000+ in cash prizes",
    description: "Cash prizes for top-performing teams.",
    Icon: Trophy,
  },
  {
    title: "Eligibility",
    value: "Canada & U.S. university students",
    description: "Open to university students in Canada & the U.S.",
    Icon: GraduationCap,
  },
  {
    title: "Location",
    value: "University of Waterloo (in-person)",
    description:
      "Hosted in-person at the University of Waterloo campus. Travel subsidies provided for off-campus participants.",
    Icon: MapPin,
  },
  {
    title: "Apply By",
    value: "February 15, 2026 · 11:59 PM ET",
    description: "Apply through the application portal by February 15, 2026 at 11:59 PM ET.",
    Icon: Clock4,
  },
];

const FAQ = [
  {
    q: "What is a trading competition? What is it that is being traded?",
    a: "Think of it as a high-stakes strategy tournament. Rather than trading actual stocks, you will participate in a series of “trading games” that simulate the core logic of quantitative trading.\nFor example, imagine a game where every participant receives a card, and the “price” of a contract is the sum of all cards across all participants. You only know your own card, so you have to infer what others are holding based on how they are buying or selling. If you think the total sum is 50, but the market is trading at 40, you “buy.” However, you have to be strategic: if you buy too aggressively, others might realize you have a high card, and the price will move against you before you can finish your trade.",
  },
  {
    q: "Do I need prior experience to participate?",
    a: "Not at all! You especially don’t need a background in finance. Instead, a passion for problem-solving and a “trader’s mindset” (quick decision-making and risk assessment) are essential. A strong foundation in probability, mental math, and game theory will give you a significant edge.",
  },
  {
    q: "Will this be online or in-person?",
    a: "The competition is a strictly in-person event hosted on the University of Waterloo campus in Waterloo, Ontario, Canada. Some trading games will be played on a digital competition platform.",
  },
  {
    q: "Are food, travel, and accommodation provided?",
    a: "Food will be provided throughout the event, with options for most dietary restrictions. Travel and accommodation are subsidized up to a maximum amount based on where you are coming from. To receive reimbursement, you must participate in the full schedule and provide receipts post-event.",
  },
  {
    q: "Are there teams, or is it individual?",
    a: "Overall rankings will be individual. However, some games will be team-based, where you will be randomly assigned a team. For these games, the overall contribution to your ranking will be based on your team’s performance. Teams may change across games.",
  },
  {
    q: "What is the format and duration of the event?",
    a: "This is a full-day, high-intensity event. More information will be available soon, but you can expect 5–6 distinct trading games throughout the day.",
  },
  {
    q: "What are the prizes? How are winners determined?",
    a: "We offer a guaranteed prize pool of at least $10,000 CAD. Overall rankings will be computed by combining your performances across all trading games. There will also be prizes for winning each individual game. All prizes will be paid in cash, with the option to receive the equivalent in CAD or USD.",
  },
  {
    q: "Who is eligible to participate? ",
    a: "All current university students are allowed to participate. Although we welcome students from all countries, our travel subsidy policies are designed to accommodate those in Canada and the United States. Also, since the competition will be taking place in-person in Canada, prospective participants should be wary of Canadian entry and visa requirements.",
  },
];

const Competition = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-80" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-[#0b1224] to-[#04060b]" />
          <div className="absolute -left-40 top-10 w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(26,64,170,0.22)_0%,_rgba(5,7,12,0)_65%)] blur-2xl" />
          <div className="absolute right-[-18rem] top-1/4 w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(9,126,227,0.18)_0%,_rgba(5,7,12,0)_70%)] blur-2xl" />
        </div>

        <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">Competition</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight">
                2026 Waterloo
                <br />
                Trading Competition
              </h1>
            </div>

            <p className="text-muted-foreground text-lg max-w-3xl">
              Canada’s first international university trading competition.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm md:text-base">
              <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                <Calendar className="w-4 h-4" />
                March 22, 2026
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                <Plane className="w-4 h-4" />
                University of Waterloo (in-person)
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
                href={applicationLink}
                target="_blank"
                rel="noreferrer"
              >
                Apply via Application Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            {detailCards.map(({ title, value, description, Icon }) => (
              <div
                key={title}
                className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(9,45,133,0.35)] hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground">{title}</p>
                    <h3 className="text-xl font-semibold text-white">{value}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 px-6">
        <div className="container mx-auto max-w-4xl space-y-6 relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold">About the Competition</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              The 2026 Waterloo Trading Competition brings together university students from across Canada and the United States to compete in a fast-paced, simulated trading environment. Hosted by the Waterloo Quant Club, the competition will be held in-person on the University of Waterloo campus and is designed to test quantitative intuition, risk management, and real-time decision-making.
            </p>
            <p>
              The competition takes place on March 22, 2026, with optional pre-competition events on March 21. No prior trading experience is required. The event is accessible to students from a wide range of academic backgrounds, while still offering meaningful challenges for experienced participants.
            </p>
            <p>
              Top performers will compete for a cash prize pool, and travel subsidies will be provided for accepted participants traveling from outside the Waterloo region. Applications are open to all university students and close on February 15, 2026.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          <div className="border border-white/10 bg-white/5 rounded-xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(7,103,203,0.35)]">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Applications</p>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Apply now through the Application Portal</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For any issues, contact us by{" "}
                <a href={SOCIAL_LINKS.EMAIL} className="underline">email</a> or on{" "}
                <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="underline">Discord</a>.
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
              href={applicationLink}
              target="_blank"
              rel="noreferrer"
            >
              Apply now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative pb-24 px-6">
        <div className="container mx-auto max-w-5xl space-y-10">
          <p className="text-muted-foreground text-xl md:text-2xl font-semibold text-center">Thank you to our sponsors for making this competition possible.</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center">
            <img src={HrtLogo} alt="Hudson River Trading" className="h-36 md:h-44 w-auto drop-shadow" />
            <img src={JaneStreetLogo} alt="Jane Street" className="h-36 md:h-44 w-auto drop-shadow" />
          </div>
          <div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center">
            <img src={CitadelLogo} alt="Citadel" className="h-12 md:h-16 w-auto drop-shadow" />
            <img src={PolymarketLogo} alt="Polymarket" className="h-12 md:h-16 w-auto drop-shadow" />
            {/* <img src={CitadelLogo} alt="Citadel Securities" className="h-12 w-auto drop-shadow" /> */}
          </div>
        </div>
      </section>

      <section className="relative pb-24 px-6">
        <div className="container mx-auto max-w-5xl space-y-10">
          <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
          <div className="space-y-6">
            {FAQ.map((faq, index) => (
              <div key={index}>
                <h3 className="text-foreground font-medium mb-1">{faq.q}</h3>
                <p className="text-muted-foreground text-sm whitespace-pre-line">{faq.a}</p>
              </div>
            ))}
          </div>
          <p>
            Have more questions? Ask us on our{" "}
            <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="underline">
              Discord
            </a>{" "}
            server, or reach out by{" "}
            <a href={SOCIAL_LINKS.EMAIL} className="underline">
              email
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Competition;
