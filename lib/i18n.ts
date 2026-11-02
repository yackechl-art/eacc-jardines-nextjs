import es from "../data/locales/es.json";
import en from "../data/locales/en.json";
import fr from "../data/locales/fr.json";
import de from "../data/locales/de.json";
import pt from "../data/locales/pt.json";
import source from "../data/content.json";
export const locales = ["es", "en", "fr", "de", "pt"] as const;
export type Locale = (typeof locales)[number];
export type SiteSettings = { brandName: string; phone: string; displayPhone: string; logoUrl: string; heroImageUrl: string };
export const defaultSettings: SiteSettings = { brandName: "EACC Jardines", phone: "34663318795", displayPhone: "663 318 795", logoUrl: "/assets/logo.png", heroImageUrl: "/assets/jardin-montaje.png" };
export type Dictionary = Omit<typeof es, "serviceItems" | "projectItems"> & { settings?: SiteSettings; serviceItems: { title: string; description: string; alt?: string; imageUrl?: string; logoIncluded?: boolean }[]; projectItems: { title: string; description: string; alt?: string; imageUrl?: string; categories?: string[] }[] };
export function imageSrc(image: string) { return /^(https?:\/\/|\/)/.test(image) ? image : "/" + image; }
export const dictionaries: Record<Locale, Dictionary> = { es, en, fr, de, pt };
export const languageNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
};
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function getContent(locale: Locale, d: Dictionary = getDictionary(locale)) {
  const
    labels: Record<string, string> = Object.fromEntries(
      ["cesped", "jardines", "terrenos", "poda", "riego", "plantaciones"].map(
        (key, i) => [key, d.filters[i]],
      ),
    );
  labels.limpieza = d.filters[3];
  return {
    services: source.services.map((s, i) => ({
      ...s,
      ...d.serviceItems[i],
      id: String(i),
      slug: slugify(d.serviceItems[i].title),
      alt: d.serviceItems[i].alt || d.serviceItems[i].title,
      image: d.serviceItems[i].imageUrl || `assets/service-original-${i + 1}.webp`,
    })),
    projects: source.projects.map((p, i) => ({
      ...p,
      ...d.projectItems[i],
      id: String(i),
      slug: slugify(d.projectItems[i].title),
      alt: d.projectItems[i].alt || d.projectItems[i].title,
      image: d.projectItems[i].imageUrl || p.image,
      categories: d.projectItems[i].categories || p.categories,
      tag: [...new Set((d.projectItems[i].categories || p.categories).map((k) => labels[k]))].join(" · "),
    })),
  };
}
