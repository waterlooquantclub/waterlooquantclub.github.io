import { useEffect, useRef, useMemo } from "react";

const WavyGrid = ({ className = "" }: { className?: string }) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const rows = 15;
  const cols = 16;
  const width = 600;
  const height = 500;
  const segments = 120;

  // Memoize static grid structure
  const gridConfig = useMemo(() => {
    const horizontal = Array.from({ length: rows }, (_, row) => ({
      type: "h" as const,
      row,
      baseY: (row / rows) * height,
      opacity: 0.45 + (row / rows) * 0.5,
    }));

    const vertical = Array.from({ length: cols }, (_, col) => ({
      type: "v" as const,
      col,
      baseX: (col / cols) * width,
      opacity: 0.35 + Math.sin((col / cols) * Math.PI) * 0.5,
    }));

    return [...horizontal, ...vertical];
  }, []);

  // Calculate wave offset
  const getWaveY = (x: number, row: number, t: number) => {
    const normalizedX = x / width;
    const normalizedRow = row / rows;
    const mainCurve = Math.pow(normalizedX - 0.5, 2) * 200;
    const wave = Math.sin(normalizedX * Math.PI * 2 + t) * 80;
    const depth = Math.sin(normalizedRow * Math.PI) * 180;
    const skew = normalizedX * normalizedRow * 100;
    const secondaryWave = Math.cos(normalizedX * Math.PI * 1.2 + t * 0.7) * 90;
    const ripple = Math.sin(normalizedX * Math.PI * 3 + normalizedRow * Math.PI * 2 + t * 1.5) * 8;
    return mainCurve + wave + skew + secondaryWave + ripple;
  };

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      gridConfig.forEach((config, index) => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;

        let path = "";

        if (config.type === "h") {
          for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * width;
            const y = config.baseY + getWaveY(x, config.row, t);
            path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
          }
        } else {
          const startOffset = -300; // Start lines much higher
          for (let i = 0; i <= segments; i++) {
            const rowProgress = i / segments;
            const baseY = startOffset + rowProgress * (height - startOffset);
            const waveOffset = getWaveY(config.baseX, rowProgress * rows, t);
            const xOffset = Math.sin(rowProgress * Math.PI * 2 + t * 0.5) * 25;
            const x = config.baseX + xOffset;
            const y = baseY + waveOffset;
            path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
          }
        }

        pathEl.setAttribute("d", path);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gridConfig]);

  return (
    <svg viewBox="0 0 500 400" className={`text-foreground ${className}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fadeGradientV" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="20%" stopColor="white" stopOpacity="0.8" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fadeGradientH" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="fadeMaskV">
          <rect x="0" y="0" width="500" height="400" fill="url(#fadeGradientV)" />
        </mask>
        <mask id="fadeMaskH">
          <rect x="0" y="0" width="500" height="400" fill="url(#fadeGradientH)" />
        </mask>
      </defs>
      <g mask="url(#fadeMaskH)">
        <g mask="url(#fadeMaskV)">
          {gridConfig.map((config, index) => (
            <path
              key={config.type === "h" ? `h-${config.row}` : `v-${config.col}`}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              opacity={config.opacity}
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

export default WavyGrid;
