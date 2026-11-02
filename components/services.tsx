import { getContent, getDictionary, type Dictionary, imageSrc, type Locale } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";
import { PhotoButton } from "./site-provider";
import { ServiceResult } from "./service-result";
export function Services({ locale, copy }: { locale: Locale; copy?: Dictionary }) {
  const d = copy || getDictionary(locale),
    { services } = getContent(locale, d);
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
              src={imageSrc(s.image)}
              caption={i === 0 ? s.alt : s.title}
              serviceResult={i}
              label={d.enlarge + ": " + s.title}
            >
              <ServiceResult src={imageSrc(s.image)} alt={i === 0 ? s.alt : s.title} index={i} />
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
