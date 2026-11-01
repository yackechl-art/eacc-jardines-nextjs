import { useId } from "react";
// Pixel bounds isolate one completed-work photograph from each original montage.
export const serviceResults = [
  [967, 805, 0, 0, 967, 505, 1],
  [970, 970, 0, 0, 970, 610, 0],
  [703, 934, 0, 0, 703, 495, 1],
  [926, 782, 678, 57, 248, 674, 1],
  [695, 696, 290, 0, 405, 696, 0],
  [965, 965, 416, 0, 549, 965, 0],
  [966, 961, 0, 0, 966, 685, 0],
  [970, 966, 0, 0, 626, 713, 0],
  [1684, 1869, 842, 0, 842, 1790, 1],
  [882, 850, 0, 340, 269, 463, 0],
];

export function ServiceResult({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [width, height, x, y, w, h, addLogo] = serviceResults[index];
  const logoFilter = useId();
  return (
    <svg role="img" aria-label={alt} viewBox={`${x} ${y} ${w} ${h}`}
      style={{ display: "block", width: "100%", height: "100%", maxHeight: "75vh" }}>
      <defs>
        <filter id={logoFilter} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 3 0" />
        </filter>
      </defs>
      <svg x={x} y={y} width={w} height={h} viewBox={`${x} ${y} ${w} ${h}`} overflow="hidden">
      <image href={src} width={width} height={height} />
      {Boolean(addLogo) && (
        <image href="/assets/logo.png" x={x + w * .69} y={y + h * .025}
          width={w * .28} height={w * .28 * 402 / 600} filter={`url(#${logoFilter})`} />
      )}
      </svg>
    </svg>
  );
}
