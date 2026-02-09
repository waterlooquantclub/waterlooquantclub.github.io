import { useEffect, useRef } from "react";

/* ── Shaders ────────────────────────────────────────────── */

const VERTEX_SRC = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform vec3  uColor;

const int   MAX_CLICKS = 10;
uniform vec2  uClickPos[MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

const int   MAX_TRAIL = 20;
uniform vec2  uTrailPos[MAX_TRAIL];
uniform float uTrailTimes[MAX_TRAIL];

out vec4 fragColor;

/* ── Bayer matrix helpers ─────────────────────────────── */
float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define Bayer4(a) (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))

/* ── Noise / fBm ──────────────────────────────────────── */
#define FBM_OCTAVES    3
#define FBM_LACUNARITY 1.25
#define FBM_GAIN       1.0
#define FBM_SCALE      4.0

float hash11(float n) { return fract(sin(n) * 43758.5453); }

float vnoise(vec3 p) {
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0,0,0), vec3(1,57,113)));
  float n100 = hash11(dot(ip + vec3(1,0,0), vec3(1,57,113)));
  float n010 = hash11(dot(ip + vec3(0,1,0), vec3(1,57,113)));
  float n110 = hash11(dot(ip + vec3(1,1,0), vec3(1,57,113)));
  float n001 = hash11(dot(ip + vec3(0,0,1), vec3(1,57,113)));
  float n101 = hash11(dot(ip + vec3(1,0,1), vec3(1,57,113)));
  float n011 = hash11(dot(ip + vec3(0,1,1), vec3(1,57,113)));
  float n111 = hash11(dot(ip + vec3(1,1,1), vec3(1,57,113)));
  vec3 w = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t) {
  vec3  p    = vec3(uv * FBM_SCALE, t);
  float amp  = 1.0;
  float freq = 1.0;
  float sum  = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i) {
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

/* ── Triangle mask ────────────────────────────────────── */
float maskTriangle(vec2 p, vec2 id, float cov) {
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r  = sqrt(cov);
  float d  = p.y - r * (1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d / aa, 0.0, 1.0);
}

/* ── Main ─────────────────────────────────────────────── */
void main() {
  float pixelSize = uPixelSize;
  vec2 fragCoord  = gl_FragCoord.xy - uResolution * 0.5;
  float aspect    = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId    = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv        = cellCoord / uResolution * vec2(aspect, 1.0);

  /* Animated fBm */
  float feed = fbm2(uv, uTime * 0.05);
  feed = feed * 0.5 - 0.65;

  /* Click ripples */
  const float speed     = 0.30;
  const float thickness = 0.10;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  for (int i = 0; i < MAX_CLICKS; ++i) {
    vec2 pos = uClickPos[i];
    if (pos.x < 0.0) continue;
    vec2 cuv = ((pos - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution) * vec2(aspect, 1.0);
    float t = max(uTime - uClickTimes[i], 0.0);
    float r = distance(uv, cuv);
    float waveR = speed * t;
    float ring  = exp(-pow((r - waveR) / thickness, 2.0));
    float atten = exp(-dampT * t) * exp(-dampR * r);
    feed = max(feed, ring * atten);
  }

  /* Pointer trail */
  const float trailSpread = 300.0;
  const float trailDecay  = 2.0;
  for (int i = 0; i < MAX_TRAIL; ++i) {
    vec2 tp = uTrailPos[i];
    if (tp.x < 0.0) continue;
    vec2 tuv = ((tp - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution) * vec2(aspect, 1.0);
    float age = max(uTime - uTrailTimes[i], 0.0);
    float r   = distance(uv, tuv);
    float blob = exp(-r * r * trailSpread);
    float fade = exp(-trailDecay * age);
    feed = max(feed, blob * fade * 0.7);
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw    = step(0.5, feed + bayer);
  float M     = maskTriangle(pixelUV, pixelId, bw);

  fragColor = vec4(uColor, M);
}`;

/* ── Helpers ────────────────────────────────────────────── */

function compileShader(
  gl: WebGL2RenderingContext,
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
  gl: WebGL2RenderingContext,
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

/* ── Component ──────────────────────────────────────────── */

const MAX_CLICKS = 10;
const MAX_TRAIL = 20;
const TRAIL_INTERVAL = 0.08; // seconds between trail samples
const TRAIL_MIN_DIST_SQ = 400; // squared-pixel min distance between samples

// Downriver blue #132C7B → normalized RGB
const DOWNRIVER_R = 0.075;
const DOWNRIVER_G = 0.173;
const DOWNRIVER_B = 0.482;

const BayerTriangles = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }

    /* ── Compile & link ─────────────────────────────────── */
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;
    const program = createProgram(gl, vs, fs);
    if (!program) return;
    gl.useProgram(program);

    /* ── Full-screen quad ────────────────────────────────── */
    const posAttr = gl.getAttribLocation(program, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // prettier-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    /* ── Uniform locations ───────────────────────────────── */
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPixelSize = gl.getUniformLocation(program, "uPixelSize");
    const uColor = gl.getUniformLocation(program, "uColor");

    const uClickPos = gl.getUniformLocation(program, "uClickPos[0]");
    const uClickTimes = gl.getUniformLocation(program, "uClickTimes");
    const uTrailPos = gl.getUniformLocation(program, "uTrailPos[0]");
    const uTrailTimes = gl.getUniformLocation(program, "uTrailTimes");

    /* ── Static uniforms (set once) ─────────────────────── */
    gl.uniform3f(uColor, DOWNRIVER_R, DOWNRIVER_G, DOWNRIVER_B);

    /* ── Click state ─────────────────────────────────────── */
    const clickPosBuf = new Float32Array(MAX_CLICKS * 2).fill(-1);
    const clickTimes = new Float32Array(MAX_CLICKS);
    let clickIx = 0;
    let elapsedTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = getDpr();
      const fx = (e.clientX - rect.left) * dpr;
      const fy = (rect.height - (e.clientY - rect.top)) * dpr;
      clickPosBuf[clickIx * 2] = fx;
      clickPosBuf[clickIx * 2 + 1] = fy;
      clickTimes[clickIx] = elapsedTime;
      clickIx = (clickIx + 1) % MAX_CLICKS;
    };
    canvas.addEventListener("pointerdown", onPointerDown);

    /* ── Sizing (debounced) ──────────────────────────────── */
    let cachedPixelSize = window.innerWidth < 768 ? 27 : 36;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const getDpr = () =>
      window.innerWidth < 768
        ? 1                                        // save pixels on mobile
        : Math.min(window.devicePixelRatio || 1, 2);

    const applyResize = () => {
      const dpr = getDpr();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      cachedPixelSize = window.innerWidth < 768 ? 27 : 36;
    };

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 100);
    };
    window.addEventListener("resize", onResize);
    applyResize();

    /* ── Pointer trail state ─────────────────────────────── */
    const trailPosBuf = new Float32Array(MAX_TRAIL * 2).fill(-1);
    const trailTimeBuf = new Float32Array(MAX_TRAIL);
    let trailIx = 0;
    let lastTrailTime = 0;
    let lastTrailX = -1;
    let lastTrailY = -1;

    const onPointerMove = (e: PointerEvent) => {
      if (elapsedTime - lastTrailTime < TRAIL_INTERVAL) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = getDpr();
      const fx = (e.clientX - rect.left) * dpr;
      const fy = (rect.height - (e.clientY - rect.top)) * dpr;
      const dx = fx - lastTrailX;
      const dy = fy - lastTrailY;
      if (lastTrailX >= 0 && dx * dx + dy * dy < TRAIL_MIN_DIST_SQ) return;
      trailPosBuf[trailIx * 2] = fx;
      trailPosBuf[trailIx * 2 + 1] = fy;
      trailTimeBuf[trailIx] = elapsedTime;
      trailIx = (trailIx + 1) % MAX_TRAIL;
      lastTrailTime = elapsedTime;
      lastTrailX = fx;
      lastTrailY = fy;
    };
    canvas.addEventListener("pointermove", onPointerMove);

    /* ── Visibility / Intersection pausing ────────────────── */
    let visible = true;
    let intersecting = true;
    const shouldAnimate = () => visible && intersecting;

    const onVisChange = () => {
      visible = !document.hidden;
      if (shouldAnimate() && !animationRef.current) {
        prev = performance.now();
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        if (shouldAnimate() && !animationRef.current) {
          prev = performance.now();
          animationRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    /* ── Render ──────────────────────────────────────────── */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let prev = performance.now();
    const draw = (now: number) => {
      animationRef.current = 0;
      if (!shouldAnimate()) return;

      const dt = (now - prev) / 1000;
      prev = now;
      elapsedTime += dt;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsedTime);
      gl.uniform1f(uPixelSize, cachedPixelSize);

      gl.uniform2fv(uClickPos, clickPosBuf);
      gl.uniform1fv(uClickTimes, clickTimes);
      gl.uniform2fv(uTrailPos, trailPosBuf);
      gl.uniform1fv(uTrailTimes, trailTimeBuf);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);

    /* ── Cleanup ─────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisChange);
      observer.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};

export default BayerTriangles;
