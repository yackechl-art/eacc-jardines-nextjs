import { getContent, getDictionary, type Locale } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";
import { PhotoButton } from "./site-provider";
export function Services({ locale }: { locale: Locale }) {
  const d = getDictionary(locale),
    { services } = getContent(locale);
  return (
    <section className="section services" id="servicios">
      <div className="section-head">
        <div>
          <p className="eyebrow">01 / {d.services}</p>
          <h2>{d.servicesTitle}</h2>
        </div>
        <p>{d.servicesIntro}</p>
      </div>
      <div className="service-grid">
        {services.map((s, i) => (
          <article key={s.id}>
            <PhotoButton
              className="service-photo"
              src={"/" + s.image}
              caption={s.title}
              label={d.enlarge + ": " + s.title}
            >
              <img src={"/" + s.image} alt={s.alt} loading="lazy" />
              <span className="project-open">↗</span>
            </PhotoButton>
            <div className="service-body">
              <span className="service-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>
                <a
                  className="heading-link"
                  href={pathFor(locale, "service", i)}
                >
                  {s.title}
                </a>
              </h3>
              <p>{s.description}</p>
              <a href={pathFor(locale, "service", i)}>
                {d.more} <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
