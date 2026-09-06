import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
import OptiverLogo from "@/assets/optiver-logo-white.png";
import Point72Logo from "@/assets/point72.png";
const SponsorSection = ({ withCta, hideTitle, title }: { withCta?: boolean; hideTitle?: boolean; title?: string }) => {
  return (
    <div className="container mx-auto max-w-3xl">
      {!hideTitle && <h2 className="text-3xl md:text-4xl font-light mb-12">{title || "Our Partners"}</h2>}

      {/* Diamond card */}
      <div className="border p-6 md:p-8 bg-black/70 border-[#0DBAFF]/40">
        <h2 className="text-2xl font-semibold mb-8">Diamond</h2>
        <div className="flex flex-row items-center justify-between gap-8">
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
            href="https://www.citadelsecurities.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/3 sm:flex-1 sm:max-w-[45%]"
          >
            <img
              src={CitadelLogo}
              alt="Citadel Securities"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>

      {/* Gold card */}
      <div className="border p-6 md:p-8 mt-6 bg-black/70 border-[#f7c75e]/40">
        <h2 className="text-2xl font-semibold mb-8">Gold</h2>
        <div className="flex flex-row items-center justify-between gap-6">
          <a
            href="https://www.hudsonrivertrading.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0"
          >
            <img
              src={HrtLogo}
              alt="Hudson River Trading"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://www.optiver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0"
          >
            <img
              src={OptiverLogo}
              alt="Optiver"
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://point72.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0"
          >
            <img
              src={Point72Logo}
              alt="Point72"
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
