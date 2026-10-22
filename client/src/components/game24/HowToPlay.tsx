import { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function HowToPlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const returnFocus = useRef<HTMLElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent
        className="g24-card !bg-black w-[calc(100%-2rem)] max-w-lg p-6 sm:p-8 max-h-[85vh] overflow-y-auto block"
        aria-describedby={undefined}
        onOpenAutoFocus={() => { returnFocus.current = document.activeElement as HTMLElement; }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus.current?.focus({ preventScroll: true });
        }}
        data-testid="help"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="g24-eyebrow mb-2">Rules</p>
            <DialogTitle className="text-3xl font-light tracking-tight">How to play</DialogTitle>
          </div>
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
              <li><span className="g24-kbd">1</span>–<span className="g24-kbd">4</span> select tiles, left to right, top to bottom</li>
              <li><span className="g24-kbd">+</span> <span className="g24-kbd">-</span> <span className="g24-kbd">*</span> or <span className="g24-kbd">x</span> <span className="g24-kbd">/</span> operators</li>
              <li><span className="g24-kbd">A</span> add everything left · <span className="g24-kbd">S</span> multiply everything left</li>
              <li><span className="g24-kbd">Esc</span> undo · <span className="g24-kbd">R</span> reset · <span className="g24-kbd">N</span> skip</li>
              <li><span className="g24-kbd">Enter</span> next puzzle</li>
            </ul>
          </div>
          <p>
            Difficulty tiers use 4nums.com&apos;s ranking of all 1362 solvable puzzles by median solve time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
