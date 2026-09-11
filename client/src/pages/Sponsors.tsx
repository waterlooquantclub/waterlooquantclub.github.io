import { useState, type CSSProperties } from "react";
import Layout from "@/components/Layout";
import SponsorSection, { SPONSOR_VARIANTS, type SponsorVariant } from "@/components/SponsorSection";

/** Review mode: /sponsors?variants renders every layout option stacked, with
 *  live controls on the glass one. Strip this block before merging. */
const inVariantsMode = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("variants");

const CONTROLS = [
  { key: "--glass-tint", label: "Pane tint", min: 0.02, max: 0.6, step: 0.01, init: 0.14 },
  { key: "--glass-blur", label: "Blur", min: 0, max: 40, step: 1, init: 20, unit: "px" },
  { key: "--glass-rim", label: "Rim / specular", min: 0, max: 0.7, step: 0.01, init: 0.32 },
  { key: "--plate-a", label: "Light behind", min: 0.15, max: 1, step: 0.01, init: 0.9 },
  { key: "--bloom", label: "Bloom halo", min: 0, max: 0.5, step: 0.01, init: 0.16 },
  { key: "--lit", label: "Tier glow", min: 0, max: 0.7, step: 0.01, init: 0.3 },
] as const;

const GlassControls = ({
  values,
  onChange,
}: {
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
}) => (
  <div className="container mx-auto max-w-3xl mb-6 border border-border p-4">
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Live controls</p>
    <div className="grid gap-3 sm:grid-cols-2">
      {CONTROLS.map((c) => (
        <label key={c.key} className="flex items-center gap-3 text-sm">
          <span className="w-28 shrink-0 text-muted-foreground">{c.label}</span>
          <input
            type="range"
            min={c.min}
            max={c.max}
            step={c.step}
            value={values[c.key]}
            onChange={(e) => onChange(c.key, Number(e.target.value))}
            className="min-w-0 flex-1 accent-[#0DBAFF]"
          />
          <code className="w-14 shrink-0 text-right text-xs tabular-nums">
            {values[c.key]}
            {"unit" in c ? c.unit : ""}
          </code>
        </label>
      ))}
    </div>
    <p className="mt-3 text-xs text-muted-foreground">
      Lower tint + lower light = more transparent. Read the numbers off and I&apos;ll bake them in.
    </p>
  </div>
);

const Sponsors = () => {
  const compare = inVariantsMode();
  const [glass, setGlass] = useState<Record<string, number>>(
    Object.fromEntries(CONTROLS.map((c) => [c.key, c.init])),
  );

  const glassStyle = Object.fromEntries(
    CONTROLS.map((c) => [c.key, "unit" in c ? `${glass[c.key]}${c.unit}` : String(glass[c.key])]),
  ) as CSSProperties;

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Sponsors</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">Our Partners</h1>
        </div>

        {compare ? (
          <div className="flex flex-col gap-24">
            {SPONSOR_VARIANTS.map(({ id, label, note }) => (
              <div key={id} style={["glass", "bloom", "lit"].includes(id) ? glassStyle : undefined}>
                <div className="container mx-auto max-w-3xl mb-6">
                  <p className="text-xs uppercase tracking-widest text-[#0DBAFF]">{label}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
                {["glass", "bloom", "lit"].includes(id) && (
                  <GlassControls
                    values={glass}
                    onChange={(key, value) => setGlass((g) => ({ ...g, [key]: value }))}
                  />
                )}
                <SponsorSection hideTitle variant={id as SponsorVariant} />
              </div>
            ))}
          </div>
        ) : (
          <SponsorSection withCta hideTitle />
        )}
      </section>
    </Layout>
  );
};

export default Sponsors;
