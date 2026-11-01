import { notFound } from "next/navigation";
import { allRoutes, pathFor, resolveRoute } from "@/lib/routes";
import { metadataFor } from "@/lib/seo";
import { SitePage } from "@/components/pages";
export const dynamicParams = false;
export function generateStaticParams() {
  return allRoutes().map((route) => ({
    segments: pathFor(route.locale, route.kind, route.id)
      .split("/")
      .filter(Boolean),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments } = await params;
  const route = resolveRoute(segments);
  return route
    ? metadataFor(route)
    : { title: "404 · EACC Jardines", robots: { index: false, follow: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments } = await params;
  const route = resolveRoute(segments);
  if (!route) notFound();
  return <SitePage route={route} />;
}
