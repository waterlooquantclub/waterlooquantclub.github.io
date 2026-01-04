import { useEffect, useState, useRef } from "react";
import wqcLogo from "@/assets/wqc-logo.svg";

interface CardData {
  label: string;
  cornerLabel: string;
  dealDelay: number;
  flipDelay: number;
  isMultiLine?: boolean;
  italicCorners?: boolean;
}

interface CardProps extends CardData {
  positionX: number;
  isDealt: boolean;
  isFlipped: boolean;
  spacing: number;
}

const Card = ({ label, cornerLabel, positionX, isDealt, isFlipped, isMultiLine = false, italicCorners = false, spacing }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isDealt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Dramatic tilt based on mouse position (max ~40 degrees)
    const tiltX = (mouseY / rect.height) * -40;
    const tiltY = (mouseX / rect.width) * 40;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="absolute w-16 h-24 sm:w-20 sm:h-32 md:w-36 md:h-56 cursor-pointer"
      style={{ 
        perspective: "1000px",
        transform: isDealt 
          ? `translateX(${positionX}px)` 
          : `translateX(-300px) rotate(-15deg)`,
        opacity: isDealt ? 1 : 0,
        transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tilt wrapper */}
      <div
        className="w-full h-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
          transformStyle: "preserve-3d",
          boxShadow: `${-tilt.y * 0.5}px ${tilt.x * 0.5}px ${20 + Math.abs(tilt.x) + Math.abs(tilt.y)}px rgba(0, 0, 0, ${0.2 + (Math.abs(tilt.x) + Math.abs(tilt.y)) * 0.005})`,
          borderRadius: "0.75rem",
        }}
      >
        {/* Flip wrapper */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
            transition: "transform 0.7s ease-out",
          }}
        >
          {/* Card Back */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-border bg-muted flex items-center justify-center shadow-lg p-4"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <img 
              src={wqcLogo} 
              alt="WQC" 
              className="w-10 sm:w-12 md:w-20 object-contain opacity-80"
            />
          </div>

          {/* Card Front */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-border bg-card flex items-center justify-center shadow-xl px-1"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(-180deg)",
            }}
          >
            {isMultiLine ? (
              <span className="text-sm sm:text-base md:text-2xl font-merriweather font-light text-foreground tracking-tight text-center leading-tight">
                {label}
              </span>
            ) : (
              <span className="text-3xl sm:text-4xl md:text-6xl font-merriweather font-light text-foreground tracking-tight">
                {label}
              </span>
            )}
            {/* Corner indicators */}
            <span className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-[10px] sm:text-xs md:text-sm font-merriweather font-light text-muted-foreground ${italicCorners ? 'italic' : ''}`}>
              {cornerLabel}
            </span>
            <span className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-[10px] sm:text-xs md:text-sm font-merriweather font-light text-muted-foreground rotate-180 ${italicCorners ? 'italic' : ''}`}>
              {cornerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PokerFlop = () => {
  const [dealtCount, setDealtCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  const cards: CardData[] = [
    // Flop cards - flip almost together with slight left-to-right delay
    { label: "W", cornerLabel: "W", dealDelay: 200, flipDelay: 1200, isMultiLine: false },
    { label: "Q", cornerLabel: "Q", dealDelay: 400, flipDelay: 1280, isMultiLine: false },
    { label: "C", cornerLabel: "C", dealDelay: 600, flipDelay: 1360, isMultiLine: false },
    // Turn card
    { label: "Trading", cornerLabel: "T", dealDelay: 2200, flipDelay: 2800, isMultiLine: true },
    // River card
    { label: "Comp.", cornerLabel: "C", dealDelay: 3200, flipDelay: 3800, isMultiLine: true, italicCorners: true },
  ];

  // Responsive spacing
  const spacing = isMobile ? 70 : 130;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    cards.forEach((card, index) => {
      // Deal timer
      timers.push(setTimeout(() => {
        setDealtCount(prev => Math.max(prev, index + 1));
      }, card.dealDelay));

      // Flip timer
      timers.push(setTimeout(() => {
        setFlippedCards(prev => new Set([...prev, index]));
      }, card.flipDelay));
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Calculate positions based on how many cards are dealt
  const getPositionX = (index: number): number => {
    const centerIndex = (dealtCount - 1) / 2;
    const offsetFromCenter = index - centerIndex;
    return offsetFromCenter * spacing;
  };

  return (
    <div className="relative flex items-center justify-center py-12 h-40 sm:h-48 md:h-72">
      {cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          positionX={getPositionX(index)}
          isDealt={index < dealtCount}
          isFlipped={flippedCards.has(index)}
          spacing={spacing}
        />
      ))}
    </div>
  );
};

export default PokerFlop;
