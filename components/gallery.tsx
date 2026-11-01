"use client";
import { useState } from "react";
import { useSite, PhotoButton } from "./site-provider";
type Project = {
  title: string;
  description: string;
  image: string;
  categories: string[];
  tag: string;
  href: string;
};
export function Gallery({ projects }: { projects: Project[] }) {
  const { d } = useSite(),
    [filter, setFilter] = useState("todos"),
    keys = ["cesped", "jardines", "terrenos", "poda", "riego", "plantaciones"];
  const shown = projects.filter(
    (p) => filter === "todos" || p.categories.includes(filter),
  );
  return (
    <section className="projects section" id="proyectos">
      <div className="section-head">
        <div>
          <p className="eyebrow">02 / {d.projects}</p>
          <h2>{d.projectsTitle}</h2>
        </div>
        <p>{d.projectsIntro}</p>
      </div>
      <div className="filters" role="group" aria-label={d.projects}>
        <button
          type="button"
          className={filter === "todos" ? "active" : ""}
          aria-pressed={filter === "todos"}
          onClick={() => setFilter("todos")}
        >
          {d.all}
        </button>
        {keys.map((key, i) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "active" : ""}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {d.filters[i]}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {shown.map((p) => (
          <article className="project" key={p.href}>
            <PhotoButton
              className="project-photo"
              src={"/" + p.image}
              caption={p.title + ". " + p.description}
              label={d.enlarge + ": " + p.title}
            >
              <img src={"/" + p.image} alt={p.title} loading="lazy" />
              <span className="project-open">↗</span>
            </PhotoButton>
            <div className="project-meta">
              <span className="project-tag">{p.tag}</span>
              <h3>
                <a href={p.href}>{p.title}</a>
              </h3>
              <p>{p.description}</p>
              <a className="text-link" href={p.href}>
                {d.more} ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="gallery-note">{d.photoNote}</p>
    </section>
  );
}
