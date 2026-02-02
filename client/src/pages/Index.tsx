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

  const announcementBar = (
    <div className="bg-background border-b border-border py-2 md:py-3 px-3 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Announcement */}
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <span className="hidden sm:inline text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">Applications Open</span>
            <span className="hidden sm:inline text-muted-foreground">—</span>
            <span className="text-xs md:text-sm font-medium truncate">2026 Trading Competition</span>
          </div>

          {/* Center: Countdown Timer */}
          <div className="flex items-center gap-1 md:gap-1.5 shrink-0 text-muted-foreground">
            {[
              { value: timeLeft.days, label: "d" },
              { value: timeLeft.hours, label: "h" },
              { value: timeLeft.minutes, label: "m" },
              { value: timeLeft.seconds, label: "s" },
            ].map((item, index) => (
              <div key={index} className="flex items-baseline">
                <span className="text-sm md:text-base font-light tabular-nums tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] md:text-xs opacity-70">
                  {item.label}
                </span>
                {index < 3 && <span className="text-sm md:text-base font-light opacity-40 mx-0.5">:</span>}
              </div>
            ))}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <a
              href="https://me.waterlooquantclub.com/forms/2026-waterloo-trading-competition-application/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-foreground text-background px-2.5 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-medium tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Apply
              <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 hidden sm:block" />
            </a>
            <Link
              to="/competition"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
            >
              View Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout announcementBar={announcementBar}>

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
