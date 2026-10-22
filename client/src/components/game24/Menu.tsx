import { useState } from "react";
import { DIFFICULTIES, dailyPuzzle, type Difficulty } from "@/lib/game24/puzzles";
import { getBest } from "@/lib/game24/storage";
import type { Mode } from "@/lib/game24/session";

const MODES: { id: Mode; title: string; body: string }[] = [
  {
    id: "clock",
    title: "Beat the clock",
    body: "Start with 120 seconds. Every solve adds 10, every skip costs 20. Final score is points plus seconds left.",
  },
  {
    id: "zen",
    title: "No time limit",
    body: "Play as long as you like. Final score is points plus a bonus of 30 per solve, minus 10 per skip and 1 per second used.",
  },
];

export function Menu({
  onStart,
  onDaily,
  onHelp,
}: {
  onStart: (m: Mode, d: Difficulty) => void;
  onDaily: () => void;
  onHelp: () => void;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const today = dailyPuzzle();

  return (
    <section className="mx-auto max-w-3xl pt-10 sm:pt-16 g24-fade-up">
      <p className="g24-eyebrow mb-4">Games</p>
      <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">24 Game</h1>
      <p className="text-dusty text-lg leading-relaxed max-w-xl">
        Use all four numbers and <span className="text-alabaster">+ − × ÷</span> to make{" "}
        <span className="text-alabaster">24</span>. Every puzzle has a solution.{" "}
        <button onClick={onHelp} className="underline underline-offset-4 hover:text-alabaster">
          How to play
        </button>
      </p>

      <div className="mt-12">
        <p className="g24-eyebrow mb-3">Difficulty</p>
        <div className="grid grid-cols-4 border border-alabaster/20" role="radiogroup" aria-label="Difficulty">
          {DIFFICULTIES.map((d, i) => (
            <button
              key={d.id}
              role="radio"
              aria-checked={difficulty === d.id}
              data-testid={`difficulty-${d.id}`}
              onClick={() => setDifficulty(d.id)}
              className={`py-3 px-2 text-sm sm:text-base transition-colors ${i ? "border-l border-alabaster/20" : ""} ${
                difficulty === d.id ? "bg-downriver text-alabaster" : "text-dusty hover:text-alabaster hover:bg-white/[0.03]"
              }`}
            >
              {d.label}
              <span className="hidden sm:block text-[11px] text-alabaster/50 mt-0.5">{d.blurb}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {MODES.map((m) => {
          const best = getBest(m.id, difficulty);
          return (
            <button
              key={m.id}
              data-testid={`mode-${m.id}`}
              onClick={() => onStart(m.id, difficulty)}
              className="g24-card g24-card-hover group block w-full text-left p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="g24-tag">{m.id === "clock" ? "Timed" : "Untimed"}</span>
                <span className="text-xs text-dusty tracking-wide" data-testid={`best-${m.id}`}>
                  {best ? `Best ${best.score.toLocaleString()}` : "No best yet"}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                {m.title}
                <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </h3>
              <p className="text-dusty text-sm leading-relaxed">{m.body}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-16 pt-12 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Puzzle of the Day</h2>
            <p className="text-dusty text-sm">Same four numbers for everyone, resets at 00:00 UTC.</p>
          </div>
          <button onClick={onDaily} className="group flex items-center gap-3" data-testid="daily">
            <span className="flex gap-2">
              {today.n.map((x, i) => (
                <span key={i} className="w-11 h-11 grid place-items-center border border-alabaster/30 text-lg font-light">
                  {x}
                </span>
              ))}
            </span>
            <span className="g24-btn">Play →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
