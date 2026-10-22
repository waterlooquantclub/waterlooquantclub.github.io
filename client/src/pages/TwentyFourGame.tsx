import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Menu } from "@/components/game24/Menu";
import { Game } from "@/components/game24/Game";
import { Summary } from "@/components/game24/Summary";
import { HowToPlay } from "@/components/game24/HowToPlay";
import { Dealer, dailyPuzzle, poolFor, seededRng, type Difficulty, type RankedPuzzle } from "@/lib/game24/puzzles";
import { done, finalScore, nextPuzzle, skip, startSession, tick, withBoard, type Mode, type Session } from "@/lib/game24/session";
import type { Board } from "@/lib/game24/board";
import "@/components/game24/game24.css";
import { getShowSolutions, setShowSolutions, submitScore } from "@/lib/game24/storage";

/**
 * Route /games/24. A solo make-24 game after 4nums.com; all logic is in
 * lib/game24, so nothing here talks to a server.
 *
 * `?seed=N` makes the deal deterministic. Used by tests; harmless for players.
 */
function rngFromUrl() {
  const seed = new URLSearchParams(location.search).get("seed");
  return seed ? seededRng(Number(seed)) : Math.random;
}

/** `?deal=3,3,8,8` forces the first puzzle. Same audience as `?seed`. */
function dealFromUrl(): RankedPuzzle | null {
  const raw = new URLSearchParams(location.search).get("deal");
  const n = raw?.split(",").map(Number);
  if (!n || n.length !== 4 || n.some((x) => !Number.isInteger(x) || x < 1 || x > 13)) return null;
  return { n: n as RankedPuzzle["n"], amt: 0, rate: 0 };
}

export default function TwentyFourGame() {
  const [session, setSession] = useState<Session | null>(null);
  const [daily, setDaily] = useState(false);
  const [help, setHelp] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const [showSolutions, setShowSolutionsState] = useState(getShowSolutions);
  const dealer = useRef<Dealer | null>(null);
  const rng = useRef(rngFromUrl());
  const forced = useRef(dealFromUrl());
  const lastTick = useRef<number | null>(null);

  // Settle time before every action as well as each display update. Capture
  // elapsed time outside the state updater so the updater stays pure.
  const updateSession = useCallback((action: (s: Session) => Session) => {
    const now = performance.now();
    const dt = lastTick.current === null ? 0 : now - lastTick.current;
    if (lastTick.current !== null) lastTick.current = now;
    setSession((s) => (s ? action(tick(s, dt)) : s));
  }, []);

  const start = useCallback((mode: Mode, difficulty: Difficulty) => {
    dealer.current = new Dealer(poolFor(difficulty), rng.current);
    setDaily(false);
    setNewBest(false);
    setSession(startSession(mode, difficulty, forced.current ?? dealer.current.next()));
    forced.current = null;
  }, []);

  const startDaily = useCallback(() => {
    dealer.current = null;
    setDaily(true);
    setNewBest(false);
    setSession(startSession("zen", "all", dailyPuzzle()));
  }, []);

  // Active-time clock. Measures real elapsed time rather than counting
  // intervals, so a throttled background tab cannot slow the clock down.
  const phase = session?.phase;
  useEffect(() => {
    if (phase !== "playing") return;
    lastTick.current = performance.now();
    const id = setInterval(() => updateSession((s) => s), 100);
    return () => {
      clearInterval(id);
      lastTick.current = null;
    };
  }, [phase, updateSession]);

  // New screen (menu, game, summary): start at the top, not wherever the
  // last click left the scroll position.
  const screen = !session ? "menu" : session.phase === "over" ? "over" : "game";
  // Braces matter: newer Chromium returns a Promise from scrollTo, and React
  // would try to call it as the cleanup function.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  // Record a personal best once, when a game ends.
  const over = session?.phase === "over";
  useEffect(() => {
    if (!over || !session || daily) return;
    setNewBest(submitScore(session.mode, session.difficulty, finalScore(session), session.solved));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  const onBoard = useCallback((b: Board) => updateSession((s) => withBoard(s, b)), [updateSession]);
  const onSkip = useCallback(() => updateSession(skip), [updateSession]);
  const onDone = useCallback(() => updateSession(done), [updateSession]);
  const onNext = useCallback(() => {
    if (daily) {
      setSession(null);
      return;
    }
    setSession((s) => (s && dealer.current ? nextPuzzle(s, dealer.current.next()) : s));
  }, [daily]);
  const home = useCallback(() => setSession(null), []);
  const toggleSolutions = useCallback((v: boolean) => {
    setShowSolutions(v);
    setShowSolutionsState(v);
  }, []);

  return (
    <Layout>
      <div className="px-5 sm:px-6 pt-10 sm:pt-16 pb-8">
      {!session && <Menu onStart={start} onDaily={startDaily} onHelp={() => setHelp(true)} />}
      {session && session.phase !== "over" && (
        <Game
          session={session}
          daily={daily}
          showSolutions={showSolutions}
          onToggleSolutions={toggleSolutions}
          onBoard={onBoard}
          onSkip={onSkip}
          onDone={onDone}
          onNext={onNext}
          onQuit={home}
          onHelp={() => setHelp(true)}
          inputLocked={help}
        />
      )}
      {session && session.phase === "over" && (
        <Summary session={session} newBest={newBest} onAgain={() => start(session.mode, session.difficulty)} onMenu={home} />
      )}
      </div>
      <HowToPlay open={help} onClose={() => setHelp(false)} />
    </Layout>
  );
}
