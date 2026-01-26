import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
import PolymarketLogo from "@/assets/polymarket-logo-white.png";
const SponsorSection = ({ withCta, hideTitle }: { withCta?: boolean; hideTitle?: boolean }) => {
  return (
    <div className="container mx-auto max-w-3xl">
      {!hideTitle && <h2 className="text-3xl md:text-4xl font-light mb-12">Our Partners</h2>}

      {/* Diamond card */}
      <div className="border p-6 md:p-8 bg-black/70 border-[#0DBAFF]/40">
        <h2 className="text-2xl font-semibold mb-8">Diamond</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <a
            href="https://www.janestreet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/3 sm:flex-1 sm:max-w-[45%]"
          >
            <img
              src={JaneStreetLogo}
              alt="Jane Street"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://www.hudsonrivertrading.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/3 sm:flex-1 sm:max-w-[45%]"
          >
            <img
              src={HrtLogo}
              alt="Hudson River Trading"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>

      {/* Gold card */}
      <div className="border p-6 md:p-8 mt-6 bg-black/70 border-[#f7c75e]/40">
        <h2 className="text-2xl font-semibold mb-8">Gold</h2>
        <div className="flex flex-col items-center justify-center gap-12">
          <a
            href="https://www.citadel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:max-w-[80%]"
          >
            <img
              src={CitadelLogo}
              alt="Citadel | Citadel Securities"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://polymarket.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:max-w-[55%] md:max-w-[300px]"
          >
            <img
              src={PolymarketLogo}
              alt="Polymarket"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
      {withCta && (
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
      )}
    </div>
  );
};

export default SponsorSection;
