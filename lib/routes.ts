import {
  getContent,
  getDictionary,
  isLocale,
  locales,
  slugify,
  type Locale,
} from "./i18n";
export type PageKind =
  | "home"
  | "services"
  | "service"
  | "projects"
  | "project"
  | "tools"
  | "area"
  | "spacing"
  | "drainage"
  | "contact"
  | "privacy";
export type Route = { locale: Locale; kind: PageKind; id?: number };
export function pathFor(
  locale: Locale,
  kind: PageKind = "home",
  id?: number,
): string {
  const d = getDictionary(locale),
    data = getContent(locale),
    prefix = locale === "es" ? "" : `/${locale}`;
  const sections = {
    services: slugify(d.services),
    projects: slugify(d.projects),
    tools: slugify(d.tools),
    contact: slugify(d.contact),
    privacy: slugify(d.privacy),
  };
  let path = "";
  if (kind === "service")
    path = `${sections.services}/${data.services[id ?? 0]?.slug}`;
  else if (kind === "project")
    path = `${sections.projects}/${data.projects[id ?? 0]?.slug}`;
  else if (kind === "area" || kind === "spacing" || kind === "drainage")
    path = `${sections.tools}/${slugify(kind === "area" ? d.areaTitle : kind === "spacing" ? d.spacingTitle : d.drainageTitle)}`;
  else if (kind !== "home") path = sections[kind];
  return prefix + (path ? "/" + path : "") || "/";
}
export function allRoutes(): Route[] {
  return locales.flatMap((locale) => [
    ...(
      [
        "home",
        "services",
        "projects",
        "tools",
        "area",
        "spacing",
        "drainage",
        "contact",
        "privacy",
      ] as PageKind[]
    ).map((kind) => ({ locale, kind })),
    ...getContent(locale).services.map((_, id) => ({
      locale,
      kind: "service" as const,
      id,
    })),
    ...getContent(locale).projects.map((_, id) => ({
      locale,
      kind: "project" as const,
      id,
    })),
  ]);
}
export function resolveRoute(segments?: string[]) {
  const path = "/" + (segments || []).join("/");
  return allRoutes().find((r) => pathFor(r.locale, r.kind, r.id) === path);
}
export function localeFromSegments(segments?: string[]): Locale {
  return segments?.[0] && isLocale(segments[0]) ? segments[0] : "es";
}
export function routeText(r: Route) {
  const d = getDictionary(r.locale),
    data = getContent(r.locale);
  return {
    title: {
      home: d.slogan,
      services: d.services,
      projects: d.projects,
      tools: d.toolsTitle,
      area: d.areaTitle,
      spacing: d.spacingTitle,
      drainage: d.drainageTitle,
      contact: d.contactTitle,
      privacy: d.privacy,
      service: data.services[r.id ?? 0]?.title,
      project: data.projects[r.id ?? 0]?.title,
    }[r.kind],
    description: {
      home: d.hero,
      services: d.servicesIntro,
      projects: d.projectsIntro,
      tools: d.toolsIntro,
      area: d.areaIntro,
      spacing: d.spacingIntro,
      drainage: d.drainageIntro,
      contact: d.contactIntro,
      privacy: d.privacyText,
      service: data.services[r.id ?? 0]?.description,
      project: data.projects[r.id ?? 0]?.description,
    }[r.kind],
  };
}
export function breadcrumbs(r: Route) {
  const d = getDictionary(r.locale),
    items = [{ name: d.home, path: pathFor(r.locale) }];
  if (r.kind === "home") return items;
  if (r.kind === "service")
    items.push({ name: d.services, path: pathFor(r.locale, "services") });
  if (r.kind === "project")
    items.push({ name: d.projects, path: pathFor(r.locale, "projects") });
  if (r.kind === "area" || r.kind === "spacing" || r.kind === "drainage")
    items.push({ name: d.tools, path: pathFor(r.locale, "tools") });
  items.push({
    name: routeText(r).title,
    path: pathFor(r.locale, r.kind, r.id),
  });
  return items;
}
