import { useState, useEffect } from "react";
import { PixelatedCanvas } from "../components/pixel-canvas";
import LogoCarousel from "../components/logo-carousel";
import { Text } from "../components/text";
import { Button } from "../components/button";
function Hero() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="inset-0 z-[0] absolute">
        <PixelatedCanvas
          src={size.w < 600 ? "/phone-background.png" : "/hero-background.png"}
          width={size.w}
          height={size.h}
          cellSize={5}
          dotScale={0.8}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0}
          interactive
          responsive={size.w < 600 ? false : true}
          distortionStrength={1}
          distortionRadius={220}
          distortionMode="repel"
          followSpeed={0.2}
          maxFps={50}
          jitterStrength={9}
          jitterSpeed={2}
          sampleAverage
          tintColor="#230c24ff"
          tintStrength={0.05}
          fadeSpeed={0.01}
          className="absolute top-0 left-0 z-[0]"
        />
      </div>
      <div className="relative z-[10] flex flex-col items-center">
        <Text font="krona" className="sm:text-[60px] text-[40px] leading-[1.1] font-bold flex flex-col items-center justify-center mb-8">
          Waterloo <br />
          <span className="text-[#9770D6]">Quant</span>
          Club
        </Text>
        <Button filled={size.w < 600 ? true : false}>Join Now</Button>
      </div>
      <div className="absolute bottom-[50px] w-[80vw]">
        <LogoCarousel />
      </div>
    </div>
  );
}

export default Hero;
