import {
  getContent,
  getDictionary,
  languageNames,
  locales,
  type Locale,
} from "@/lib/i18n";
import { breadcrumbs, pathFor, routeText, type Route } from "@/lib/routes";
import { structuredData } from "@/lib/seo";
import { SiteProvider, PhotoButton } from "./site-provider";
import { Header } from "./header";
import { Services } from "./services";
import { Gallery } from "./gallery";
import { QuoteForm } from "./quote-form";
import { FloatingContact } from "./floating-contact";
import { DrainageCalculator } from "./drainage-calculator";
import { Calculator } from "./calculator";
import { Analytics } from "./analytics";

export function Process({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <section className="section process" id="nosotros">
      <div className="section-head">
        <div>
          <p className="eyebrow">03 / EACC JARDINES</p>
          <h2>{d.processTitle}</h2>
        </div>
        <p>{d.processIntro}</p>
      </div>
      <div className="steps">
        {d.stepsTitles.map((title, i) => (
          <article key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{d.stepsText[i]}</p>
          </article>
        ))}
      </div>
      <div className="location">
        <div className="location-symbol">↗</div>
        <div>
          <h3>{d.mobilityTitle}</h3>
          <p>{d.mobility}</p>
        </div>
      </div>
    </section>
  );
}
export function Contact({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <section className="contact section" id="contacto">
      <div className="contact-copy">
        <p className="eyebrow">04 / {d.contact}</p>
        <h2>{d.contactTitle}</h2>
        <p>{d.contactIntro}</p>
        <a className="phone" href="tel:+34663318795">
          663 318 795 <span>↗</span>
        </a>
        <span className="phone-label">{d.whatsapp}</span>
        <div className="contact-brand">
          EACC Jardines<span>{d.slogan}</span>
        </div>
      </div>
      <QuoteForm />
    </section>
  );
}
function ToolCards({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <div className="tool-grid">
      {(["area", "spacing", "drainage"] as const).map((kind) => (
        <article className="tool-card" key={kind}>
          <span className="service-icon">{kind === "area" ? "▧" : kind === "spacing" ? "✳" : "↘"}</span>
          <h2>{kind === "area" ? d.areaTitle : kind === "spacing" ? d.spacingTitle : d.drainageTitle}</h2>
          <p>{kind === "area" ? d.areaIntro : kind === "spacing" ? d.spacingIntro : d.drainageIntro}</p>
          <a className="text-link" href={pathFor(locale, kind)}>
            {d.more} ↗
          </a>
        </article>
      ))}
    </div>
  );
}
function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale),
    parts = d.slogan.split(" "),
    last = parts.pop();
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">EACC JARDINES · {d.services}</p>
          <h1>
            {parts.join(" ")} <em>{last}</em>
          </h1>
          <p>{d.hero}</p>
          <div className="hero-actions">
            <a className="button" href={pathFor(locale, "contact")}>
              {d.heroCta} <span>↗</span>
            </a>
            <a className="text-link" href={pathFor(locale, "projects")}>
              {d.viewProjects} ↓
            </a>
          </div>
          <div className="hero-note">
            <span>✳</span>
            {d.national}
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-img"
            src="/assets/jardin-montaje.png"
            alt={getContent(locale).projects[0].title}
            fetchPriority="high"
          />
          <div className="photo-label">
            <span>{d.heroLabel}</span>
            <strong>{d.heroResult}</strong>
          </div>
        </div>
      </section>
      <div className="audiences">
        <span>{d.clientsTitle}</span>
        <p>{d.clients}</p>
      </div>
    </>
  );
}
function Breadcrumbs({ route }: { route: Route }) {
  const items = breadcrumbs(route);
  if (items.length < 2) return null;
  return (
    <nav
      className="breadcrumbs"
      aria-label={getDictionary(route.locale).breadcrumbs}
    >
      <ol>
        {items.map((item, i) => (
          <li key={item.path}>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.path}>{item.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
function PageIntro({ title, text }: { title: string; text: string }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">EACC JARDINES</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
const serviceCategory = [
  "cesped",
  "terrenos",
  "jardines",
  "riego",
  "poda",
  "poda",
  "jardines",
  "plantaciones",
  "limpieza",
  "jardines",
];
function Detail({ route }: { route: Route }) {
  const { locale, kind, id = 0 } = route,
    d = getDictionary(locale),
    data = getContent(locale),
    item = kind === "service" ? data.services[id] : data.projects[id];
  const related =
    kind === "service"
      ? data.projects
          .map((p, i) => ({ ...p, href: pathFor(locale, "project", i) }))
          .filter((p) => p.categories.includes(serviceCategory[id]))
          .slice(0, 3)
      : [];
  return (
    <>
      <section className="section detail">
        <div className="detail-grid">
          <div>
            <PageIntro title={item.title} text={item.description} />
            <h2>{d.prepareTitle}</h2>
            <p>{d.prepareText}</p>
            <a
              className="button"
              href={
                pathFor(locale, "contact") +
                (kind === "service" ? `?service=${id}` : "")
              }
            >
              {d.quote} ↗
            </a>
          </div>
          <PhotoButton
            className="detail-photo"
            src={"/" + item.image}
            caption={item.title + ". " + item.description}
            label={d.enlarge}
          >
            <img src={"/" + item.image} alt={item.title} />
            <span>{d.enlarge} ↗</span>
          </PhotoButton>
        </div>
        <div className="detail-information">
          <h2>{d.faqTitle}</h2>
          <details open>
            <summary>{d.faqQuestion}</summary>
            <p>{d.faqAnswer}</p>
          </details>
          <details>
            <summary>{d.coverageQuestion}</summary>
            <p>{d.mobility}</p>
          </details>
        </div>
        {related.length > 0 && (
          <div className="related">
            <h2>{d.related}</h2>
            <div className="related-grid">
              {related.map((p) => (
                <a key={p.href} href={p.href}>
                  <img src={"/" + p.image} alt={p.title} loading="lazy" />
                  <h3>{p.title}</h3>
                  <span>{d.more} ↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
        {kind === "project" && (
          <div className="related">
            <h2>{d.services}</h2>
            <div className="related-links">
              {data.services
                .filter((_, i) =>
                  (item as (typeof data.projects)[number]).categories.includes(
                    serviceCategory[i],
                  ),
                )
                .map((s) => (
                  <a key={s.id} href={pathFor(locale, "service", Number(s.id))}>
                    {s.title} ↗
                  </a>
                ))}
            </div>
          </div>
        )}
      </section>
      <Process locale={locale} />
    </>
  );
}
export function SitePage({ route }: { route: Route }) {
  const { locale, kind } = route,
    d = getDictionary(locale),
    data = getContent(locale),
    text = routeText(route),
    galleryProjects = data.projects.map((p, i) => ({
      ...p,
      href: pathFor(locale, "project", i),
    }));
  return (
    <SiteProvider locale={locale} d={d}>
      <Header
        home={pathFor(locale)}
        contact={pathFor(locale, "contact")}
        links={(["services", "projects", "tools", "contact"] as const).map(
          (key) => ({ name: d[key], href: pathFor(locale, key) }),
        )}
        languages={locales.map((l) => ({
          name: languageNames[l],
          locale: l,
          href: pathFor(l, kind, route.id),
        }))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(route)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <main id="contenido">
        <Breadcrumbs route={route} />
        {kind === "home" && (
          <>
            <Hero locale={locale} />
            <Services locale={locale} />
            <Gallery projects={galleryProjects} />
            <section className="section">
              <div className="section-head">
                <div>
                  <p className="eyebrow">{d.tools}</p>
                  <h2>{d.toolsTitle}</h2>
                </div>
                <p>{d.toolsIntro}</p>
              </div>
              <ToolCards locale={locale} />
            </section>
            <Process locale={locale} />
            <Contact locale={locale} />
          </>
        )}
        {kind === "services" && (
          <>
            <section className="section compact">
              <PageIntro title={d.services} text={d.processIntro} />
            </section>
            <Services locale={locale} />
          </>
        )}
        {kind === "projects" && (
          <>
            <section className="section compact">
              <PageIntro title={d.projects} text={d.national} />
            </section>
            <Gallery projects={galleryProjects} />
          </>
        )}
        {(kind === "service" || kind === "project") && <Detail route={route} />}
        {kind === "tools" && (
          <section className="section">
            <PageIntro title={d.toolsTitle} text={d.toolsIntro} />
            <ToolCards locale={locale} />
          </section>
        )}
        {(kind === "area" || kind === "spacing" || kind === "drainage") && (
          <section className="section tool-page">
            <PageIntro title={text.title} text={text.description} />
            {kind === "drainage" ? <DrainageCalculator d={d} locale={locale} /> : <Calculator kind={kind} d={d} locale={locale} />}
            <a className="button" href={pathFor(locale, "contact")}>
              {d.quote} ↗
            </a>
          </section>
        )}
        {kind === "contact" && (
          <>
            <section className="section compact">
              <PageIntro title={d.contact} text={d.national} />
            </section>
            <Contact locale={locale} />
            <Process locale={locale} />
          </>
        )}
        {kind === "privacy" && (
          <section className="section prose">
            <PageIntro title={d.privacy} text={d.privacyText} />
            <h2>Google Analytics</h2>
            <p>{d.analyticsText}</p>
            <h2>{d.contact}</h2>
            <p>
              EACC Jardines · <a href="tel:+34663318795">663 318 795</a>
            </p>
          </section>
        )}
      </main>
      <footer>
        <div>
          <strong>EACC Jardines</strong>
          <p>{d.slogan}</p>
        </div>
        <div className="footer-links">
          <a href={pathFor(locale, "privacy")}>{d.privacy}</a>
          <a href={pathFor(locale, "tools")}>{d.tools}</a>
          <Analytics />
        </div>
        <span>{d.footer}</span>
      </footer>
      <FloatingContact />
    </SiteProvider>
  );
}
