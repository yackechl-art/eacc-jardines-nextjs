import { Suspense } from "react";
import { CmsPreview } from "@/components/cms-preview";
import "../globals.css";
import { localeFromSegments } from "@/lib/routes";
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments } = await params;
  return (
    <html lang={localeFromSegments(segments)}>
      <body>{children}<Suspense><CmsPreview /></Suspense></body>
    </html>
  );
}
