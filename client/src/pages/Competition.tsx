import { useEffect, useRef } from "react";
import { Text } from "../components/text";
import Section from "../components/section";

function easeOut(t: number): number {
  return 1 - (1 - t) ** 2;
}

function Competition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowImageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeTop = containerRect.top / window.innerHeight;
        const t = easeOut(Math.min(Math.max(1.3 - relativeTop, 0), 1));
        const translationX = t * 0.8 * containerRect.width - 200;
        const transform = `translateX(${translationX}px)`;
        window.requestAnimationFrame(() => {
          if (glowImageRef.current) {
            glowImageRef.current.style.transform = transform;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section
      id="competition"
      title="Competition"
      titleFont="krona"
      className="flex-col flex items-center justify-center relative"
    >
      <div
        ref={containerRef}
        className="relative sm:w-[70vw] w-[85vw] sm:h-[60vh] flex items-center justify-center"
      >
        <img
          ref={glowImageRef}
          src={"/glow.png"}
          className="absolute left-0 h-[550px] sm:h-[700px] -top-[420px] sm:-top-[560px] w-[480px] mix-blend-plus-lighter z-[0] transition-transform duration-75"
        />

        <div className="absolute sm:-top-4 -top-2 sm:-right-4 -right-2 w-[62vw] sm:h-[50vh] h-[250px] bg-[#603474] rounded-3xl blur-2xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />

        <div className="bg-gradient-to-b from-black to-[#603067] backdrop-blur-sm rounded-3xl border border-[#818181] flex flex-col items-center justify-center sm:w-[70vw] w-[85vw] h-auto sm:h-[60vh] z-10 px-8 py-16">
          <Text
            size="lg"
            className="sm:text-[24px] text-center mb-6 font-semibold"
          >
            Thank you to all of the competitors for our Fall 2025 Trading Competition.
          </Text>
          {/* <Text className="sm:text-[18px] text-center mb-2">
            We are excited to hold our inaugural trading competition on November
            22, from 10am to 5pm in DC 1351!
          </Text>
          <Text className="sm:text-[18px] text-center mb-12">
            Join us to test your skills in a fun day of exciting trading games,
            food, merch, and prizes.
          </Text> */}
          <Text className="sm:text-[18px] text-center mb-8">
            Please keep an eye on your inbox for details about our next trading competition!
          </Text>
        </div>
        <img
          src={"/Point.png"}
          className="animate-float2 absolute sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] sm:bottom-[-80px] sm:right-[0px] bottom-[-40px] right-[10px] z-[80]"
        />
        <img
          src={"/Navigation.png"}
          className="animate-float1 absolute sm:w-[250px] sm:h-[250px] w-[130px] h-[130px] sm:bottom-[-100px] sm:left-[-120px] left-[-55px] bottom-[-50px] z-[80]"
        />
        <img
          src={"/Trophy.png"}
          className="animate-float1 absolute sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] sm:bottom-[-10px] sm:right-[-120px] bottom-[10px] right-[-40px] z-[80]"
        />
      </div>
    </Section>
  );
}

export default Competition;
