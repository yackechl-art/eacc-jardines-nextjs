import es from "../data/locales/es.json";
import en from "../data/locales/en.json";
import fr from "../data/locales/fr.json";
import de from "../data/locales/de.json";
import pt from "../data/locales/pt.json";
import source from "../data/content.json";
export const locales = ["es", "en", "fr", "de", "pt"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof es;
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
export function getContent(locale: Locale) {
  const d = getDictionary(locale),
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
      alt: d.serviceItems[i].title,
    })),
    projects: source.projects.map((p, i) => ({
      ...p,
      ...d.projectItems[i],
      id: String(i),
      slug: slugify(d.projectItems[i].title),
      tag: [...new Set(p.categories.map((k) => labels[k]))].join(" · "),
    })),
  };
}
