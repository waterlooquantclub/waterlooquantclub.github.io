import JaneStreetLogo from "@/assets/jane-street-logo.png";
import HrtLogo from "@/assets/hrt-logo.png";
import CitadelLogo from "@/assets/citadel-logo.png";
const SponsorSection = () => {
    return (
        <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-light mb-12">
                Our Partners
            </h2>
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
            <h2 className="text-2xl font-semibold mb-8 pt-12">Gold</h2>
            <div className="flex flex-wrap items-center justify-center gap-12">
                <a
                    href="https://www.citadel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 sm:max-w-[80%]"
                >
                    <img
                        src={CitadelLogo}
                        alt="Citadel | Citadel Securities"
                        className="w-full h-auto hover:opacity-80 transition-opacity"
                    />
                </a>
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
    )
}

export default SponsorSection;