import { bonus, finalScore, type Session } from "@/lib/fournumbers/session";
import { DIFFICULTIES } from "@/lib/fournumbers/puzzles";

export function Summary({ session: s, newBest, onAgain, onMenu }: { session: Session; newBest: boolean; onAgain: () => void; onMenu: () => void }) {
  const solvedTimes = s.records.filter((r) => r.outcome === "solved").map((r) => r.ms);
  const avg = solvedTimes.length ? solvedTimes.reduce((a, b) => a + b, 0) / solvedTimes.length : null;
  const fastest = solvedTimes.length ? Math.min(...solvedTimes) : null;
  const diff = DIFFICULTIES.find((d) => d.id === s.difficulty)!;

  return (
    <section className="mx-auto max-w-3xl pt-6 sm:pt-12 fn-fade-up" data-testid="summary">
      <p className="fn-eyebrow mb-4">
        {s.mode === "clock" ? "Beat the clock" : "No time limit"} · {diff.label} · {s.endReason === "time" ? "Time's up" : "Finished"}
      </p>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight tabular-nums" data-testid="final-score">
          {finalScore(s).toLocaleString()}
        </h1>
        {newBest && (
          <span className="fn-tag mb-3" data-testid="new-best">
            New personal best
          </span>
        )}
      </div>
      <p className="text-dusty mt-3">
        {s.score.toLocaleString()} puzzle points + {bonus(s).toLocaleString()} {s.mode === "clock" ? "seconds left" : "bonus"}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
        {[
          ["Solved", String(s.solved)],
          ["Skipped", String(s.skipped)],
          ["Average", avg === null ? "—" : `${(avg / 1000).toFixed(1)}s`],
          ["Fastest", fastest === null ? "—" : `${(fastest / 1000).toFixed(1)}s`],
        ].map(([k, v]) => (
          <div key={k} className="fn-card p-4">
            <p className="fn-eyebrow !text-[11px] mb-1">{k}</p>
            <p className="text-3xl font-light tabular-nums">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <button className="fn-btn fn-btn-primary" onClick={onAgain} data-testid="again">
          Play again
        </button>
        <button className="fn-btn" onClick={onMenu} data-testid="menu">
          Change mode
        </button>
      </div>

      {s.records.length > 0 && (
        <div className="mt-14 pt-10 border-t border-line">
          <h2 className="text-2xl font-semibold mb-6">Puzzles</h2>
          <ol className="divide-y divide-line border-y border-line" data-testid="history">
            {s.records.map((r, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_7.5rem_1fr_auto] items-baseline gap-3 py-3 text-sm">
                <span className="text-dusty tabular-nums">{i + 1}</span>
                <span className="tracking-widest tabular-nums">{r.numbers.join(" ")}</span>
                <span className="text-dusty truncate tracking-wide" title={r.solutions.join("\n")}>
                  {r.solutions[0]}
                  {r.solutions.length > 1 && <span className="text-alabaster/40"> +{r.solutions.length - 1}</span>}
                </span>
                <span className={`text-right tabular-nums ${r.outcome === "solved" ? "text-alabaster" : "text-dusty"}`}>
                  {r.outcome === "solved" ? `+${r.points} · ${(r.ms / 1000).toFixed(1)}s` : r.outcome}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}