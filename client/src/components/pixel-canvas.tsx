import React, { useRef, useEffect, useCallback } from "react";

type PixelatedCanvasProps = {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "square";
  backgroundColor?: string;
  className?: string;
  responsive?: boolean;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "repel";
  followSpeed?: number;
  tintColor?: string;
  tintStrength?: number;
  maxFps?: number;
  jitterStrength?: number;
  jitterSpeed?: number;
  fadeSpeed?: number;
  objectFit?: "cover" | "contain";
};

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_instance_position;
  attribute vec4 a_instance_color;
  attribute float a_instance_seed;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_dot_size;
  uniform float u_distortion_strength;
  uniform float u_distortion_radius;
  uniform float u_jitter_strength;
  uniform float u_activity;

  varying vec4 v_color;

  void main() {
    vec2 final_pos = a_instance_position;
    vec2 diff = final_pos - u_mouse;
    float dist2 = dot(diff, diff);
    float radius2 = u_distortion_radius * u_distortion_radius;
    float influence = exp(-dist2 / (radius2 * 0.5)) * u_activity;

    if (influence > 0.001) {
      float dist = sqrt(dist2);
      vec2 norm_diff = diff / dist;
      final_pos += norm_diff * u_distortion_strength * influence * 20.0;

      float jitter_x = sin(u_time + a_instance_seed * 10.0) * u_jitter_strength * influence;
      float jitter_y = cos(u_time + a_instance_seed * 11.3) * u_jitter_strength * influence;
      final_pos += vec2(jitter_x, jitter_y);
    }

    vec2 pos = a_position * u_dot_size + final_pos;
    vec2 zero_to_one = pos / u_resolution;
    vec2 zero_to_two = zero_to_one * 2.0;
    vec2 clip_space = zero_to_two - 1.0;

    gl_Position = vec4(clip_space * vec2(1, -1), 0, 1);
    v_color = a_instance_color;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_color;
  uniform vec4 u_tint_color;
  uniform float u_tint_strength;

  void main() {
    vec3 mixed_color = mix(v_color.rgb, u_tint_color.rgb, u_tint_strength);
    gl_FragColor = vec4(mixed_color, v_color.a);
  }
`;

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking program:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const parseColor = (color: string): [number, number, number, number] => {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1.0;
    return [r, g, b, a];
  }
  const match = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (match) {
    return [
      parseInt(match[1]) / 255,
      parseInt(match[2]) / 255,
      parseInt(match[3]) / 255,
      match[4] ? parseFloat(match[4]) : 1.0,
    ];
  }
  return [0, 0, 0, 1];
};

export const PixelatedCanvas: React.FC<PixelatedCanvasProps> = ({
  src,
  width,
  height,
  cellSize = 5,
  dotScale = 0.8,
  backgroundColor = "#000000",
  className,
  responsive = true,
  interactive = true,
  distortionStrength = 1,
  distortionRadius = 220,
  followSpeed = 0.2,
  tintColor = "#230c24ff",
  tintStrength = 0.05,
  maxFps = 50,
  jitterStrength = 9,
  jitterSpeed = 2,
  fadeSpeed = 0.01,
  objectFit = "cover",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webglObjectsRef = useRef<any>({});
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const isInitializedRef = useRef(false);
  const resizeTimeoutRef = useRef<number | null>(null);

  const targetMouseRef = useRef({ x: -9999, y: -9999 });
  const animMouseRef = useRef({ x: -9999, y: -9999 });
  const activityRef = useRef(0);
  const activityTargetRef = useRef(0);

  const animate = useCallback(
    (time: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isInitializedRef.current) return;

      const now = performance.now();
      const minFrameTime = 1000 / maxFps;
      if (now - lastFrameTimeRef.current < minFrameTime) return;
      lastFrameTimeRef.current = now;

      const { gl, locations, program, ext, instanceCount } =
        webglObjectsRef.current;
      if (!gl || !program || !ext) return;

      animMouseRef.current.x +=
        (targetMouseRef.current.x - animMouseRef.current.x) * followSpeed;
      animMouseRef.current.y +=
        (targetMouseRef.current.y - animMouseRef.current.y) * followSpeed;
      activityRef.current +=
        (activityTargetRef.current - activityRef.current) * fadeSpeed;

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      const [br, bg, bb, ba] = parseColor(backgroundColor);
      gl.clearColor(br, bg, bb, ba);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniform2f(
        locations.u_resolution,
        gl.canvas.width / (window.devicePixelRatio || 1),
        gl.canvas.height / (window.devicePixelRatio || 1)
      );
      gl.uniform2f(
        locations.u_mouse,
        animMouseRef.current.x,
        animMouseRef.current.y
      );
      gl.uniform1f(locations.u_time, time * 0.001 * jitterSpeed);
      gl.uniform1f(locations.u_dot_size, cellSize * dotScale);
      gl.uniform4fv(locations.u_tint_color, parseColor(tintColor));
      gl.uniform1f(locations.u_tint_strength, tintStrength);
      gl.uniform1f(locations.u_distortion_strength, distortionStrength);
      gl.uniform1f(locations.u_distortion_radius, distortionRadius);
      gl.uniform1f(locations.u_jitter_strength, jitterStrength);
      gl.uniform1f(locations.u_activity, activityRef.current);

      ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, instanceCount);
    },
    [
      backgroundColor,
      cellSize,
      dotScale,
      fadeSpeed,
      followSpeed,
      jitterSpeed,
      jitterStrength,
      maxFps,
      distortionRadius,
      distortionStrength,
      tintColor,
      tintStrength,
    ]
  );

  const initialize = useCallback(() => {
    isInitializedRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    webglObjectsRef.current = {
      gl,
      program,
      ext: gl.getExtension("ANGLE_instanced_arrays"),
      locations: {
        a_position: gl.getAttribLocation(program, "a_position"),
        a_instance_position: gl.getAttribLocation(
          program,
          "a_instance_position"
        ),
        a_instance_color: gl.getAttribLocation(program, "a_instance_color"),
        a_instance_seed: gl.getAttribLocation(program, "a_instance_seed"),
        u_resolution: gl.getUniformLocation(program, "u_resolution"),
        u_mouse: gl.getUniformLocation(program, "u_mouse"),
        u_time: gl.getUniformLocation(program, "u_time"),
        u_dot_size: gl.getUniformLocation(program, "u_dot_size"),
        u_tint_color: gl.getUniformLocation(program, "u_tint_color"),
        u_tint_strength: gl.getUniformLocation(program, "u_tint_strength"),
        u_distortion_strength: gl.getUniformLocation(
          program,
          "u_distortion_strength"
        ),
        u_distortion_radius: gl.getUniformLocation(
          program,
          "u_distortion_radius"
        ),
        u_jitter_strength: gl.getUniformLocation(program, "u_jitter_strength"),
        u_activity: gl.getUniformLocation(program, "u_activity"),
      },
    };

    if (!webglObjectsRef.current.ext) {
      console.error("ANGLE_instanced_arrays extension not supported");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = displayWidth;
      tempCanvas.height = displayHeight;
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) return;

      let dw = displayWidth,
        dh = displayHeight,
        dx = 0,
        dy = 0;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;
      if (objectFit === "cover") {
        if (imgRatio > canvasRatio) {
          dh = displayHeight;
          dw = dh * imgRatio;
          dx = (displayWidth - dw) / 2;
        } else {
          dw = displayWidth;
          dh = dw / imgRatio;
          dy = (displayHeight - dh) / 2;
        }
      } else if (objectFit === "contain") {
        if (imgRatio > canvasRatio) {
          dw = displayWidth;
          dh = dw / imgRatio;
          dy = (displayHeight - dh) / 2;
        } else {
          dh = displayHeight;
          dw = dh * imgRatio;
          dx = (displayWidth - dw) / 2;
        }
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      const imageData = ctx.getImageData(
        0,
        0,
        displayWidth,
        displayHeight
      ).data;

      const positions: number[] = [],
        colors: number[] = [],
        seeds: number[] = [];
      for (let y = 0; y < displayHeight; y += cellSize) {
        for (let x = 0; x < displayWidth; x += cellSize) {
          const cx = Math.min(displayWidth - 1, x + Math.floor(cellSize / 2));
          const cy = Math.min(displayHeight - 1, y + Math.floor(cellSize / 2));
          const i = (cy * displayWidth + cx) * 4;
          const a = imageData[i + 3] / 255;
          if (a > 0.01) {
            positions.push(cx, cy);
            colors.push(
              imageData[i] / 255,
              imageData[i + 1] / 255,
              imageData[i + 2] / 255,
              a
            );
            seeds.push(Math.random());
          }
        }
      }

      webglObjectsRef.current.instanceCount = positions.length / 2;
      const { locations, ext } = webglObjectsRef.current;

      const squareVertices = new Float32Array([
        -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5,
      ]);
      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, squareVertices, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(locations.a_position);
      gl.vertexAttribPointer(locations.a_position, 2, gl.FLOAT, false, 0, 0);

      const setupInstancedBuffer = (
        location: number,
        dataArray: Float32Array,
        size: number
      ) => {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, dataArray, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
        ext.vertexAttribDivisorANGLE(location, 1);
      };

      setupInstancedBuffer(
        locations.a_instance_position,
        new Float32Array(positions),
        2
      );
      setupInstancedBuffer(
        locations.a_instance_color,
        new Float32Array(colors),
        4
      );
      setupInstancedBuffer(
        locations.a_instance_seed,
        new Float32Array(seeds),
        1
      );

      isInitializedRef.current = true;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
  }, [src, width, height, objectFit, cellSize]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initialize();

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
    };
    const onPointerEnter = () => {
      activityTargetRef.current = 1;
    };
    const onPointerLeave = () => {
      activityTargetRef.current = 0;
    };

    if (interactive) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerenter", onPointerEnter);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    let resizeObserver: ResizeObserver;
    if (responsive) {
      const debouncedInitialize = () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(() => {
          initialize();
        }, 150);
      };

      resizeObserver = new ResizeObserver(debouncedInitialize);
      resizeObserver.observe(canvas);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (interactive) {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerenter", onPointerEnter);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      }
      if (responsive && resizeObserver) resizeObserver.disconnect();
    };
  }, [initialize, responsive, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Pixelated rendering of source image"
      role="img"
    />
  );
};
