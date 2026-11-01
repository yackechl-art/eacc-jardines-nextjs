// Tag Manager takes precedence so the same measurement is not loaded twice.
export const TRACKING = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KWWXX8G5",
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-FZF7K4NYXJ",
};
export function trackingMode(gtmId: string, gaId: string) {
  return /^GTM-[A-Z0-9]+$/.test(gtmId)
    ? "gtm"
    : /^G-[A-Z0-9]+$/.test(gaId)
      ? "ga"
      : null;
}
