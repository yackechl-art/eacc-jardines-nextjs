'use client';
import { useState } from 'react';
import content from '@/data/content.json';
import { PhotoButton } from './site-provider';
const filters = [['todos','Todos los trabajos'],['cesped','Césped'],['jardines','Jardines'],['terrenos','Terrenos'],['poda','Poda y limpieza'],['riego','Riego'],['plantaciones','Plantaciones']];
export function Gallery() {
  const [filter, setFilter] = useState('todos');
  const projects = content.projects.filter(project => filter === 'todos' || project.categories.includes(filter));
  return <section className="projects section" id="proyectos">
    <div className="section-head"><div><p className="eyebrow">02 / TRABAJOS REALES</p><h2>Nuestro trabajo<br />habla por nosotros.</h2></div><p>Descubre algunos de nuestros trabajos de jardinería, acondicionamiento de terrenos y mantenimiento de espacios verdes. Cada proyecto refleja nuestra experiencia, dedicación y atención al detalle.</p></div>
    <div className="filters" role="group" aria-label="Filtrar trabajos">{filters.map(([key, label]) => <button key={key} type="button" className={filter === key ? 'active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    <div className="project-grid">{projects.map(project => <PhotoButton key={project.title} className="project" src={'/' + project.image} caption={project.title + '. ' + project.description}>
      <div className="project-photo"><img src={'/' + project.image} alt={project.title + '. Montaje original de EACC Jardines.'} loading="lazy" /><span className="project-open">↗</span></div>
      <div className="project-meta"><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p>{project.description}</p></div>
    </PhotoButton>)}</div>
    <p className="gallery-note" aria-live="polite">{filter === 'todos' ? 'Ocho proyectos, distintas necesidades y una misma forma de trabajar.' : `${projects.length} ${projects.length === 1 ? 'proyecto seleccionado' : 'proyectos seleccionados'}.`} Pulsa sobre cada montaje para verlo completo.</p>
  </section>;
}
