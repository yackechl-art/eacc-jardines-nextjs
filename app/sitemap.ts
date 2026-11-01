import type { MetadataRoute } from "next";
import { allRoutes, pathFor } from "@/lib/routes";
import { locales } from "@/lib/i18n";
import { absolute } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: absolute(pathFor(r.locale, r.kind, r.id)),
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, absolute(pathFor(l, r.kind, r.id))]),
        ),
        "x-default": absolute(pathFor("es", r.kind, r.id)),
      },
    },
  }));
}
