import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, ExternalLink } from "lucide-react";
import WavyGrid from "@/components/WavyGrid";
import SponsorSection from "@/components/SponsorSection";
import { useState, useEffect } from "react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-15T23:59:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Call to Action Banner */}
      <section className="relative border-b border-border py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-80" aria-hidden>
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(26,64,170,0.25)_0%,_rgba(5,7,12,0)_65%)] blur-2xl" />
          <div className="absolute right-[-18rem] top-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(9,126,227,0.2)_0%,_rgba(5,7,12,0)_70%)] blur-2xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Applications Open
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-12">
            2026 Waterloo Trading Competition
          </h2>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-6 md:gap-12 mb-10">
            {[
              { value: timeLeft.days, label: "days" },
              { value: timeLeft.hours, label: "hours" },
              { value: timeLeft.minutes, label: "min" },
              { value: timeLeft.seconds, label: "sec" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-5xl md:text-6xl lg:text-7xl font-light tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://me.waterlooquantclub.com/forms/2026-waterloo-trading-competition-application/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/competition"
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
            >
              View Info
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Wavy Grid Background */}
        <div className="absolute inset-0 animate-fade-in pointer-events-none">
          <WavyGrid className="w-full h-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Circular gradient backdrop for readability - tinted dark blue to blend with global gradient */}
          <div
            className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-w-[1200px] min-h-[1200px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(3,8,20,1) 0%, rgba(3,8,20,1) 15%, rgba(3,8,20,0.7) 30%, rgba(3,8,20,0.4) 45%, rgba(3,8,20,0.15) 60%, rgba(3,8,20,0.05) 75%, transparent 100%)'
            }}
          />

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
