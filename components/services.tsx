import content from '@/data/content.json';
import { PhotoButton, ServiceLink } from './site-provider';
export function Services() {
  return <section className="section services" id="servicios">
    <div className="section-head"><div><p className="eyebrow">01 / LO QUE HACEMOS</p><h2>Todo empieza con<br />un buen trabajo.</h2></div><p>Descubre lo que podemos hacer por ti.</p></div>
    <div className="service-grid">{content.services.map((item, index) => <article key={item.title}>
      <PhotoButton className="service-photo" src={'/' + item.image} caption={item.alt} label={'Ampliar: ' + item.title}><img src={'/' + item.image} alt={item.alt} loading="lazy" /><span className="project-open">↗</span></PhotoButton>
      <div className="service-body"><span className="service-num">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p><ServiceLink service={item.title} /></div>
    </article>)}</div>
  </section>;
}
