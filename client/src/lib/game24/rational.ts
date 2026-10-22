/**
 * Exact rational arithmetic. Puzzles like 8 / (3 - 8/3) only work with exact
 * fractions; floating point would leave 23.999999999999996 on the board.
 * Values stay tiny (inputs are 1-13, four of them), so plain numbers are safe.
 */
export interface Rational {
  readonly n: number; // numerator, carries the sign
  readonly d: number; // denominator, always > 0
}

export type Op = "+" | "-" | "*" | "/";
export const OPS: readonly Op[] = ["+", "-", "*", "/"];

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

export function rat(n: number, d = 1): Rational {
  if (d === 0) throw new RangeError("zero denominator");
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  // `+ 0` folds -0 into 0 so equality checks and keys stay simple.
  return { n: n / g + 0, d: d / g };
}

/** Returns null for division by zero. */
export function apply(a: Rational, op: Op, b: Rational): Rational | null {
  switch (op) {
    case "+":
      return rat(a.n * b.d + b.n * a.d, a.d * b.d);
    case "-":
      return rat(a.n * b.d - b.n * a.d, a.d * b.d);
    case "*":
      return rat(a.n * b.n, a.d * b.d);
    case "/":
      return b.n === 0 ? null : rat(a.n * b.d, a.d * b.n);
  }
}

export function eq(a: Rational, b: Rational): boolean {
  return a.n === b.n && a.d === b.d;
}

export function isInt(a: Rational, v: number): boolean {
  return a.d === 1 && a.n === v;
}

export function format(a: Rational): string {
  return a.d === 1 ? String(a.n) : `${a.n}/${a.d}`;
}

export const OP_SYMBOL: Record<Op, string> = { "+": "+", "-": "−", "*": "×", "/": "÷" };
