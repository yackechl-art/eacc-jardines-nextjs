"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useSite } from "./site-provider";
import { stegaClean } from "next-sanity";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
export function QuoteForm() {
  const { service, setService, d } = useSite(),
    [error, setError] = useState("");
  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get("service");
    if (id !== null && /^\d+$/.test(id) && d.serviceItems[Number(id)])
      setService(stegaClean(d.serviceItems[Number(id)].title));
  }, [d, setService]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const url = buildWhatsAppUrl(
        service,
        String(form.get("place") || ""),
        String(form.get("details") || ""),
        stegaClean(d),
      );
      setError("");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : d.formError);
    }
  }
  return (
    <form id="quote-form" onSubmit={submit}>
      <h3>{d.formTitle}</h3>
      <p>{d.formIntro}</p>
      <label htmlFor="service">{d.serviceLabel}</label>
      <select
        id="service"
        name="service"
        required
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="">{d.servicePlaceholder}</option>
        {d.serviceItems.map((s) => (
          <option key={stegaClean(s.title)} value={stegaClean(s.title)}>{s.title}</option>
        ))}
      </select>
      <label htmlFor="place">{d.placeLabel}</label>
      <input
        id="place"
        name="place"
        placeholder={d.placePlaceholder}
        maxLength={120}
        required
        onChange={() => setError("")}
      />
      <label htmlFor="details">
        {d.detailsLabel} <span>({d.optional})</span>
      </label>
      <textarea
        id="details"
        name="details"
        rows={3}
        maxLength={1500}
        placeholder={d.detailsPlaceholder}
      />
      {error && <p role="alert">{error}</p>}
      <button className="button" type="submit">
        {d.continue} <span>↗</span>
      </button>
      <p className="form-note">{d.formNote}</p>
    </form>
  );
}
