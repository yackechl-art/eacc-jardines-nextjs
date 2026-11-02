"use client";
import { defaultSettings } from "@/lib/i18n";

import { useState } from "react";
import { useSite } from "./site-provider";
type Link = { name: string; href: string; locale?: string };
export function Header({
  links,
  languages,
  home,
  contact,
}: {
  links: Link[];
  languages: Link[];
  home: string;
  contact: string;
}) {
  const [open, setOpen] = useState(false),
    { d, locale } = useSite();
  return (
    <>
      <a className="skip" href="#contenido">
        {d.skip}
      </a>
      <div className="topline">
        <span>{d.country}</span>
        <a href={"tel:+" + (d.settings || defaultSettings).phone}>{d.help} · {(d.settings || defaultSettings).displayPhone} ↗</a>
      </div>
      <header>
        <a
          className="brand"
          href={home}
          aria-label={(d.settings || defaultSettings).brandName + " · " + d.home}
        >
          <img
            src={(d.settings || defaultSettings).logoUrl}
            alt={(d.settings || defaultSettings).brandName}
            width="600"
            height="398"
          />
        </a>
        <nav
          id="main-navigation"
          className={open ? "open" : ""}
          aria-label={d.home}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.name}
            </a>
          ))}
        </nav>
        <a className="button small" href={contact}>
          {d.quote} <span>↗</span>
        </a>
        <button
          className="menu"
          type="button"
          aria-label={open ? d.closeMenu : d.openMenu}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </header>
      <nav className="languages" aria-label={d.language}>
        {languages.map((link) => (
          <a
            key={link.locale}
            href={link.href}
            hrefLang={link.locale}
            lang={link.locale}
            aria-current={link.locale === locale ? "page" : undefined}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </>
  );
}
