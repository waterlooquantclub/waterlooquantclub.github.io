import Section from "../components/section";
import { Text } from "../components/text";

function About() {
  return (
    <Section id="about" title="About Us">
      <div className="rounded-xl max-w-sm sm:max-w-3xl w-[85vw] mx-auto bg-black/60 backdrop-blur-2xl py-40 px-16 relative">
        <Text size="xl" className="text-center leading-10">
          Want to get into quant trading? Hear from students with real
          experience, participate in games and competitions sponsored by top
          quant firms, and connect with peers passionate about finance. Join
          Waterloo Quant Club today!
        </Text>
      </div>
    </Section>
  );
}

export default About;
