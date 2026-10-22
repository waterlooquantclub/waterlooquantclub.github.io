import { apply, format, isInt, OPS, rat, type Op, type Rational } from "./rational";

/**
 * Brute-force solver that counts *distinct* solutions the way 4nums.com does
 * (https://www.4nums.com/theory/):
 *
 * Part 1: replace each distinct number with a variable; two expressions are
 * the same solution if they agree for every choice of values. So a×b = b×a,
 * a−(b−c) = a+c−b, and also a×b×c÷c = a×b+c−c. We test that identity by
 * evaluating both as rational functions at random points modulo a large prime
 * (Schwartz–Zippel: distinct functions collide with negligible probability).
 *
 * Part 2: any sub-expression whose actual value is 1 behaves as the constant
 * 1, so x×y = x÷y and x+y×z = (x+y)×z whenever y or z evaluates to 1.
 *
 * The flattened Canon form below is only used to print a solution neatly;
 * among equivalent expressions the shortest printing is kept.
 */

type Canon =
  | { kind: "leaf"; value: Rational; key: string }
  | { kind: "sum"; value: Rational; key: string; pos: Canon[]; neg: Canon[] }
  | { kind: "prod"; value: Rational; key: string; num: Canon[]; den: Canon[] };

const byKey = (a: Canon, b: Canon) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0);

function leaf(v: number): Canon {
  return { kind: "leaf", value: rat(v), key: String(v) };
}

function makeSum(pos: Canon[], neg: Canon[], value: Rational): Canon {
  // x − 0 is the same move as x + 0.
  const zero = neg.filter((t) => t.value.n === 0);
  pos = [...pos, ...zero].sort(byKey);
  neg = neg.filter((t) => t.value.n !== 0).sort(byKey);
  const key = `S(${pos.map((t) => t.key).join(",")}|${neg.map((t) => t.key).join(",")})`;
  return { kind: "sum", value, key, pos, neg };
}

function makeProd(num: Canon[], den: Canon[], value: Rational): Canon {
  // x ÷ 1 is the same move as x × 1.
  const ones = den.filter((t) => isInt(t.value, 1));
  num = [...num, ...ones].sort(byKey);
  den = den.filter((t) => !isInt(t.value, 1)).sort(byKey);
  const key = `P(${num.map((t) => t.key).join(",")}|${den.map((t) => t.key).join(",")})`;
  return { kind: "prod", value, key, num, den };
}

function combine(l: Canon, op: Op, r: Canon, value: Rational): Canon {
  if (op === "+" || op === "-") {
    const lp = l.kind === "sum" ? l.pos : [l];
    const ln = l.kind === "sum" ? l.neg : [];
    const rp = r.kind === "sum" ? r.pos : [r];
    const rn = r.kind === "sum" ? r.neg : [];
    return op === "+" ? makeSum([...lp, ...rp], [...ln, ...rn], value) : makeSum([...lp, ...rn], [...ln, ...rp], value);
  }
  const ln = l.kind === "prod" ? l.num : [l];
  const ld = l.kind === "prod" ? l.den : [];
  const rn = r.kind === "prod" ? r.num : [r];
  const rd = r.kind === "prod" ? r.den : [];
  return op === "*" ? makeProd([...ln, ...rn], [...ld, ...rd], value) : makeProd([...ln, ...rd], [...ld, ...rn], value);
}

// ---------- printing ----------

/** Larger terms first reads more naturally: "8 × 3", "(7 + 5 − 4) × 3". */
const byValueDesc = (a: Canon, b: Canon) => b.value.n * a.value.d - a.value.n * b.value.d;

