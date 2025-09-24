import { useState } from "react";
import { PixelatedCanvas } from "../components/pixel-canvas";

function Hero() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

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
          tintStrength={0}
        />
      </div>
    </>
  );
}

export default Hero;
