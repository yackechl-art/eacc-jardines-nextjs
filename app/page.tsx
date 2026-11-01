import { Header } from '@/components/header';
import { SiteProvider } from '@/components/site-provider';
import { Services } from '@/components/services';
import { Gallery } from '@/components/gallery';
import { QuoteForm } from '@/components/quote-form';
import { FloatingContact } from '@/components/floating-contact';

export default function Home() {
  return <SiteProvider>
    <Header />
    <main id="contenido">
<section className="hero" id="inicio"><div className="hero-copy"><div className="eyebrow"><span className="dot"></span> JARDINERÍA CON CUIDADO, DE PRINCIPIO A FIN</div><h1>Zonas verdes<br />en manos<br /><em>expertas.</em></h1><p>Creamos, transformamos y cuidamos. Lo que necesitas, con la experiencia que buscas y la atención que mereces.</p><div className="hero-actions"><a className="button" href="#contacto">Cuéntanos tu proyecto <span>↗</span></a><a className="text-link" href="#proyectos">Ver nuestros trabajos <span>↓</span></a></div><div className="hero-note"><span>✳</span> Desde Sevilla, realizamos trabajos en toda España.</div></div><div className="hero-visual"><img className="hero-img" src="/assets/jardin-montaje.png" alt="Montaje original de EACC Jardines con el proceso y resultado de un jardín con fuente y olivos" fetchPriority="high" /><div className="photo-label"><span>UN TRABAJO NUESTRO</span><strong>Donde la experiencia se convierte en resultados.</strong></div><a href="#proyectos" className="circle-link" aria-label="Explorar proyectos">↗</a></div></section>
<div className="audiences"><span>CADA ESPACIO, UNA NECESIDAD. NOSOTROS, LA SOLUCIÓN.</span><p>Particulares <i>✳</i> Comunidades <i>✳</i> Empresas <i>✳</i> Constructoras</p></div>
<Services />
<Gallery />
<section className="section process" id="nosotros"><div className="section-head"><div><p className="eyebrow">03 / ESTAMOS PARA AYUDARTE</p><h2>Tú nos cuentas qué necesitas.<br />Nosotros nos encargamos.</h2></div><p>En EACC Jardines trabajamos para particulares, comunidades, empresas y profesionales. Ya sea un pequeño trabajo, el mantenimiento de una zona verde o un proyecto de mayor envergadura, ponemos nuestra experiencia a tu servicio para encontrar la mejor solución.</p></div><div className="steps"><article><span>01</span><h3>Cuéntanos qué necesitas</h3><p>Explícanos qué trabajo quieres realizar. Puedes enviarnos fotografías, la ubicación y una breve descripción, o contactar directamente con nosotros.</p></article><article><span>02</span><h3>Estudiamos cada trabajo</h3><p>Valoramos tus necesidades, las características del espacio y la mejor forma de realizar el trabajo. Cuando sea necesario, concertamos una visita.</p></article><article><span>03</span><h3>Preparamos tu presupuesto</h3><p>Te presentamos una propuesta adaptada a tus necesidades, con un presupuesto claro y sin compromiso.</p></article></div><div className="location"><div className="location-symbol">↗</div><div><h3>Desde Sevilla, llegamos donde nos necesites.</h3><p>Realizamos trabajos en toda España, adaptando nuestros desplazamientos a las características y necesidades de cada proyecto.</p></div><span>SEVILLA<br />TODA ESPAÑA</span></div></section>
<section className="contact section" id="contacto"><div className="contact-copy"><p className="eyebrow">04 / EMPEZAMOS CON UNA CONVERSACIÓN</p><h2>Hablemos de lo<br />que <em>necesitas.</em></h2><p>Cuéntanos qué trabajo quieres realizar y cómo podemos ayudarte. Estudiaremos tus necesidades para ofrecerte una solución y un presupuesto sin compromiso.</p><a className="phone" href="tel:+34663318795">663 318 795 <span>↗</span></a><span className="phone-label">WHATSAPP Y LLAMADAS</span><div className="contact-brand">EACC Jardines<span>Zonas verdes en manos expertas.</span></div></div><QuoteForm /></section>
</main>
<footer><div><strong>EACC Jardines</strong><p>Zonas verdes en manos expertas.</p></div><a href="#inicio">Volver arriba ↑</a><span>SEVILLA · SERVICIOS INTEGRALES DE JARDINERÍA · COBERTURA NACIONAL</span></footer>
<FloatingContact />
</SiteProvider>;
}
