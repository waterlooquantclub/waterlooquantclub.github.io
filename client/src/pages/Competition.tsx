import Layout from "@/components/Layout";
import SponsorSection from "@/components/SponsorSection";
import BayerTriangles from "@/components/BayerTriangles";
import {
  Calendar,
  MapPin,
  Trophy,
  GraduationCap,
  Plane,
  Clock4,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const PORTAL_URL = "https://me.waterlooquantclub.com";

const detailCards = [
  {
    title: "Prize Pool",
    value: "$10,000+ in prizes",
    description: "Cash prizes for top-performing teams, per game and overall.",
    Icon: Trophy,
  },
  {
    title: "Eligibility",
    value: "Undergraduate students",
    description: "Open to undergraduate students from any country.",
    Icon: GraduationCap,
  },
  {
    title: "Location",
    value: "University of Waterloo (in-person)",
    description:
      "Hosted in Waterloo. Travel and accommodation subsidies provided for off-campus participants.",
    Icon: MapPin,
  },
  {
    title: "Applications",
    value: "Decisions released",
    description:
      "Acceptance decisions have been sent by email and are also visible on the portal. Accepted participants must RSVP on the portal to confirm their spot.",
    Icon: Clock4,
  },
];

const FAQ = [
  {
    q: "What is a trading competition? What is it that is being traded?",
    a: "Think of it as a high-stakes strategy tournament. Rather than trading actual stocks, you will participate in a series of \u201Ctrading games\u201D that simulate the core logic of quantitative trading.\nFor example, imagine a game where every participant receives a card, and the \u201Cprice\u201D of a contract is the sum of all cards across all participants. You only know your own card, so you have to infer what others are holding based on how they are buying or selling. If you think the total sum is 50, but the market is trading at 40, you \u201Cbuy.\u201D However, you have to be strategic: if you buy too aggressively, others might realize you have a high card, and the price will move against you before you can finish your trade.",
  },
  {
    q: "Do I need prior experience to participate?",
    a: "Not at all! You especially don\u2019t need a background in finance. Instead, a passion for problem-solving and a \u201Ctrader\u2019s mindset\u201D (quick decision-making and risk assessment) are essential. A strong foundation in probability, mental math, and game theory will give you a significant edge.",
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
    a: "Overall rankings will be individual. However, some games will be team-based, where you will be randomly assigned a team. For these games, the overall contribution to your ranking will be based on your team's performance. Teams may change across games.",
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
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Bayer Dither Triangle Background */}
        <div className="absolute inset-0 animate-fade-in">
          <BayerTriangles className="w-full h-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 pointer-events-none">
          {/* Circular gradient backdrop for readability */}
          <div
            className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-w-[1200px] min-h-[1200px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(3,8,20,1) 0%, rgba(3,8,20,1) 15%, rgba(3,8,20,0.7) 30%, rgba(3,8,20,0.4) 45%, rgba(3,8,20,0.15) 60%, rgba(3,8,20,0.05) 75%, transparent 100%)'
            }}
          />

          <div className="max-w-2xl relative">
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4 animate-fade-in">
              Competition
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 animate-fade-in-delay">
              2026 Waterloo
              <br />
              Trading Competition
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-6 animate-fade-in-delay-2">
              Canada's first international university trading competition.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm md:text-base mb-10 animate-fade-in-delay-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors"
                style={{
                  background:
                    "linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)",
                }}
              >
                <Calendar className="w-4 h-4" />
                March 22, 2026
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors"
                style={{
                  background:
                    "linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)",
                }}
              >
                <Plane className="w-4 h-4" />
                University of Waterloo (in-person)
              </span>
            </div>

            <div className="flex gap-4 animate-fade-in-delay-2">
              <span
                className="pointer-events-auto inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 text-sm font-medium tracking-wide cursor-not-allowed"
              >
                Decisions Released
              </span>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
              >
                Open Portal
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("competition-details")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="pointer-events-auto inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
              >
                Learn More
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("faq")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="pointer-events-auto inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About the Competition */}
      <section id="competition-details" className="py-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold mb-8">About the Competition</h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg mb-10">
            <p>
              The 2026 Waterloo Trading Competition brings together university students from across Canada and the United States to compete in a fast-paced, simulated trading environment. Hosted by the Waterloo Quant Club, the competition will be held in-person on the University of Waterloo campus and is designed to test quantitative intuition, risk management, and real-time decision-making.
            </p>
            <p>
              The competition takes place on March 22, 2026, with optional pre-competition events on March 21. No prior trading experience is required. The event is accessible to students from a wide range of academic backgrounds, while still offering meaningful challenges for experienced participants.
            </p>
            <p>
              Top performers will compete for a cash prize pool, and travel subsidies will be provided for accepted participants traveling from outside the Waterloo region. Applications are closed, and acceptance decisions are out — check your email and the{" "}
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                member portal
              </a>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {detailCards.map(({ title, value, description, Icon }) => (
              <div
                key={title}
                className="group p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors"
                style={{
                  background:
                    "linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#132C7B]/60 text-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground">{title}</p>
                    <h3 className="text-xl font-semibold text-foreground">{value}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border border-[#FAFAFA]/20 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{
              background:
                "linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)",
            }}
          >
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Applications</p>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">Acceptance decisions are out</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Check your email (the address used on your application) and the{" "}
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  portal
                </a>
                {" "}to view your decision. If you were accepted, please RSVP on the portal to confirm your spot. If you applied and didn’t receive an email, contact us by{" "}
                <a href={SOCIAL_LINKS.EMAIL} className="underline">email</a> or on{" "}
                <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="underline">Discord</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="pt-16 pb-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold mb-8">Thanks to our sponsors!</h2>
        </div>
        <SponsorSection hideTitle />
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-24 px-6 border-t border-border pt-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold mb-8">FAQ</h2>
          <div className="space-y-6">
            {FAQ.map((faq, index) => (
              <div key={index}>
                <h3 className="text-foreground font-medium mb-1">{faq.q}</h3>
                <p className="text-muted-foreground text-sm whitespace-pre-line">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-10">
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
