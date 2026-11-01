import type { MetadataRoute } from "next";
import { SITE_URL, INDEXABLE } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: INDEXABLE ? "/" : undefined,
      disallow: INDEXABLE ? undefined : ["/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
