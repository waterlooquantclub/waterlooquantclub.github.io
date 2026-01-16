import Layout from "@/components/Layout";
import SponsorSection from "@/components/SponsorSection";

const Sponsors = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Sponsors
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">
            Our Partners
          </h1>
        </div>
        <SponsorSection withCta hideTitle />
      </section>
    </Layout>
  );
};

export default Sponsors;
