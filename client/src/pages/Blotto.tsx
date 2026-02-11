import Layout from "@/components/Layout";
import { Trophy, ScrollText } from "lucide-react";

const Blotto = () => {
  return (
    <Layout>
      {/* ONE continuous background for the entire page */}
      <div className="relative overflow-hidden">
        {/* Background layer (never cut off) */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-[#0b1224] to-[#04060b]" />
          <div className="absolute -left-40 top-10 w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(26,64,170,0.22)_0%,_rgba(5,7,12,0)_65%)] blur-2xl" />
          <div className="absolute right-[-18rem] top-1/4 w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(9,126,227,0.18)_0%,_rgba(5,7,12,0)_70%)] blur-2xl" />
        </div>

        {/* HERO */}
        <section className="relative">
          <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Game
                </p>
                <h1 className="text-4xl md:text-6xl font-light leading-tight">
                  Colonel
                  <br />
                  Blotto
                </h1>
              </div>

              <p className="text-muted-foreground text-lg max-w-3xl">
                Allocate your troops to claim territories, win points, climb the
                leaderboard, and win prizes!
              </p>

              {/* COMING SOON CTA */}
              <div className="pt-2 flex flex-wrap gap-3">
                <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white/60 px-5 py-3 text-sm font-medium tracking-wide cursor-not-allowed">
                  Coming Soon on Monday, Feb 16th
                  <Trophy className="w-4 h-4 opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RULES */}
        <section className="relative py-6 px-6">
          <div className="container mx-auto max-w-4xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <ScrollText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">Rules</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                In a game of Colonel Blotto, two players simultaneously
                distribute at most 100 soldiers across 10 towers. Upon reveal,
                each tower is claimed by the player who assigned more soldiers,
                who is awarded points equivalent to the tower number (e.g.
                claiming tower 6 will earn you 6 points, and claiming both
                towers 3 and 6 will earn you 9 points). When both players tie at
                a tower, nobody is awarded. Special scenario may take place to 
                affect how points are awarded.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <ScrollText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">Scoring</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                1-3 scenarios will take place each week, where submissions open from 
                Monday to Sunday midnight. For each scenario, you will submit a strategy 
                to allocate your soldiers, which will separately run against all other 
                players who submitted to the current scenario. Your score for the scenario 
                is calculated by the average score from all individual 1v1 games. If you 
                rank the i-th place among n players who submitted for the tournament, a 
                score of sqrt(n/i) is added to your cumulative total for the term (used 
                for leaderboard ranking).
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blotto;
