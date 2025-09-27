import { Text } from "../components/text";
import { useState } from "react";
import { Button } from "../components/button";
import type { FormEvent } from "react";

function Competition() {
  const [email, setEmail] = useState("")
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
  }
  return (
    <div
      className="w-[100vw] h-[100vh] flex-col text-white flex items-center justify-center"
      id="competition"
    >
      <Text font="lato" className="font-bold sm:text-[36px] text-[28px] mb-8">
        Competition
      </Text>
      <div className="w-[80vw] sm:h-[60vh] bg-gradient-to-b from-black/80 to-[#603067D9] backdrop-blur-sm h-auto py-16 rounded-3xl border-[#818181] border flex flex-col items-center justify-center px-4">
        <Text font="inter" className="sm:text-[18px] text-center sm:mb-4 mb-2">
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
    </div>
  );
}

export default Competition;
