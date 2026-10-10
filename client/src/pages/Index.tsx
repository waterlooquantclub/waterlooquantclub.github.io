import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import { HomeField, HomeContent } from "@/components/HomeContent";

const Index = () => {
  return (
    <Layout footerDivider={false}>

      <HomeField />
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 relative overflow-hidden">
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
        <div className="hero-scroll-boundary">
          <button onClick={() => document.getElementById('home-content')?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>
            Discover what's next <ArrowDown size={15} aria-hidden="true" />
          </button>
        </div>
      </section>

      <HomeContent />

    </Layout>
  );
};

export default Index;
