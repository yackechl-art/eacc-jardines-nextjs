"use client";
import { createDataAttribute } from "next-sanity";
import { useSite } from "./site-provider";
import { defaultSettings } from "@/lib/i18n";

export function ServiceResult({ src, alt, index }: { src: string; alt: string; index: number }) {
  const { d, locale } = useSite();
  const settings = d.settings || defaultSettings;
  return (
    <span data-sanity={createDataAttribute({id:`siteContent-${locale}`,type:"siteContent",path:`serviceItems[${index}].image`}).toString()} style={{ display: "block", position: "relative", width: "100%" }}>
      <img src={src} alt={alt} loading="lazy"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain" }} />
      {!(d.serviceItems[index]?.logoIncluded ?? (index === 3)) && (
        <img src={settings.logoUrl} alt="" aria-hidden="true"
          style={{ position: "absolute", top: "12px", right: "12px", width: "23%", height: "auto", padding: "4px", background: "white", borderRadius: "3px" }} />
      )}
    </span>
  );
}
