"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useSite } from "./site-provider";
import { stegaClean } from "next-sanity";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
export function QuoteForm() {
  const { service, setService, d } = useSite(),
    [error, setError] = useState(""),
    [sending, setSending] = useState(false),
    [sent, setSent] = useState(false);
  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get("service");
    if (id !== null && /^\d+$/.test(id) && d.serviceItems[Number(id)])
      setService(stegaClean(d.serviceItems[Number(id)].title));
  }, [d, setService]);
  function whatsapp(formElement: HTMLFormElement) {
    const form = new FormData(formElement);
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
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    setError(""); setSent(false); setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/eaccjardines@gmail.com", {
        method: "POST", headers: {"Content-Type":"application/json", Accept:"application/json"},
        body: JSON.stringify({
          name: String(form.get("name") || "").trim(), email: String(form.get("email") || "").trim(),
          Servicio: service, Localidad: String(form.get("place") || "").trim(),
          Consulta: String(form.get("details") || "").trim(),
          _subject: "Nueva consulta desde EACC Jardines", _template: "table", _honey: String(form.get("_honey") || ""),
          _url: window.location.origin + window.location.pathname,
        }), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("delivery failed");
      setSent(true); element.reset(); setService("");
    } catch { setError(d.emailError); }
    finally { setSending(false); }
  }
  return (
    <form id="quote-form" onSubmit={submit}>
      <h3>{d.formTitle}</h3>
      <p>{d.emailFormIntro}</p>
      <label htmlFor="name">{d.nameLabel}</label>
      <input id="name" name="name" autoComplete="name" maxLength={100} required />
      <label htmlFor="email">{d.emailLabel}</label>
      <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
      <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:"none"}} />
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
      {sent && <p role="status">{d.emailSuccess}</p>}
      <button className="button" type="submit" disabled={sending}>
        {sending ? d.emailSending : d.emailSend} <span>↗</span>
      </button>
      <button className="button" type="button" onClick={(event) => whatsapp(event.currentTarget.form!)}>
        {d.continue} <span>↗</span>
      </button>
      <p className="form-note">{d.emailFormNote}</p>
    </form>
  );
}
