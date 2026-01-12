import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_normal;
  attribute float a_lineIndex;
  attribute float a_isVertical;
  attribute float a_opacity;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_lineWidth;

  varying float v_opacity;

  void main() {
    float x = a_position.x;
    float y = a_position.y;

    float normalizedX = x / 600.0;
    float normalizedY = y / 1000.0;

    float waveX = 0.0;
    float waveY = 0.0;
    float lineFade = 1.0;

    if (a_isVertical < 0.5) {
      // Horizontal line wave
      float normalizedRow = a_lineIndex / 19.0;
      float mainCurve = pow(normalizedX - 0.5, 2.0) * 200.0;
      float wave = sin(normalizedX * 6.28318 + u_time) * 80.0;
      float skew = normalizedX * normalizedRow * 100.0;
      float secondaryWave = cos(normalizedX * 3.76991 + u_time * 0.7) * 90.0;
      float ripple = sin(normalizedX * 9.42478 + normalizedRow * 6.28318 + u_time * 1.5) * 8.0;
      waveY = mainCurve + wave + skew + secondaryWave + ripple;
    } else {
      // Vertical line wave
      float rowProgress = (y + 800.0) / 2100.0;
      float normalizedBaseX = x / 600.0;
      float mainCurve = pow(normalizedBaseX - 0.5, 2.0) * 200.0;
      float wave = sin(normalizedBaseX * 6.28318 + u_time) * 80.0;
      float skew = normalizedBaseX * rowProgress * 100.0;
      float secondaryWave = cos(normalizedBaseX * 3.76991 + u_time * 0.7) * 90.0;
      float ripple = sin(normalizedBaseX * 9.42478 + rowProgress * 6.28318 + u_time * 1.5) * 8.0;
      waveY = mainCurve + wave + skew + secondaryWave + ripple;
      waveX = sin(rowProgress * 6.28318 + u_time * 0.5) * 25.0;
      lineFade = smoothstep(0.0, 0.12, rowProgress) * (1.0 - smoothstep(0.88, 1.0, rowProgress));
    }

    x += waveX;
    y += waveY;

    // Offset by normal for line thickness (aspect-ratio corrected)
    float aspectRatio = u_resolution.x / u_resolution.y;
    x += a_normal.x * u_lineWidth * 0.5;
    y += a_normal.y * u_lineWidth * 0.5 / (aspectRatio * aspectRatio);

    // Apply fade masks
    float fadeV = smoothstep(-0.4, 0.05, normalizedY) * (1.0 - smoothstep(0.95, 1.4, normalizedY));
    float fadeH = smoothstep(0.0, 0.3, normalizedX);
    v_opacity = a_opacity * fadeV * fadeH * lineFade;

    // Convert to clip space
    vec2 clipSpace = (vec2(x, y) / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  varying float v_opacity;
  uniform vec4 u_color;

  void main() {
    gl_FragColor = vec4(u_color.rgb, u_color.a * v_opacity);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Grid configuration
const GRID_CONFIG = {
  rows: 7,
  cols: 9,
  width: 600,
  height: 1000,
  segments: 60,
  lineWidth: 1.5,
  extraRows: 6, // Buffer rows for wave displacement
} as const;

const WavyGrid = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { rows, cols, width, height, segments, lineWidth, extraRows } =
      GRID_CONFIG;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (displayWidth > 0 && displayHeight > 0) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(canvas);
    setCanvasSize();

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    // Get attribute and uniform locations
    const locations = {
      position: gl.getAttribLocation(program, "a_position"),
      normal: gl.getAttribLocation(program, "a_normal"),
      lineIndex: gl.getAttribLocation(program, "a_lineIndex"),
      isVertical: gl.getAttribLocation(program, "a_isVertical"),
      opacity: gl.getAttribLocation(program, "a_opacity"),
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      color: gl.getUniformLocation(program, "u_color"),
      lineWidth: gl.getUniformLocation(program, "u_lineWidth"),
    };

    // Build geometry
    const positions: number[] = [];
    const normals: number[] = [];
    const lineIndices: number[] = [];
    const isVertical: number[] = [];
    const opacities: number[] = [];
    const indices: number[] = [];
    let vertexOffset = 0;

    const addLineStrip = (
      points: { x: number; y: number }[],
      lineIndex: number,
      isVert: number,
      opacity: number
    ) => {
      const startVertex = vertexOffset;

      for (let i = 0; i < points.length; i++) {
        const curr = points[i];
        const prev = points[Math.max(0, i - 1)];
        const next = points[Math.min(points.length - 1, i + 1)];

        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Two vertices per point (one on each side of the line)
        positions.push(curr.x, curr.y, curr.x, curr.y);
        normals.push(nx, ny, -nx, -ny);
        lineIndices.push(lineIndex, lineIndex);
        isVertical.push(isVert, isVert);
        opacities.push(opacity, opacity);
        vertexOffset += 2;
      }

      // Triangle indices
      for (let i = 0; i < points.length - 1; i++) {
        const v = startVertex + i * 2;
        indices.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
      }
    };

    // Generate horizontal lines
    const rowSpacing = height / rows;
    for (let row = -extraRows; row < rows + extraRows; row++) {
      const baseY = row * rowSpacing;
      const normalizedRow = Math.max(0, Math.min(1, row / rows));
      const opacity = 0.45 + normalizedRow * 0.5;
      const points = Array.from({ length: segments + 1 }, (_, i) => ({
        x: (i / segments) * width,
        y: baseY,
      }));
      addLineStrip(points, row + extraRows, 0, opacity);
    }

    // Generate vertical lines
    for (let col = 0; col < cols; col++) {
      const baseX = (col / cols) * width;
      const opacity = 0.35 + Math.sin((col / cols) * Math.PI) * 0.5;
      const points = Array.from({ length: segments + 1 }, (_, i) => ({
        x: baseX,
        y: -800 + (i / segments) * 2100,
      }));
      addLineStrip(points, col, 1, opacity);
    }

    // Create and configure buffers
    const createBuffer = (data: number[], location: number, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
      return buffer;
    };

    const positionBuffer = createBuffer(positions, locations.position, 2);
    const normalBuffer = createBuffer(normals, locations.normal, 2);
    const lineIndexBuffer = createBuffer(lineIndices, locations.lineIndex, 1);
    const isVerticalBuffer = createBuffer(isVertical, locations.isVertical, 1);
    const opacityBuffer = createBuffer(opacities, locations.opacity, 1);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );

    // Set static uniforms
    gl.uniform2f(locations.resolution, width, height);
    gl.uniform1f(locations.lineWidth, lineWidth);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const indexCount = indices.length;

    const animate = () => {
      timeRef.current += 0.016;

      // Get line color from CSS
      const style = getComputedStyle(canvas);
      const rgbMatch = style.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        gl.uniform4f(
          locations.color,
          parseInt(rgbMatch[1]) / 255,
          parseInt(rgbMatch[2]) / 255,
          parseInt(rgbMatch[3]) / 255,
          1.0
        );
      } else {
        gl.uniform4f(locations.color, 1.0, 1.0, 1.0, 1.0);
      }

      gl.uniform1f(locations.time, timeRef.current);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(normalBuffer);
      gl.deleteBuffer(lineIndexBuffer);
      gl.deleteBuffer(isVerticalBuffer);
      gl.deleteBuffer(opacityBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`text-foreground ${className}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default WavyGrid;
