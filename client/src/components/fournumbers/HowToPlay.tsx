import { useEffect } from "react";

export function HowToPlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="fn-card !bg-black max-w-lg w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="How to play"
        data-testid="help"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="fn-eyebrow mb-2">Rules</p>
            <h2 className="text-3xl font-light tracking-tight">How to play</h2>
          </div>
          <button onClick={onClose} className="fn-btn-quiet text-xl" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="space-y-5 text-sm text-dusty leading-relaxed">
          <p>
            Use <span className="text-alabaster">all four numbers</span>, each exactly once, with + − × ÷ to make{" "}
            <span className="text-alabaster">24</span>. Fractions along the way are fine: 3 3 8 8 is 8 ÷ (3 − 8 ÷ 3).
          </p>
          <p>
            No parentheses needed. Click a number, an operator, then another number; the result replaces the second number and
            stays selected. For a × (b − c) + d, click b, −, c, ×, a, +, d.
          </p>
          <div>
            <p className="text-alabaster mb-1">Beat the clock</p>
            <p>120 seconds to start, +10 per solve, −20 per skip. Final score = points + seconds left.</p>
          </div>
          <div>
            <p className="text-alabaster mb-1">No time limit</p>
            <p>Final score = points + max(30 × solved − 10 × skipped − seconds used, 0).</p>
          </div>
          <div>
            <p className="text-alabaster mb-1">Points</p>
            <p>
              Each puzzle is worth 10 × (1 + 2 ÷ distinct solutions): 30 for a puzzle with one answer, approaching 10 for puzzles
              with many. The clock pauses while solutions are shown.
            </p>
          </div>
          <div>
            <p className="text-alabaster mb-1">Keyboard</p>
            <ul className="space-y-1">
              <li><span className="fn-kbd">1</span>–<span className="fn-kbd">4</span> select tiles, left to right, top to bottom</li>
              <li><span className="fn-kbd">+</span> <span className="fn-kbd">-</span> <span className="fn-kbd">*</span> or <span className="fn-kbd">x</span> <span className="fn-kbd">/</span> operators</li>
              <li><span className="fn-kbd">A</span> add everything left · <span className="fn-kbd">S</span> multiply everything left</li>
              <li><span className="fn-kbd">Esc</span> undo · <span className="fn-kbd">R</span> reset · <span className="fn-kbd">N</span> skip</li>
              <li><span className="fn-kbd">Enter</span> next puzzle</li>
            </ul>
          </div>
          <p>
            Difficulty tiers use 4nums.com&apos;s ranking of all 1362 solvable puzzles by median solve time.
          </p>
        </div>
      </div>
    </div>
  );
}
