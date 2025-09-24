import { useState, useEffect } from "react";
import { PixelatedCanvas } from "../components/pixel-canvas";
import LogoCarousel from "../components/logo-carousel";

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
    <>
      <div className="w-[100vw] h-[100vh] bg-black flex items-center justify-center">
        <PixelatedCanvas
          src="/hero-background.png"
          width={size.w}
          height={size.h}
          cellSize={5}
          dotScale={0.8}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0}
          interactive
          distortionStrength={0.1}
          distortionRadius={200}
          distortionMode="repel"
          followSpeed={0.2}
          jitterStrength={4}
          jitterSpeed={1}
          sampleAverage
          tintColor="#000000"
          tintStrength={0.15}
        />
        <div className="absolute bottom-[30px] w-[80vw]">
          <LogoCarousel />
        </div>
      </div>
    </>
  );
}

export default Hero;
