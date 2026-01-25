import Layout from "@/components/Layout";
import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Trophy,
  GraduationCap,
  Plane,
  Clock4,
} from "lucide-react";

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
      "Hosted in-person at the University of Waterloo campus. Travel reimbursements provided for off-campus participants.",
    Icon: MapPin,
  },
  {
    title: "Apply By",
    value: "February 15, 2026 · 11:59 PM ET",
    description: "Apply through the application portal by February 15, 2026 at 11:59 PM ET.",
    Icon: Clock4,
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
              Top performers will compete for a cash prize pool, and travel reimbursements will be provided for accepted participants traveling from outside the Waterloo region. Applications are open to all university students in Canada and the United States and close on February 15, 2026.
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
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 text-center">
            <img src={CitadelLogo} alt="Citadel" className="h-12 md:h-16 w-auto drop-shadow" />
            {/* <img src={CitadelLogo} alt="Citadel Securities" className="h-12 w-auto drop-shadow" /> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Competition;
