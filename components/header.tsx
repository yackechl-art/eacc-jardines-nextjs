'use client';
import { useState } from 'react';
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <a className="skip" href="#contenido">Ir al contenido</a>
    <div className="topline"><span>SEVILLA · SERVICIO EN TODA ESPAÑA</span><a href="tel:+34663318795">¿EN QUÉ PODEMOS AYUDARTE? · 663 318 795 ↗</a></div>
    <header>
      <a className="brand" href="#inicio" aria-label="EACC Jardines, inicio"><img src="/assets/logo.png" alt="EACC Jardines. Zonas verdes en manos expertas" width="600" height="398" /></a>
      <nav id="main-navigation" className={menuOpen ? 'open' : ''} aria-label="Principal">
        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a href="#proyectos" onClick={() => setMenuOpen(false)}>Nuestros trabajos</a>
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Cómo trabajamos</a>
      </nav>
      <a className="button small" href="#contacto">Pedir presupuesto <span>↗</span></a>
      <button className="menu" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
    </header>
  </>;
}
