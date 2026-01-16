import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import WavyGrid from "@/components/WavyGrid";
import SponsorSection from "@/components/SponsorSection";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Wavy Grid Background */}
        <div className="absolute inset-0 animate-fade-in pointer-events-none">
          <WavyGrid className="w-full h-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Circular gradient backdrop for readability */}
          <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-w-[1200px] min-h-[1200px] bg-[radial-gradient(ellipse,hsl(var(--background))_0%,hsl(var(--background))_15%,hsl(var(--background)/0.7)_30%,hsl(var(--background)/0.4)_45%,hsl(var(--background)/0.15)_60%,hsl(var(--background)/0.05)_75%,transparent_100%)] pointer-events-none" />

          <div className="max-w-2xl relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 animate-fade-in-delay">
              Waterloo
              <br />
              Quant Club
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 animate-fade-in-delay-2">
              UWaterloo's premier quantitative finance group.
            </p>
            <div className="flex gap-4 animate-fade-in-delay-2">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
              >
                Join Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("about-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brief About */}
      <section id="about-section" className="py-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            Fostering the Waterloo quant community
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            We prepare students for careers in quant finance by hosting
            seminars, games, and competitions, partnering with industry-leading
            firms.
          </p>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Education",
                  description:
                    "Workshops on statistics, programming, trading, and research.",
                },
                {
                  title: "Competitions",
                  description:
                    "Participate in puzzles, tech challenges, and trading competitions.",
                },
                {
                  title: "Networking",
                  description:
                    "Connect with professionals and recruiters from top firms.",
                },
                {
                  title: "Mentorship",
                  description:
                    "Receive direct mentorship from current and former quants.",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <h3 className="text-foreground font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="pt-0 pb-24 px-6">
        <SponsorSection />
      </section>
    </Layout>
  );
};

export default Index;
