import Layout from "@/components/Layout";
import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.webp";

const Sponsors = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Sponsors</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">Our Partners</h1>

          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <p>We're grateful for the sponsors who make our events and initiatives possible.</p>
          </div>

          <div className="mt-16 pt-6">
            <h2 className="text-2xl font-semibold mb-8">Diamond</h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <a
                href="https://www.janestreet.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 sm:max-w-[45%]"
              >
                <img
                  src={JaneStreetLogo}
                  alt="Jane Street"
                  className="w-full h-auto invert hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://www.hudsonrivertrading.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 sm:max-w-[45%]"
              >
                <img
                  src={HrtLogo}
                  alt="Hudson River Trading"
                  className="w-full h-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <h2 className="text-2xl font-semibold mb-8 pt-12">Gold</h2>
            <div className="flex flex-wrap items-center justify-center gap-12">
              <a
                href="https://www.citadelsecurities.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-2/3 sm:flex-1 sm:max-w-[30%]"
              >
                <img
                  src={CitadelLogo}
                  alt="Citadel Securities"
                  className="w-full h-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>

          <div className="mt-16 pt-6">
            <h2 className="text-2xl font-semibold mb-8">Become a Sponsor</h2>
            <p className="text-muted-foreground">
              Interested in sponsoring the Waterloo Quant Club?{" "}
              <a
                href="mailto:sponsors@waterlooquantclub.com"
                className="underline hover:text-foreground transition-colors"
              >
                Get in touch with us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
