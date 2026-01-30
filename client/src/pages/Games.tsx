import Layout from "@/components/Layout";
import GameCard from "@/components/GameCard";

const Games = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Games</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">Puzzles and Games</h1>

          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <p>Test your skills with our collection of puzzles and games.</p>
          </div>

          <div className="mt-6 space-y-6">
            <GameCard
              title="Renjie Poker"
              description="A solo poker game. Select cards to build a better hand than the dealer!"
              url="/games/renjie-poker/index.html"
            />
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-semibold mb-8">Puzzle of the Week</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-semibold mb-8">Weekly Blotto Tournament</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Games;
