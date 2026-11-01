"use client";
import { useState } from "react";
import { calculateArea, calculateSpacing, type Shape } from "@/lib/calculators";
import type { Dictionary, Locale } from "@/lib/i18n";
export function Calculator({
  kind,
  d,
  locale,
}: {
  kind: "area" | "spacing";
  d: Dictionary;
  locale: Locale;
}) {
  const [shape, setShape] = useState<Shape>("rectangle"),
    [grid, setGrid] = useState(true),
    [a, setA] = useState("10"),
    [b, setB] = useState("5"),
    [margin, setMargin] = useState("0"),
    [spacing, setSpacing] = useState("1"),
    [edge, setEdge] = useState("0.5");
  let result: React.ReactNode;
  try {
    if (
      [
        a,
        ...((kind === "area" && shape === "circle") ||
        (kind === "spacing" && !grid)
          ? []
          : [b]),
        ...(kind === "area" ? [margin] : [spacing, edge]),
      ].some((x) => x.trim() === "")
    )
      throw new Error("invalid");
    const f = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
    if (kind === "area") {
      const r = calculateArea(shape, Number(a), Number(b), Number(margin));
      result = (
        <>
          <strong>
            {d.areaResult}: {f.format(r.area)} m²
          </strong>
          <span>
            {d.withMargin}: {f.format(r.total)} m²
          </span>
        </>
      );
    } else
      result = (
        <strong>
          {d.plantResult}:{" "}
          {f.format(
            calculateSpacing(
              Number(a),
              Number(b),
              Number(spacing),
              Number(edge),
              grid,
            ),
          )}
        </strong>
      );
  } catch {
    result = <span>{d.invalid}</span>;
  }
  const field = (
    id: string,
    label: string,
    value: string,
    set: (s: string) => void,
    min = 0.01,
    max = 100000,
  ) => (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step="any"
        value={value}
        onChange={(e) => set(e.target.value)}
        inputMode="decimal"
      />
    </label>
  );
  return (
    <div className="calculator">
      <div className="calculator-fields">
        {kind === "area" ? (
          <label htmlFor="shape">
            {d.shape}
            <select
              id="shape"
              value={shape}
              onChange={(e) => setShape(e.target.value as Shape)}
            >
              <option value="rectangle">{d.rectangle}</option>
              <option value="circle">{d.circle}</option>
              <option value="triangle">{d.triangle}</option>
            </select>
          </label>
        ) : (
          <label htmlFor="mode">
            {d.mode}
            <select
              id="mode"
              value={grid ? "grid" : "line"}
              onChange={(e) => setGrid(e.target.value === "grid")}
            >
              <option value="grid">{d.grid}</option>
              <option value="line">{d.line}</option>
            </select>
          </label>
        )}
        {field(
          "dimension-a",
          kind === "area" && shape === "circle"
            ? d.radius
            : kind === "area" && shape === "triangle"
              ? d.base
              : d.length,
          a,
          setA,
        )}
        {((kind === "area" && shape !== "circle") ||
          (kind === "spacing" && grid)) &&
          field(
            "dimension-b",
            kind === "area" && shape === "triangle" ? d.height : d.width,
            b,
            setB,
          )}
        {kind === "area" ? (
          field("margin", d.margin, margin, setMargin, 0, 100)
        ) : (
          <>
            {field("spacing", d.distance, spacing, setSpacing)}
            {field("edge", d.edge, edge, setEdge, 0)}
          </>
        )}
      </div>
      <output className="calculator-result" aria-live="polite">
        {result}
      </output>
      <p className="calculator-note">
        {kind === "area" ? d.areaNote : d.spacingNote}
      </p>
    </div>
  );
}
