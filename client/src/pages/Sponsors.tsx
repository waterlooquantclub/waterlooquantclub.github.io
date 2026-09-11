import Layout from "@/components/Layout";
import SponsorSection, { SPONSOR_VARIANTS } from "@/components/SponsorSection";

/** Review mode: /sponsors?variants stacks both treatments for comparison.
 *  Remove this block once one is picked. */
const inVariantsMode = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("variants");

const Sponsors = () => {
  const compare = inVariantsMode();

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Sponsors</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">Our Partners</h1>
        </div>

        {compare ? (
          <div className="flex flex-col gap-20">
            {SPONSOR_VARIANTS.map(({ id, label, note }) => (
              <div key={id}>
                <div className="container mx-auto max-w-3xl mb-6">
                  <p className="text-xs uppercase tracking-widest text-[#0DBAFF]">{label}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
                <SponsorSection hideTitle variant={id} />
              </div>
            ))}
          </div>
        ) : (
          <SponsorSection withCta hideTitle />
        )}
      </section>
    </Layout>
  );
};

export default Sponsors;
