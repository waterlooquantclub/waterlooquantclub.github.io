import { apply, format, isInt, rat, type Op, type Rational } from "./rational";

/**
 * One puzzle in progress. Four slots; combining two numbers writes the result
 * into the second one clicked and empties the first, so the board never needs
 * parentheses: for a × (b − c) + d you click b, −, c, ×, a, +, d.
 */
export interface Step {
  from: number;
  to: number;
  op: Op;
  label: string; // "8 − 3 = 5"
}

export interface Board {
  start: Rational[];
  slots: (Rational | null)[];
  selected: number | null;
  op: Op | null;
  /** Prior states for undo; most recent last. */
  history: { slots: (Rational | null)[]; selected: number | null; steps: Step[] }[];
  steps: Step[];
  /** Set when the last move was rejected (divide by zero), for UI feedback. */
  error: string | null;
}

export const TARGET = 24;

export function newBoard(nums: readonly number[]): Board {
  const start = nums.map((n) => rat(n));
  return { start, slots: [...start], selected: null, op: null, history: [], steps: [], error: null };
}

export function remaining(b: Board): number {
  return b.slots.filter((s) => s !== null).length;
}

export function isSolved(b: Board): boolean {
  if (remaining(b) !== 1) return false;
  return isInt(b.slots.find((s) => s !== null)!, TARGET);
}

/** One number left and it is not 24. */
export function isDeadEnd(b: Board): boolean {
  return remaining(b) === 1 && !isSolved(b);
}

function snapshot(b: Board): Board["history"][number] {
  return { slots: b.slots, selected: b.selected, steps: b.steps };
}

export function clickTile(b: Board, i: number): Board {
  if (b.slots[i] === null || isSolved(b)) return b;
  if (b.selected === null || b.selected === i) {
    // Select, or deselect on a second click.
    return { ...b, selected: b.selected === i ? null : i, op: null, error: null };
  }
  if (b.op === null) return { ...b, selected: i, error: null };

  const a = b.slots[b.selected]!;
  const c = b.slots[i]!;
  const value = apply(a, b.op, c);
  if (!value) return { ...b, op: null, error: "Can't divide by zero" };

  const slots = [...b.slots];
  slots[b.selected] = null;
  slots[i] = value;
  const step: Step = { from: b.selected, to: i, op: b.op, label: `${format(a)} ${sym(b.op)} ${format(c)} = ${format(value)}` };
  return { ...b, slots, selected: i, op: null, history: [...b.history, snapshot(b)], steps: [...b.steps, step], error: null };
}

export function clickOp(b: Board, op: Op): Board {
  if (b.selected === null || remaining(b) < 2) return b;
  return { ...b, op: b.op === op ? null : op, error: null };
}

/** Fold every remaining number with one operator (hotkeys A and S). */
export function foldAll(b: Board, op: "+" | "*"): Board {
  const idx = b.slots.map((s, i) => (s ? i : -1)).filter((i) => i >= 0);
  if (idx.length < 2 || isSolved(b)) return b;
  let next: Board = { ...b, selected: idx[0], op: null };
  for (let k = 1; k < idx.length; k++) {
    next = clickTile({ ...next, op }, idx[k]);
  }
  // Collapse the intermediate snapshots so one undo reverts the whole fold.
  return { ...next, history: [...b.history, snapshot(b)] };
}

export function undo(b: Board): Board {
  if (b.op !== null) return { ...b, op: null, error: null };
  const prev = b.history[b.history.length - 1];
  if (!prev) return { ...b, selected: null, error: null };
  return { ...b, ...prev, op: null, history: b.history.slice(0, -1), error: null };
}

export function reset(b: Board): Board {
  return { ...b, slots: [...b.start], selected: null, op: null, history: [], steps: [], error: null };
}

function sym(op: Op): string {
  return { "+": "+", "-": "−", "*": "×", "/": "÷" }[op];
}
