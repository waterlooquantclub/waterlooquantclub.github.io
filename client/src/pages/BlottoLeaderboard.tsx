import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Trophy, Search, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSahFyqrXJpmugCHQjdzNSGwu81hS6vKhrvXom03NNV70lR4gvW2pgEdB9gAjWeqhq3w6Lv_k-EqBx_/pub?gid=1380898845&single=true&output=csv";

interface LeaderboardEntry {
  rank: number;
  name: string;
  waterloo: boolean;
  totalScore: number;
}

function parseCSV(csv: string): LeaderboardEntry[] {
  const lines = csv.trim().split("\n");
  // skip header row
  return lines.slice(1).map((line) => {
    // handle potential commas inside quoted fields
    const cols = line.split(",");
    return {
      rank: parseInt(cols[0], 10),
      name: cols[1]?.trim() ?? "",
      waterloo: cols[2]?.trim() === "*",
      totalScore: parseFloat(cols[3]) || 0,
    };
  });
}

const BlottoLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leaderboard data");
        return res.text();
      })
      .then((csv) => {
        setEntries(parseCSV(csv));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = entries.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const rankAccent = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-muted-foreground";
  };

  const rowBg = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/20";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/15";
    if (rank === 3)
      return "bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/15";
    return "border-white/5";
  };

  const rankIcon = (rank: number) => {
    if (rank <= 3)
      return (
        <Trophy
          className={`w-4 h-4 ${rank === 1
            ? "text-yellow-400"
            : rank === 2
              ? "text-gray-300"
              : "text-orange-400"
            }`}
        />
      );
    return null;
  };

  return (
    <Layout>
      <div className="relative overflow-hidden min-h-screen">
        {/* Background — same as Blotto page */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-[#0b1224] to-[#04060b]" />
          <div className="absolute -left-40 top-10 w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(26,64,170,0.22)_0%,_rgba(5,7,12,0)_65%)] blur-2xl" />
          <div className="absolute right-[-18rem] top-1/4 w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(9,126,227,0.18)_0%,_rgba(5,7,12,0)_70%)] blur-2xl" />
        </div>

        {/* HERO */}
        <section className="relative pt-24 pb-8 px-6">
          <div className="container mx-auto max-w-5xl relative z-10">
            <Link
              to="/games/blotto"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Colonel Blotto
            </Link>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl leading-tight tracking-tight text-white">
                Colonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Blotto
                </span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Overall Leaderboard
              </p>
            </div>
          </div>
        </section>

        {/* LEADERBOARD */}
        <section className="relative pb-24 px-6">
          <div className="container mx-auto max-w-5xl relative z-10">
            {/* Search Bar */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-colors"
                />
              </div>

              <a
                href="https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vSahFyqrXJpmugCHQjdzNSGwu81hS6vKhrvXom03NNV70lR4gvW2pgEdB9gAjWeqhq3w6Lv_k-EqBx_/pubhtml#gid=1380898845"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 underline underline-offset-4"
              >
                Full Scenario Breakdown Can Be Found Here
              </a>
            </div>

            {/* Table */}
            <div className="bg-white/[0.03] border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[2rem_1fr_2rem_4rem] md:grid-cols-[4rem_1fr_6rem_8rem] gap-1 md:gap-2 px-3 md:px-6 py-3 bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <span className="hidden md:inline">Rank</span><span className="md:hidden">#</span>
                <span>Name</span>
                <span className="text-center">UW</span>
                <span className="text-right">Score</span>
              </div>

              {/* Body */}
              {loading && (
                <div className="flex items-center justify-center py-20 gap-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-muted-foreground text-sm">
                    Loading leaderboard…
                  </span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center py-20">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {!loading && !error && filtered.length === 0 && (
                <div className="flex items-center justify-center py-20">
                  <p className="text-muted-foreground text-sm">
                    No players found.
                  </p>
                </div>
              )}

              {!loading &&
                !error &&
                filtered.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`grid grid-cols-[2rem_1fr_2rem_4rem] md:grid-cols-[4rem_1fr_6rem_8rem] gap-1 md:gap-2 px-3 md:px-6 py-3 border-b transition-colors hover:bg-white/[0.04] ${rowBg(
                      entry.rank
                    )}`}
                  >
                    {/* Rank */}
                    <span
                      className={`font-mono text-sm font-semibold flex items-center gap-1.5 ${rankAccent(
                        entry.rank
                      )}`}
                    >
                      <span className="hidden md:inline-flex">{rankIcon(entry.rank)}</span>
                      {entry.rank}
                    </span>

                    {/* Name */}
                    <span
                      className={`text-sm truncate ${entry.rank <= 3
                        ? "text-white font-medium"
                        : "text-gray-300"
                        }`}
                    >
                      {entry.name}
                    </span>

                    {/* Waterloo */}
                    <span className="text-center text-sm">
                      {entry.waterloo && (
                        <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 border border-blue-500/30">
                          ✓
                        </span>
                      )}
                    </span>

                    {/* Score */}
                    <span
                      className={`text-right font-mono text-sm ${entry.rank <= 3
                        ? "text-white font-semibold"
                        : "text-gray-400"
                        }`}
                    >
                      {entry.totalScore.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>

            {/* Footer count */}
            {!loading && !error && (
              <p className="text-xs text-muted-foreground mt-3">
                Showing {filtered.length} of {entries.length} players
                {search && ` matching "${search}"`}
              </p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BlottoLeaderboard;
