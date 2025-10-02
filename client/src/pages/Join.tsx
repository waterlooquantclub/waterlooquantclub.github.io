import Section from "../components/section";
import { Button } from "../components/button";
import SponsorshipForm from "../components/sponsorship-form";

function Join() {  
  return (
    <div className="relative">
      <img
        src="/IMG_3818.png"
        alt="Sponsorship background"
        className="absolute -top-36 left-0 h-[116vh] w-auto"
      />

      <img
        src="/IMG_3819.png"
        alt="Sponsorship background"
        className="hidden md:block absolute -top-36 right-0 h-[116vh] w-auto"
      />


      <Section id="join" title="" className="text-white py-16 font-lato">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 px-6">
          
          {/* Left Column */}
          <div className="relative flex flex-col items-center text-center space-y-6 pr-8 md:border-r-2 md:border-white">
            <h2 className="text-4xl font-bold mb-4">Join Us</h2>
            <p className="text-lg mb-16 mt-8">Interested in what we’re doing?</p>
            <a href="https://discord.gg/QwmucS8qBv" target="_blank" rel="noopener noreferrer">
              <Button type="submit">
                Join now
              </Button>
            </a>
            <img
              src="/logo_glow.png"
              alt="Glowing logo"
              className="w-56 h-auto mt-8"
            />
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col items-center space-y-6 w-full">
            <h2 className="text-4xl font-bold mb-4 z-10">Sponsorship</h2>
            <p className="text-lg mb-6 z-10 mt-8">Interested in sponsoring us?</p>

            {/* Sponsorship Form */}
            <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl w-full max-w-lg z-10 mt-8">
              <SponsorshipForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Join;
