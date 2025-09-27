import { useState, type FormEvent } from "react";
import { Text } from "../components/text";
import { Button } from "../components/button";
import Section from "../components/section";

function Competition() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
  };
  return (
    <Section
      id="competition"
      title="Competition"
      className="flex-col flex items-center justify-center relative"
    >
      <div className="relative sm:w-[70vw] w-[80vw] sm:h-[60vh] flex items-center justify-center">
        <div className="absolute sm:-top-4 -top-2 sm:-right-4 -right-2 w-[62vw] sm:h-[50vh] h-[250px] bg-[#603474] rounded-3xl blur-2xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />

        <div className="bg-gradient-to-b from-black to-[#603067] backdrop-blur-sm rounded-3xl border border-[#818181] flex flex-col items-center justify-center sm:w-[70vw] w-[80vw] h-auto sm:h-[60vh] z-10 px-8 py-16">
          <Text
            font="inter"
            className="sm:text-[18px] text-center sm:mb-4 mb-4"
          >
            Applications for the Fall 2025 competition have not yet opened.
          </Text>
          <Text font="inter" className="sm:text-[18px] sm:mb-12 mb-8">
            Stay tuned for more info.
          </Text>
          <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col items-center justify-center sm:gap-5 gap-4"
          >
            <input
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-white/80 bg-white/20 rounded-full py-2 px-4 sm:w-[250px] w-full focus:outline-none focus:ring-2 focus:ring-[#B670D6]"
            />
            <Button type="submit">Subscribe</Button>
          </form>
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
