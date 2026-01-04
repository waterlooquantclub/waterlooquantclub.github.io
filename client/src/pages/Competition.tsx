import Layout from "@/components/Layout";
import PokerFlop from "@/components/PokerFlop";

const Competition = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Competition</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">WQC Trading Competition</h1>
          
          <PokerFlop />
          
          <p className="text-muted-foreground text-lg mb-12">
            Stay posted for information regarding our international trading competition...
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Competition;
