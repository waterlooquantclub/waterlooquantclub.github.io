import Layout from "@/components/Layout";
import {
  Trophy,
  ScrollText,
  Swords,
  Clock,
  Calendar,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const Blotto = () => {
  return (
    <Layout>
      {/* ONE continuous background for the entire page */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background layer */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-[#0b1224] to-[#04060b]" />
          <div className="absolute -left-40 top-10 w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(26,64,170,0.22)_0%,_rgba(5,7,12,0)_65%)] blur-2xl" />
          <div className="absolute right-[-18rem] top-1/4 w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(9,126,227,0.18)_0%,_rgba(5,7,12,0)_70%)] blur-2xl" />
        </div>

        {/* HERO */}
        <section className="relative pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl leading-tight tracking-tight text-white">
                Colonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Blotto
                </span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                A 5-minute deployment or a 5-day strategic obsession. Allocate
                your troops, outsmart your peers, and climb the leaderboard.
              </p>

              {/* ACTION BUTTONS */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="https://me.waterlooquantclub.com/forms/"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  Submit Strategies on the Member Portal
                  <Swords className="w-5 h-5" />
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 text-base font-medium border border-white/10 transition-all"
                >
                  Read Rules
                  <ScrollText className="w-5 h-5" />
                </a>

                {/* LEADERBOARD */}
                <Link
                  to="/games/blotto/leaderboard"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition-colors"
                >
                  Leaderboard
                  <Trophy className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRIZES SECTION */}
        <section className="relative py-12 px-6">
          <div className="block md:hidden">
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-white">
                  Tournament Prizes
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-yellow-400 font-bold text-lg">
                    1st Place
                  </span>
                  <div className="text-right">
                    <span className="block text-white font-medium">$150</span>
                    <span className="text-xs text-muted-foreground">
                      Amazon Gift Card
                    </span>
                  </div>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-gray-300 font-medium text-lg">
                    2nd Place
                  </span>
                  <div className="text-right">
                    <span className="block text-white font-medium">$75</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-orange-700 font-medium text-lg">
                    3rd Place
                  </span>
                  <div className="text-right">
                    <span className="block text-white font-medium">$50</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden md:block container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/10 transition-colors md:mt-4">
                <Trophy className="w-8 h-8 text-gray-400" />
                <h3 className="text-xl font-bold text-white">2nd Place</h3>
                <p className="text-2xl font-light text-blue-200">$75</p>
              </div>

              <div className="bg-gradient-to-b from-blue-900/40 to-white/5 border border-blue-500/30 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl md:-mt-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy className="w-12 h-12 text-yellow-400" />
                <div className="space-y-1 relative z-10">
                  <h3 className="text-2xl font-bold text-white">1st Place</h3>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                    $150
                  </p>
                  <p className="text-sm text-blue-200">Amazon Gift Card</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/10 transition-colors md:mt-4">
                <Trophy className="w-8 h-8 text-orange-700" />
                <h3 className="text-xl font-bold text-white">3rd Place</h3>
                <p className="text-2xl font-light text-blue-200">$50</p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-wider">
              * Prizes available for UW Students
            </p>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section id="how-it-works" className="relative py-12 px-6 pb-24">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            {/* COLUMN 1: THE GAME */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">The Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  In Colonel Blotto, you and your opponent simultaneously
                  distribute
                  <strong className="text-white"> 100 soldiers </strong> across
                  <strong className="text-white"> 10 towers</strong>.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Towers are claimed by whoever assigns more soldiers.",
                    "Points match the tower number (Tower 6 = 6 points).",
                    "Ties award zero points to both sides.",
                    "Special weekly scenarios may impose unique twists!",
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-2.5 shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">Schedule</h2>
                </div>
                <div className="bg-white/5 border border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-10 h-10 text-blue-500/50" />
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        Weekly Rounds
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        New rounds with fresh tactical twists start every
                        Monday.
                      </p>
                      <div className="inline-block bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded border border-blue-500/30">
                        Submit: Monday 00:00 — Sunday 23:59 ET
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: SCORING */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Swords className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">
                    Tournament & Scoring
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Your strategy runs against{" "}
                  <strong>every other player's submission</strong>. Your game
                  score is the average of all these 1v1 matchups.
                </p>

                <div className="p-5 bg-[#0b1224] border border-blue-900/30 space-y-3">
                  <p className="text-muted-foreground text-sm">
                    If you rank{" "}
                    <span className="text-white font-mono">i-th</span> place out
                    of <span className="text-white font-mono">n</span> players:
                  </p>
                  <div className="py-2">
                    <code className="text-xl md:text-2xl text-white font-mono bg-black/30 px-4 py-2 rounded border border-white/10">
                      Score += √(n / i)
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Overall winners are determined by cumulative score across
                    all rounds.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-6 border-l-2 border-blue-600">
                <h3 className="text-white font-semibold mb-2">
                  Ready to play?
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Check the member portal for this week's scenarios.
                </p>
                <a
                  href="https://me.waterlooquantclub.com/forms/"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
                >
                  Go to Submission Forms on Portal &rarr;
                </a>
              </div>
            </div>
            
            {/* SCENARIO ARCHIVE */}
            <div className="md:col-span-2 pt-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-white">
                  <ScrollText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">Scenario Archive</h2>
                </div>

                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  Explore past weekly scenarios.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      week: "Week 1",
                      scenarios: [
                        "Standard Blotto — each tower is worth points equivalent to their index.",
                        "The highest-indexed tower won by each player is worth negative amount of points.",
                      ],
                    },
                    {
                      week: "Week 2",
                      scenarios: [
                        "The lowest-indexed tower won by each player is worth triple amount of points.",
                        "If a player wins the tower whose index is equal to the number of towers won, then the player's total score doubles.",
                      ],
                    },
                    {
                      week: "Week 3",
                      scenarios: [
                        "If a player wins two or more consecutive towers, then the first tower of each consecutive run is worth double amount of points.",
                        "If a player wins a tower that is not adjacent to any other towers won, then that tower is worth negative amount of points.",
                      ],
                    },
                    {
                      week: "Week 4",
                      scenarios: [
                        "If the index of the last (highest-indexed) tower won by a player is larger than that of the opponent, then each tower the player wins is worth one point fewer.",
                        "For each player, the tower they won by the maximum margin is worth double amount of points. If there is a tie, then the lowest-indexed tower is worth double."
                       ],
                    },
                  ].map((entry, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600" />

                      <div className="p-6 md:p-7">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                          <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white">
                              {entry.week}
                            </h3>
                          </div>

                          <div className="inline-flex items-center self-start rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                            2 Scenarios
                          </div>
                        </div>

                        <div className="grid gap-4">
                          {entry.scenarios.map((scenario, j) => (
                            <div
                              key={j}
                              className="border border-white/10 bg-[#0b1224]/70 p-4 md:p-5 hover:bg-[#101938] transition-colors"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-semibold text-blue-200">
                                  {j + 1}
                                </div>

                                <div>
                                  <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-1">
                                    Scenario {j + 1}
                                  </h4>
                                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                                    {scenario}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blotto;