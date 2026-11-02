import type { Metadata } from "next";
import { locales, getDictionary, getContent, type Dictionary, defaultSettings, imageSrc } from "./i18n";
import { pathFor, routeText, breadcrumbs, type Route } from "./routes";
const configured =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.eaccjardines.com";
export const SITE_URL = new URL(configured).origin;
export const INDEXABLE =
  SITE_URL.startsWith("https://") && process.env.VERCEL_ENV !== "preview";
export function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}
export function metadataFor(r: Route, copy?: Dictionary): Metadata {
  const { title, description } = routeText(r, copy),
    path = pathFor(r.locale, r.kind, r.id);
  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} | ${(copy?.settings || defaultSettings).brandName}`,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, absolute(pathFor(l, r.kind, r.id))]),
        ),
        "x-default": absolute(pathFor("es", r.kind, r.id)),
      },
    },
    robots: { index: INDEXABLE, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: absolute(path),
      siteName: (copy?.settings || defaultSettings).brandName,
      locale: {
        es: "es_ES",
        en: "en_GB",
        fr: "fr_FR",
        de: "de_DE",
        pt: "pt_PT",
      }[r.locale],
      alternateLocale: locales
        .filter((l) => l !== r.locale)
        .map(
          (l) =>
            ({
              es: "es_ES",
              en: "en_GB",
              fr: "fr_FR",
              de: "de_DE",
              pt: "pt_PT",
            })[l],
        ),
      images: [{ url: absolute((copy?.settings || defaultSettings).heroImageUrl), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absolute((copy?.settings || defaultSettings).heroImageUrl)],
    },
    icons: { icon: "/assets/logo.png" },
  };
}
export function structuredData(r: Route, copy?: Dictionary) {
  const d = copy || getDictionary(r.locale),
    { title, description } = routeText(r, copy),
    url = absolute(pathFor(r.locale, r.kind, r.id));
  const organization = {
    "@type": "Organization",
    "@id": absolute("/#organization"),
    name: (copy?.settings || defaultSettings).brandName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absolute((copy?.settings || defaultSettings).logoUrl) },
    telephone: "+" + (copy?.settings || defaultSettings).phone,
    areaServed: { "@type": "Country", name: "Spain" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+" + (copy?.settings || defaultSettings).phone,
      contactType: "customer service",
      areaServed: "ES",
    },
  };
  const graph: Record<string, unknown>[] = [
    organization,
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      url: SITE_URL,
      name: (copy?.settings || defaultSettings).brandName,
      publisher: { "@id": organization["@id"] },
      inLanguage: locales,
    },
    {
      "@type":
        r.kind === "projects" || r.kind === "services"
          ? "CollectionPage"
          : "WebPage",
      "@id": url + "#page",
      url,
      name: title,
      description,
      inLanguage: r.locale,
      isPartOf: { "@id": absolute("/#website") },
      about: { "@id": organization["@id"] },
    },
  ];
  if (r.kind !== "home")
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs(r, copy).map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: absolute(item.path),
      })),
    });
  if (r.kind === "home" || r.kind === "services")
    graph.push({
      "@type": "OfferCatalog",
      name: d.services,
      itemListElement: getContent(r.locale, copy).services.map((item, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
          url: absolute(pathFor(r.locale, "service", i)),
          provider: { "@id": organization["@id"] },
          areaServed: { "@type": "Country", name: "Spain" },
        },
      })),
    });
  if (r.kind === "service")
    graph.push({
      "@type": "Service",
      "@id": url + "#service",
      name: title,
      description,
      url,
      serviceType: title,
      provider: { "@id": organization["@id"] },
      areaServed: { "@type": "Country", name: "Spain" },
    });
  if (r.kind === "project") {
    const p = getContent(r.locale, copy).projects[r.id ?? 0];
    graph.push({
      "@type": "ImageObject",
      contentUrl: absolute(imageSrc(p.image)),
      caption: title,
      description,
      creator: { "@id": organization["@id"] },
      inLanguage: r.locale,
    });
  }
  if (r.kind === "projects")
    graph.push({
      "@type": "ItemList",
      itemListElement: getContent(r.locale, copy).projects.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.title,
        url: absolute(pathFor(r.locale, "project", i)),
      })),
    });
  if (r.kind === "area" || r.kind === "spacing" || r.kind === "drainage")
    graph.push({
      "@type": "WebApplication",
      name: title,
      description,
      url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: r.locale,
      isAccessibleForFree: true,
      browserRequirements: "Requires JavaScript",
      publisher: { "@id": organization["@id"] },
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
