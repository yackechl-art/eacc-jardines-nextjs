import { test } from "node:test";
import assert from "node:assert/strict";
import {
  allRoutes,
  pathFor,
  resolveRoute,
  breadcrumbs,
} from "../lib/routes.ts";
import { locales, getDictionary, getContent } from "../lib/i18n.ts";
import { metadataFor, structuredData, SITE_URL } from "../lib/seo.ts";
import { llmsText } from "../lib/llms.ts";
import { trackingMode } from "../lib/tracking-config.ts";
test("every translated route is unique, resolvable and has reciprocal language alternatives", () => {
  const routes = allRoutes();
  assert.equal(routes.length, 135);
  assert.equal(
    new Set(routes.map((r) => pathFor(r.locale, r.kind, r.id))).size,
    routes.length,
  );
  for (const route of routes) {
    const path = pathFor(route.locale, route.kind, route.id);
    assert.deepEqual(resolveRoute(path.split("/").filter(Boolean)), route);
    const m = metadataFor(route);
    assert.ok(m.title);
    assert.ok(m.description);
    assert.equal(m.alternates.canonical, path);
    for (const locale of locales)
      assert.equal(
        m.alternates.languages[locale],
        SITE_URL +
          (pathFor(locale, route.kind, route.id) === "/"
            ? "/"
            : pathFor(locale, route.kind, route.id)),
      );
  }
  assert.equal(resolveRoute(["invalid", "path"]), undefined);
});
test("translations have complete UI keys, services and projects", () => {
  const keys = Object.keys(getDictionary("es")).sort();
  for (const l of locales) {
    assert.deepEqual(Object.keys(getDictionary(l)).sort(), keys);
    assert.equal(getContent(l).services.length, 11);
    assert.equal(getContent(l).projects.length, 8);
    assert.ok(getDictionary(l).hero);
  }
});
test("JSON-LD is serializable and breadcrumbs match visible navigation", () => {
  for (const r of allRoutes()) {
    const data = JSON.parse(JSON.stringify(structuredData(r)));
    assert.equal(data["@context"], "https://schema.org");
    const crumb = data["@graph"].find((x) => x["@type"] === "BreadcrumbList");
    if (r.kind !== "home") {
      assert.equal(crumb.itemListElement.length, breadcrumbs(r).length);
      assert.equal(
        crumb.itemListElement.at(-1).item,
        SITE_URL + pathFor(r.locale, r.kind, r.id),
      );
    }
    assert.ok(!JSON.stringify(data).includes("aggregateRating"));
  }
});
test("AI discovery content links to service and tool pages without invented prices", () => {
  const text = llmsText();
  assert.ok(text.includes("/sitemap.xml"));
  assert.ok(text.includes(pathFor("es", "area")));
  assert.ok(llmsText(true).length > text.length);
});
test("only one valid tracking integration can be selected", () => {
  assert.equal(trackingMode("", ""), null);
  assert.equal(trackingMode("GTM-KWWXX8G5", "G-TEST123"), "gtm");
  assert.equal(trackingMode("", "G-TEST123"), "ga");
  assert.equal(trackingMode("invalid", "invalid"), null);
});