function render(c: Canon): string {
  switch (c.kind) {
    case "leaf":
      return format(c.value);
    case "sum": {
      const pos = [...c.pos].sort(byValueDesc).map(render);
      const neg = [...c.neg].sort(byValueDesc).map(render);
      return pos.join(" + ") + neg.map((t) => ` − ${t}`).join("");
    }
    case "prod": {
      const wrap = (t: Canon) => (t.kind === "sum" ? `(${render(t)})` : render(t));
      // Parenthesised groups first, then the bare numbers.
      const num = [...c.num].sort((a, b) => (a.kind === "sum" ? 0 : 1) - (b.kind === "sum" ? 0 : 1) || byValueDesc(a, b));
      const den = [...c.den].sort(byValueDesc);
      return num.map(wrap).join(" × ") + den.map((t) => ` ÷ ${wrap(t)}`).join("");
    }
  }
}

// ---------- search ----------

interface Item {
  value: Rational;
  canon: Canon;
  /** Fingerprints: the expression evaluated at two random points mod P. */
  fp: [bigint, bigint];
}

const P = 2147483647n; // 2^31 − 1

function modpow(b: bigint, e: bigint): bigint {
  let r = 1n;
  b %= P;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % P;
    b = (b * b) % P;
    e >>= 1n;
  }
  return r;
}

function fpApply(a: bigint, op: Op, b: bigint): bigint {
  switch (op) {
    case "+":
      return (a + b) % P;
    case "-":
      return (a - b + P) % P;
    case "*":
      return (a * b) % P;
    case "/":
      // b ≡ 0 mod P for a non-zero value is a ~1e-9 accident; treat as 0.
      return (a * modpow(b, P - 2n)) % P;
  }
}

/** Fixed pseudo-random point per number, so keys are stable across calls. */
function fpLeaf(n: number, k: number): bigint {
  let h = (n * 2654435761 + k * 40503 + 12345) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  return BigInt(h % 2147483000) + 2n;
}

function fpOf(op: Op, a: Item, b: Item, value: Rational): [bigint, bigint] {
  // Part 2: anything worth exactly 1 is the constant 1.
  if (isInt(value, 1)) return [1n, 1n];
  return [fpApply(a.fp[0], op, b.fp[0]), fpApply(a.fp[1], op, b.fp[1])];
}

function search(items: Item[], target: number, out: Map<string, string> | null): boolean {
  if (items.length === 1) {
    if (!isInt(items[0].value, target)) return false;
    if (out) {
      const key = `${items[0].fp[0]},${items[0].fp[1]}`;
      const text = render(items[0].canon);
      const prev = out.get(key);
      if (prev === undefined || text.length < prev.length || (text.length === prev.length && text < prev)) out.set(key, text);
    }
    return true;
  }
  let found = false;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i === j) continue;
      const rest = items.filter((_, k) => k !== i && k !== j);
      for (const op of OPS) {
        // + and × are commutative: visiting (i, j) covers (j, i).
        if ((op === "+" || op === "*") && j < i) continue;
        const value = apply(items[i].value, op, items[j].value);
        if (!value) continue;
        // The canonical form is only needed when we are collecting solutions.
        const canon = out ? combine(items[i].canon, op, items[j].canon, value) : items[i].canon;
        const fp = out ? fpOf(op, items[i], items[j], value) : items[i].fp;
        if (search([...rest, { value, canon, fp }], target, out)) {
          found = true;
          if (!out) return true;
        }
      }
    }
  }
  return found;
}

function toItems(nums: readonly number[]): Item[] {
  return nums.map((n) => ({
    value: rat(n),
    canon: leaf(n),
    fp: n === 1 ? [1n, 1n] : [fpLeaf(n, 0), fpLeaf(n, 1)],
  }));
}

export function isSolvable(nums: readonly number[], target = 24): boolean {
  return search(toItems(nums), target, null);
}

/** Every distinct solution, pretty-printed, shortest first. */
export function solve(nums: readonly number[], target = 24): string[] {
  const out = new Map<string, string>();
  search(toItems(nums), target, out);
  return [...out.values()].sort((a, b) => a.length - b.length || (a < b ? -1 : 1));
}

/** In-game points for a puzzle: 10 × (1 + 2 / unique solutions), as on 4nums.com. */
export function puzzlePoints(uniqueSolutions: number): number {
  return Math.round(10 * (1 + 2 / Math.max(1, uniqueSolutions)));
}