import { useCallback, useEffect, useRef, useState } from "react";
import { clickOp, clickTile, foldAll, isDeadEnd, remaining, reset, undo, type Board } from "@/lib/fournumbers/board";
import { format, OP_SYMBOL, OPS, type Op, type Rational } from "@/lib/fournumbers/rational";
import { revealSeconds, type Session } from "@/lib/fournumbers/session";
import { DIFFICULTIES } from "@/lib/fournumbers/puzzles";

interface Props {
  session: Session;
  daily: boolean;
  showSolutions: boolean;
  onToggleSolutions: (v: boolean) => void;
  onBoard: (b: Board) => void;
  onSkip: () => void;
  onDone: () => void;
  onNext: () => void;
  onQuit: () => void;
  onHelp: () => void;
  inputLocked: boolean;
}

const KEY_OPS: Record<string, Op> = { "+": "+", "-": "-", "*": "*", x: "*", X: "*", "/": "/" };

function clock(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function Game(p: Props) {
  const { session: s, onBoard } = p;
  const b = s.board;
  const [shakeKey, setShakeKey] = useState(0);

  const act = useCallback(
    (next: Board) => {
      if (next.error) setShakeKey((k) => k + 1);
      onBoard(next);
    },
    [onBoard],
  );

  // Keyboard: 1-4 pick tiles in reading order, + − × ÷ (also x), A adds all,
  // S multiplies all, Esc/Backspace undoes, R resets, N skips, Enter/Space
  // moves on from the solution screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (p.inputLocked || e.metaKey || e.ctrlKey || e.altKey) return;
      if (s.phase === "reveal") {
        if (e.key === "Enter" || e.key === " " || e.key === "n" || e.key === "N") {
          e.preventDefault();
          p.onNext();
        }
        return;
      }
      const k = e.key;
      if (k >= "1" && k <= "4") act(clickTile(b, Number(k) - 1));
      else if (KEY_OPS[k]) act(clickOp(b, KEY_OPS[k]));
      else if (k === "a" || k === "A") act(foldAll(b, "+"));
      else if (k === "s" || k === "S") act(foldAll(b, "*"));
      else if (k === "Escape" || k === "Backspace") act(undo(b));
      else if (k === "r" || k === "R") act(reset(b));
      else if (k === "n" || k === "N") p.onSkip();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [b, s.phase, p, act]);

  const dead = isDeadEnd(b);
  const last = s.records[s.records.length - 1];
  const diff = DIFFICULTIES.find((d) => d.id === s.difficulty)!;
  const low = s.mode === "clock" && s.clockMs < 15_000;

  return (
    <section className="mx-auto max-w-5xl pt-4 sm:pt-8 fn-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="fn-eyebrow mb-2">
            {p.daily ? "Puzzle of the Day" : `${s.mode === "clock" ? "Beat the clock" : "No time limit"} · ${diff.label}`}
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">Make 24</h1>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={p.onHelp} className="fn-btn-quiet" data-testid="nav-help">
            How to play
          </button>
          <button onClick={p.onQuit} className="fn-btn-quiet">
            ← Menu
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Board */}
        <div className="fn-card p-4 sm:p-8 relative">
          {/* Sized so the whole board, operators and actions fit above the fold. */}
          <div className="mx-auto" style={{ maxWidth: "clamp(17rem, 100vh - 30rem, 26rem)" }}>
          <div key={shakeKey} className={`grid grid-cols-2 gap-3 sm:gap-4 ${shakeKey ? "fn-shake" : ""}`}>
            {b.slots.map((v, i) => {
              const sel = b.selected === i;
              return (
                <button
                  key={i}
                  data-testid={`tile-${i}`}
                  aria-label={v ? `Tile ${i + 1}: ${format(v)}` : `Tile ${i + 1}: empty`}
                  aria-pressed={sel}
                  disabled={!v || s.phase !== "playing"}
                  onClick={() => act(clickTile(b, i))}
                  className={`relative aspect-square grid place-items-center border transition-colors ${
                    !v
                      ? "border-dashed border-alabaster/10 bg-transparent"
                      : sel
                        ? "border-alabaster bg-downriver"
                        : "border-alabaster/25 bg-black/60 hover:border-alabaster/60 hover:bg-downriver/25"
                  }`}
                >
                  {v && <TileValue v={v} testid={`tile-value-${i}`} />}
                  <span className="absolute top-2 left-2.5 text-[10px] text-alabaster/30 font-mono">{i + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4">
            {OPS.map((op) => (
              <button
                key={op}
                data-testid={`op-${op}`}
                aria-label={{ "+": "add", "-": "subtract", "*": "multiply", "/": "divide" }[op]}
                aria-pressed={b.op === op}
                disabled={s.phase !== "playing" || b.selected === null || remaining(b) < 2}
                onClick={() => act(clickOp(b, op))}
                className={`h-12 sm:h-14 text-3xl font-light border transition-colors disabled:opacity-30 ${
                  b.op === op ? "border-alabaster bg-alabaster text-black" : "border-alabaster/25 hover:border-alabaster/60"
                }`}
              >
                {OP_SYMBOL[op]}
              </button>
            ))}
          </div>

          <div className="mt-4 min-h-[1.5rem] text-center text-sm" aria-live="polite" data-testid="status">
            {b.error ? (
              <span className="text-red-400">{b.error}</span>
            ) : dead ? (
              <span className="text-alabaster/80">
                That makes {format(b.slots.find(Boolean)!)}, not 24. Undo or reset.
              </span>
            ) : b.steps.length ? (
              <span className="text-dusty tracking-wide tabular-nums">{b.steps.map((x) => x.label).join("   ·   ")}</span>
            ) : (
              <span className="text-dusty">Pick a number, an operator, then another number.</span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
            <button className="fn-btn" onClick={() => act(undo(b))} disabled={s.phase !== "playing" || (!b.history.length && b.selected === null)} data-testid="undo">
              Undo
            </button>
            <button className="fn-btn" onClick={() => act(reset(b))} disabled={s.phase !== "playing" || !b.history.length} data-testid="reset">
              Reset
            </button>
            <button className="fn-btn" onClick={p.onSkip} disabled={s.phase !== "playing"} data-testid="skip">
              {p.daily ? "Give up" : "Skip"}
            </button>
            <button className="fn-btn border-red-400/40 text-red-300 hover:border-red-300" onClick={p.daily ? p.onQuit : p.onDone} data-testid="done">
              Done
            </button>
          </div>
          </div>

          {s.phase === "reveal" && last && (
            <Reveal
              key={s.records.length}
              solved={last.outcome === "solved"}
              points={last.points}
              ms={last.ms}
              solutions={last.solutions}
              seconds={revealSeconds(s)}
              auto={p.showSolutions && !p.daily}
              instant={!p.showSolutions && !p.daily}
              daily={p.daily}
              bonusSeconds={s.mode === "clock" ? (last.outcome === "solved" ? 10 : -20) : 0}
              onNext={p.onNext}
            />
          )}
        </div>

        {/* Scoreboard */}
        <aside className="order-first lg:order-none grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 content-start">
          <Stat label={s.mode === "clock" ? "Time left" : "Time"} testid="stat-time" warn={low}>
            {s.mode === "clock" ? clock(s.clockMs) : clock(s.elapsedMs)}
          </Stat>
          <Stat label="Solved" testid="stat-solved">
            {s.solved}
            {s.skipped > 0 && <span className="text-xs sm:text-base text-dusty ml-1 sm:ml-2">/ {s.skipped} skipped</span>}
          </Stat>
          <Stat label="Score" testid="stat-score">
            {s.score.toLocaleString()}
          </Stat>
          <div className="hidden lg:block border border-alabaster/10 p-4 text-xs text-dusty leading-6">
            <p className="fn-eyebrow mb-2 !text-[11px]">Keys</p>
            <p>
              <span className="fn-kbd mx-0.5">1</span>–<span className="fn-kbd mx-0.5">4</span> tiles · <span className="fn-kbd mx-0.5">+</span>
              <span className="fn-kbd mx-0.5">-</span>
              <span className="fn-kbd mx-0.5">*</span>
              <span className="fn-kbd mx-0.5">/</span> ops
            </p>
            <p>
              <span className="fn-kbd mx-0.5">A</span> add all · <span className="fn-kbd mx-0.5">S</span> multiply all
            </p>
            <p>
              <span className="fn-kbd mx-0.5">Esc</span> undo · <span className="fn-kbd mx-0.5">R</span> reset · <span className="fn-kbd mx-0.5">N</span> skip
            </p>
            {!p.daily && (
              <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={p.showSolutions}
                  onChange={(e) => p.onToggleSolutions(e.target.checked)}
                  className="accent-[#132C7B]"
                  data-testid="toggle-solutions"
                />
                Show solutions between puzzles
              </label>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ label, children, testid, warn }: { label: string; children: React.ReactNode; testid: string; warn?: boolean }) {
  return (
    <div className={`fn-card p-3 sm:p-5 ${warn ? "!border-red-400/60" : ""}`}>
      <p className="fn-eyebrow !text-[10px] sm:!text-xs mb-1 sm:mb-2">{label}</p>
      <p className={`text-2xl sm:text-4xl font-light tabular-nums ${warn ? "text-red-300" : ""}`} data-testid={testid}>
        {children}
      </p>
    </div>
  );
}

function Reveal(r: {
  solved: boolean;
  points: number;
  ms: number;
  solutions: string[];
  seconds: number;
  auto: boolean;
  instant: boolean;
  daily: boolean;
  bonusSeconds: number;
  onNext: () => void;
}) {
  const { onNext, auto, instant, seconds } = r;
  const nextRef = useRef<HTMLButtonElement>(null);
  // Focus without scrolling: autoFocus would jump the page on short screens.
  useEffect(() => {
    nextRef.current?.focus({ preventScroll: true });
  }, []);
  // Auto-advance after the solutions have been up for a while (or almost
  // immediately when the player has turned the solution screen off).
  useEffect(() => {
    if (!auto && !instant) return;
    const id = setTimeout(onNext, instant ? 700 : seconds * 1000);
    return () => clearTimeout(id);
  }, [auto, instant, seconds, onNext]);

  return (
    <div
      className="absolute inset-0 z-10 bg-black/90 backdrop-blur-sm flex flex-col p-5 sm:p-8 fn-fade-up"
      data-testid="reveal"
      role="dialog"
      aria-label={r.solved ? "Solved" : "Skipped"}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="fn-eyebrow mb-1">{r.solved ? "Solved" : r.daily ? "Solution" : "Skipped"}</p>
          <p className="text-3xl sm:text-4xl font-light" data-testid="reveal-headline">
            {r.solved ? `+${r.points} points` : r.daily ? "Here's how" : "No points"}
          </p>
        </div>
        <p className="text-dusty text-sm text-right">
          {(r.ms / 1000).toFixed(1)}s
          {r.bonusSeconds !== 0 && (
            <span className={`block ${r.bonusSeconds > 0 ? "text-alabaster" : "text-red-300"}`}>
              {r.bonusSeconds > 0 ? "+" : "−"}
              {Math.abs(r.bonusSeconds)}s on the clock
            </span>
          )}
        </p>
      </div>

      {!instant && (
        <>
          <p className="fn-eyebrow mt-6 mb-3">
            {r.solutions.length} distinct solution{r.solutions.length === 1 ? "" : "s"}
          </p>
          <ul className="flex-1 overflow-y-auto space-y-2 text-lg sm:text-xl font-light tracking-wide tabular-nums pr-2" data-testid="solutions">
            {r.solutions.map((x) => (
              <li key={x} className="border-l-2 border-downriver pl-3">
                {x} <span className="text-dusty">= 24</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-5 flex items-center gap-4">
        <button ref={nextRef} onClick={onNext} className="fn-btn fn-btn-primary flex-1 sm:flex-none" data-testid="next">
          {r.daily ? "Back to menu" : "Next puzzle →"}
        </button>
        {auto && (
          <div className="flex-1 h-px bg-alabaster/15 overflow-hidden">
            <div className="h-full bg-alabaster origin-left" style={{ animation: `fn-drain ${seconds}s linear forwards` }} />
          </div>
        )}
      </div>
    </div>
  );
}
/**
 * Integers print plainly; fractions stack as numerator over denominator. The
 * text content stays "a/b" (the bar is a border, the slash is visually hidden)
 * so copy-paste and tests read the same value the status line shows.
 */
function TileValue({ v, testid }: { v: Rational; testid: string }) {
  const text = format(v);
  const size = text.length > 4 ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl";
  if (v.d === 1) {
    return (
      <span key={text} className={`fn-pop font-light tabular-nums ${size}`} data-testid={testid}>
        {text}
      </span>
    );
  }
  return (
    <span key={text} className="fn-pop font-light tabular-nums flex flex-col items-center leading-none text-3xl sm:text-4xl" data-testid={testid}>
      <span className="px-2 pb-1.5">{v.n}</span>
      <span className="sr-only">/</span>
      <span className="px-2 pt-1.5 border-t border-alabaster/80 w-full text-center">{v.d}</span>
    </span>
  );
}