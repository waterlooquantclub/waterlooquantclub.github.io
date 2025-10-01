import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import { Text } from "../components/text";
import { Button } from "../components/button";
import Section from "../components/section";

function Competition() {
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [email, setEmail] = useState("");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          `Failed to subscribe: ${errorData.error || "Server error"}`
        );
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Section
      id="competition"
      title="Competition"
      className="flex-col flex items-center justify-center relative"
    >
      <div className="relative sm:w-[70vw] w-[85vw] sm:h-[60vh] flex items-center justify-center">
        <img
          src={"/glow.png"}
          style={{
            transform: `translateX(${offset * 0.15}px)`,
          }}
          className="sm:hidden block -left-[370px] h-[550px] -top-[420px]  absolute mix-blend-plus-lighter z-[0] transition-transform duration-75"
        ></img>

        <img
          src={"/glow.png"}
          style={{
            transform: `translateX(${offset * 0.4}px)`,
          }}
          className="hidden sm:block -left-[500px] h-[700px] -top-[560px] absolute mix-blend-plus-lighter z-[0] transition-transform duration-75"
        ></img>

        <div className="absolute sm:-top-4 -top-2 sm:-right-4 -right-2 w-[62vw] sm:h-[50vh] h-[250px] bg-[#603474] rounded-3xl blur-2xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />
        <div className="absolute sm:top-0 top-1 sm:right-0 right-1 w-[62vw] sm:h-[50vh] h-[250px] bg-[#ffa7ff] rounded-3xl blur-xl mix-blend-plus-lighter" />

        <div className="bg-gradient-to-b from-black to-[#603067] backdrop-blur-sm rounded-3xl border border-[#818181] flex flex-col items-center justify-center sm:w-[70vw] w-[85vw] h-auto sm:h-[60vh] z-10 px-8 py-16">
          <Text
            font="inter"
            className="sm:text-[18px] text-center sm:mb-4 mb-4"
          >
            Applications for the Fall 2025 competition have not yet opened.
          </Text>
          <Text font="inter" className="sm:text-[18px] sm:mb-12 mb-8">
            Stay tuned for more info.
          </Text>
          {(error || success) && (
            <Text font="inter" className="text-sm mb-4">
              {error || "Successfully subscribed!"}
            </Text>
          )}
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
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
