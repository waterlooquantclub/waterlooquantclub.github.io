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
          src={size.w < 600 ? "/phone-background.png" : "/hero-background.png"}
          width={size.w}
          height={size.h}
          cellSize={5}
          dotScale={0.8}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0}
          interactive
          responsive={true}
          distortionStrength={1}
          distortionRadius={220}
          distortionMode="repel"
          followSpeed={0.2}
          maxFps={50}
          jitterStrength={8}
          jitterSpeed={2}
          sampleAverage
          tintColor="#230c24ff"
          tintStrength={0.05}
          fadeSpeed={0.01}
        />
        <div className="absolute bottom-[30px] w-[80vw]">
          <LogoCarousel />
        </div>
      </div>
    </>
  );
}

export default Hero;
