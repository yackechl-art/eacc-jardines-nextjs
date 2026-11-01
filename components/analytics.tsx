"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "./site-provider";
import { TRACKING, trackingMode } from "@/lib/tracking-config";
import { sanitizeAnalyticsUrl } from "@/lib/analytics";
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}
const mode = trackingMode(TRACKING.gtmId, TRACKING.gaId),
  storageKey = "eacc-analytics-consent-v1";
function prepareConsent() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (..._args: unknown[]) {
      window.dataLayer.push(arguments);
    };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("set", {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: sanitizeAnalyticsUrl(window.location.href),
    page_referrer: sanitizeAnalyticsUrl(document.referrer),
  });
  if (mode === "gtm")
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
}
export function Analytics() {
  const { d } = useSite(),
    pathname = usePathname(),
    [consent, setConsent] = useState<string | null>(null),
    [ready, setReady] = useState(false),
    [open, setOpen] = useState(false),
    last = useRef("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "granted" && mode) prepareConsent();
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    } catch {
      setConsent(null);
    }
  }, []);
  useEffect(() => {
    if (mode !== "ga" || consent !== "granted" || !ready) return;
    const path = pathname || "/";
    if (last.current === path) return;
    window.gtag?.("event", "page_view", {
      page_location: window.location.origin + path,
      page_title: document.title,
    });
    last.current = path;
  }, [pathname, ready, consent]);
  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* Use the selected preference for this page. */
    }
    if (value === "granted" && consent !== "granted" && mode) prepareConsent();
    if (mode === "ga")
      window[`ga-disable-${TRACKING.gaId}`] = value !== "granted";
    const revoke = consent === "granted" && value === "denied";
    if (value === "denied") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      last.current = "";
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (!name.startsWith("_ga")) continue;
        document.cookie = `${name}=; Max-Age=0; path=/`;
        const parts = location.hostname.split(".");
        for (let i = 0; i < parts.length - 1; i++)
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join(".")}`;
      }
    }
    setConsent(value);
    setOpen(false);
    if (revoke) window.location.reload();
  }
  function initializeGa() {
    window[`ga-disable-${TRACKING.gaId}`] = false;
    window.gtag?.("js", new Date());
    window.gtag?.("config", TRACKING.gaId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    setReady(true);
  }
  return (
    <>
      <button
        className="cookie-settings"
        type="button"
        onClick={() => setOpen(true)}
      >
        {d.cookies}
      </button>
      {consent === "granted" && mode === "ga" && (
        <Script
          id="eacc-google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.gaId}`}
          strategy="afterInteractive"
          onReady={initializeGa}
        />
      )}{" "}
      {consent === "granted" && mode === "gtm" && (
        <Script
          id="eacc-google-tag-manager"
          src={`https://www.googletagmanager.com/gtm.js?id=${TRACKING.gtmId}`}
          strategy="afterInteractive"
        />
      )}
      {(open || (mode && consent === null)) && (
        <section className="cookie-panel" aria-label={d.cookies}>
          <h2>{d.cookieTitle}</h2>
          <p>{mode ? d.cookieText : d.analyticsOff}</p>
          <div>
            {mode && (
              <button className="button" onClick={() => choose("granted")}>
                {d.accept}
              </button>
            )}
            <button
              className="button cookie-reject"
              onClick={() => choose("denied")}
            >
              {mode ? d.reject : d.close}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
