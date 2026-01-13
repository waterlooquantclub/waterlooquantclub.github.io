import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Join = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Join
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Become a Member
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Open to all University of Waterloo students interested in
            quantitative finance. No prior experience required.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://me.waterlooquantclub.com/accounts/signup/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Sign Up Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg/yFHGX7gJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
            >
              Join Discord
            </a>
            <a
              href="https://www.instagram.com/wlooquantclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-secondary transition-colors"
            >
              Follow Instagram
            </a>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Do I need prior experience?",
                  a: "No! We welcome students of all skill levels and backgrounds.",
                },
                {
                  q: "What programs can join?",
                  a: "Any UWaterloo student can join, regardless of faculty.",
                },
                {
                  q: "When do events happen?",
                  a: "Most events are held on weekday evenings during the term.",
                },
                {
                  q: "How can I stay updated on upcoming events?",
                  a: "Events are announced on Instagram and Discord."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="text-foreground font-medium mb-1">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
