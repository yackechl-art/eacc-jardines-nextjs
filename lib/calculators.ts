export type Shape = "rectangle" | "circle" | "triangle";
function positive(n: number) {
  if (!Number.isFinite(n) || n <= 0 || n > 100000) throw new Error("invalid");
}
export function calculateArea(
  shape: Shape,
  a: number,
  b: number,
  allowance = 0,
) {
  positive(a);
  if (shape !== "circle") positive(b);
  if (!Number.isFinite(allowance) || allowance < 0 || allowance > 100)
    throw new Error("invalid");
  const area =
    shape === "circle"
      ? Math.PI * a * a
      : shape === "triangle"
        ? (a * b) / 2
        : a * b;
  return { area, total: area * (1 + allowance / 100) };
}
export function calculateSpacing(
  length: number,
  width: number,
  spacing: number,
  edge: number,
  grid: boolean,
) {
  positive(length);
  positive(spacing);
  if (grid) positive(width);
  if (!Number.isFinite(edge) || edge < 0 || edge > 100000)
    throw new Error("invalid");
  const count = (n: number) =>
    n < 2 * edge ? 0 : Math.floor((n - 2 * edge) / spacing + 1e-10) + 1;
  const result = count(length) * (grid ? count(width) : 1);
  if (!Number.isSafeInteger(result) || result > 10000000)
    throw new Error("invalid");
  return result;
}
