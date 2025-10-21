import { useEffect, useState } from "react";
import Section from "../components/section";
import { Text } from "../components/text";

function About() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section id="about" title="About Us" titleFont="krona" className="h-auto sm:pt-8 pt-20">
      <div className="max-w-sm sm:max-w-3xl w-[85vw] mx-auto relative h-auto">
        <div className="absolute -top-2 left-[calc(10%-8px)] rounded-[50%] w-80 h-80 blur-2xl bg-[#603474]/50 mix-blend-plus-lighter animate-[bounce_5s_ease-in-out_infinite]" />
        <div className="absolute -top-4 left-1/10 rounded-[50%] w-80 h-80 blur-2xl bg-[#603474]/50 mix-blend-plus-lighter" />
        <div className="absolute top-16 right-1/10 rounded-[50%] w-80 h-80 blur-2xl bg-[#603474]/80 mix-blend-plus-lighter animate-[bounce_6s_ease-in-out_infinite]" />
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="absolute -bottom-12 inset-x-0 rounded-[50%] h-52 blur-2xl bg-[#603474]/100 mix-blend-plus-lighter"
          />
        ))}
        <div className="absolute bottom-[-30vw] left-[calc(-50vw+50%)] w-screen h-[50vw]">
          <div className="absolute inset-0 rounded-t-[50%] blur-[100px] bg-[#603474]/50  animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute inset-x-0 -inset-y-20 overflow-hidden flex">
            {Array.from({ length: Math.ceil(width / 48) }, (_, i) => (
              <div
                key={i}
                className="flex-1 bg-[linear-gradient(to_right,rgba(0,0,0,0.5),rgba(0,0,0,0))]"
              />
            ))}
          </div>
          <div className="absolute -bottom-48 -inset-x-32 h-3/4 rounded-t-[50%] blur-[100px] bg-black" />
        </div>
        <div className="rounded-xl bg-black/60 backdrop-blur-2xl border border-[#818181] py-20 px-8 sm:py-40 sm:px-16">
          <Text size="lg" className="leading-8 sm:text-xl/12 text-center">
            Want to get into quant trading? Hear from students with real
            experience, participate in games and competitions sponsored by top
            quant firms, and connect with peers passionate about finance. Join
            Waterloo Quant Club today!
          </Text>
        </div>
      </div>
    </Section>
  );
}

export default About;
