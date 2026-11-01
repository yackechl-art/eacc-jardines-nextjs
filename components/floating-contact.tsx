"use client";
import { useEffect, useState } from "react";
import { useSite } from "./site-provider";
import { PHONE } from "@/lib/whatsapp";
export function FloatingContact() {
  const [hidden, setHidden] = useState(false),
    { d } = useSite();
  useEffect(() => {
    const c =
      document.querySelector("#contacto") ||
      document.querySelector(".calculator");
    if (!c) return;
    const observer = new IntersectionObserver(
      ([e]) => setHidden(e.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(c);
    return () => observer.disconnect();
  }, []);
  return (
    <a
      className="floating-wa"
      hidden={hidden}
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(d.messageHello)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.contact + " · WhatsApp"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.7A8.2 8.2 0 1 1 20 11.7Z" />
        <path d="M8 7.5c-.8 1.2 0 3.5 2 5.5s4.2 2.8 5.5 2l.8-1.1-2.4-1.4-.9.7c-1.4-.5-2.3-1.5-2.8-2.8l.7-.9L9.5 7Z" />
      </svg>
      <span>{d.chat}</span>
    </a>
  );
}
