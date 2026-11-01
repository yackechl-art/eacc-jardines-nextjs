export type DrainageMode = "slope" | "drop" | "elevations";
export function calculateDrainage(length: number, inlet: number, mode: DrainageMode, value: number) {
  if (![length, inlet, value].every(Number.isFinite) || length < 0.01 || length > 10000 || Math.abs(inlet) > 10000)
    throw new RangeError("Invalid dimensions");
  const drop = mode === "slope" ? length * value / 100 : mode === "drop" ? value : inlet - value;
  const slope = drop / length * 100;
  const outlet = inlet - drop;
  if (!Number.isFinite(slope) || Math.abs(slope) > 100 || Math.abs(outlet) > 10000)
    throw new RangeError("Invalid slope or elevation");
  return { length, inlet, outlet, drop, slope };
}
