"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { calculateDrainage, type DrainageMode } from "@/lib/drainage";
import type { Dictionary, Locale } from "@/lib/i18n";
const Preview = dynamic(() => import("./drainage-preview"), { ssr: false });
class PreviewBoundary extends Component<{ children: ReactNode; fallback: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="status">{this.props.fallback}</p> : this.props.children; }
}
export function DrainageCalculator({ d, locale }: { d: Dictionary; locale: Locale }) {
  const [length, setLength] = useState("10");
  const [inlet, setInlet] = useState("100");
  const [mode, setMode] = useState<DrainageMode>("slope");
  const [value, setValue] = useState("2");
  const [yaw, setYaw] = useState(0.35);
  const [tilt, setTilt] = useState(0.25);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!query.matches);
    const change = () => setPlaying(!query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  let result: ReturnType<typeof calculateDrainage> | undefined;
  try {
    if ([length, inlet, value].some(v => !v.trim())) throw new Error();
    result = calculateDrainage(Number(length), Number(inlet), mode, Number(value));
  } catch { /* Invalid input leaves the form editable and hides the preview. */ }
  const format = (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 4 }).format(n);
  const input = (id: string, label: string, val: string, set: (v: string) => void, min: number, max: number) => (
    <label htmlFor={id}>{label}<input id={id} type="number" inputMode="decimal" step="any" min={min} max={max} value={val} onChange={e => set(e.target.value)} /></label>
  );
  function changeMode(next: DrainageMode) {
    if (result) setValue(String(next === "slope" ? result.slope : next === "drop" ? result.drop : result.outlet));
    else setValue(next === "elevations" ? "99.8" : next === "drop" ? "0.2" : "2");
    setMode(next);
  }
  return <div className="calculator drainage-calculator">
    <div className="calculator-fields">
      <label htmlFor="drainage-mode">{d.drainageMode}<select id="drainage-mode" value={mode} onChange={e => changeMode(e.target.value as DrainageMode)}>
        <option value="slope">{d.fromSlope}</option><option value="drop">{d.drop}</option><option value="elevations">{d.fromElevations}</option>
      </select></label>
      {input("drainage-length", d.length, length, setLength, 0.01, 10000)}
      {input("drainage-inlet", d.inlet, inlet, setInlet, -10000, 10000)}
      {input("drainage-value", mode === "slope" ? d.slope : mode === "drop" ? d.drop : d.outlet, value, setValue, mode === "slope" ? -100 : -10000, mode === "slope" ? 100 : 10000)}
    </div>
    <output className="calculator-result" aria-live="polite">
      {result ? <>{[[d.slope, result.slope, "%"], [d.drop, result.drop, "m"], [d.inlet, result.inlet, "m"], [d.outlet, result.outlet, "m"]].map(([label, n, unit]) => <span key={String(label)}>{label}: <strong>{format(Number(n))} {unit}</strong></span>)}</> : <span>{d.drainageInvalid}</span>}
    </output>
    <p className="calculator-note">{d.drainageNote}</p>
    {result && <>
      {result.slope <= 0 && <p role="status">{result.slope === 0 ? d.flatDrainage : d.reverseDrainage}</p>}
      <h2>{d.preview}</h2>
      <div className="drainage-controls">
        <label htmlFor="drainage-yaw">{d.rotate}<input id="drainage-yaw" type="range" min={-3.14} max={3.14} step={0.01} value={yaw} onChange={e => setYaw(Number(e.target.value))}/></label>
        <label htmlFor="drainage-tilt">{d.tilt}<input id="drainage-tilt" type="range" min={-0.3} max={1} step={0.01} value={tilt} onChange={e => setTilt(Number(e.target.value))}/></label>
        <button type="button" className="button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? d.pauseWater : d.animateWater}</button>
      </div>
      <PreviewBoundary fallback={d.noWebGL}><Preview slope={result.slope} yaw={yaw} tilt={tilt} playing={playing} fallback={d.noWebGL} label={d.preview}/></PreviewBoundary>
      <p className="calculator-note">{d.previewNote}</p>
    </>}
  </div>;
}
