import { createDataAttribute, stegaClean } from "next-sanity";
import {
  getContent,
  getDictionary,
  languageNames,
  locales,
  type Locale,
  type Dictionary,
  defaultSettings,
  imageSrc,
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

export function Process({ locale, copy }: { locale: Locale; copy?: Dictionary }) {
  const d = copy || getDictionary(locale);
  return (
    <section className="section process" id="nosotros">
      <div className="section-head">
        <div>
          <p className="eyebrow">03 / {(d.settings || defaultSettings).brandName}</p>
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
export function Contact({ locale, copy }: { locale: Locale; copy?: Dictionary }) {
  const d = copy || getDictionary(locale);
  return (
    <section className="contact section" id="contacto">
      <div className="contact-copy">
        <p className="eyebrow">04 / {d.contact}</p>
        <h2>{d.contactTitle}</h2>
        <p>{d.contactIntro}</p>
        <a className="phone" href={"tel:+" + (d.settings || defaultSettings).phone}>
          {(d.settings || defaultSettings).displayPhone} <span>↗</span>
        </a>
        <span className="phone-label">{d.whatsapp}</span>
        <div className="contact-brand">
          {(d.settings || defaultSettings).brandName}<span>{d.slogan}</span>
        </div>
      </div>
      <QuoteForm />
    </section>
  );
}
function ToolCards({ locale, copy }: { locale: Locale; copy?: Dictionary }) {
  const d = copy || getDictionary(locale);
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
function Hero({ locale, copy }: { locale: Locale; copy?: Dictionary }) {
  const d = copy || getDictionary(locale),
    parts = stegaClean(d.slogan).split(" "),
    last = parts.pop();
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">{(d.settings || defaultSettings).brandName} · {d.services}</p>
          <h1 data-sanity={createDataAttribute({id:`siteContent-${locale}`,type:"siteContent",path:"slogan"}).toString()}>
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
            data-sanity={createDataAttribute({id:`siteContent-${locale}`,type:"siteContent",path:"settings.heroImage"}).toString()}
            src={(d.settings || defaultSettings).heroImageUrl}
            alt={getContent(locale, d).projects[0].title}
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
function Breadcrumbs({ route, copy }: { route: Route; copy?: Dictionary }) {
  const items = breadcrumbs(route, copy);
  if (items.length < 2) return null;
  return (
    <nav
      className="breadcrumbs"
      aria-label={(copy || getDictionary(route.locale)).breadcrumbs}
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
function PageIntro({ title, text, brandName = "EACC Jardines" }: { title: string; text: string; brandName?: string }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{brandName}</p>
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
  "cesped",
];
function Detail({ route, copy }: { route: Route; copy?: Dictionary }) {
  const { locale, kind, id = 0 } = route,
    d = copy || getDictionary(locale),
    data = getContent(locale, d),
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
        <div className={kind === "service" ? "detail-grid service-detail-text" : "detail-grid"}>
          <div>
            <PageIntro brandName={(d.settings || defaultSettings).brandName} title={item.title} text={item.description} />
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
          {kind === "project" && <PhotoButton
            className="detail-photo"
            src={imageSrc(item.image)}
            caption={item.title + ". " + item.description}
            label={d.enlarge}
          >
            <img src={imageSrc(item.image)} alt={item.alt} />
            <span>{d.enlarge} ↗</span>
          </PhotoButton>}
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
      <Process locale={locale} copy={d} />
    </>
  );
}
export function SitePage({ route, copy }: { route: Route; copy?: Dictionary }) {
  const { locale, kind } = route,
    d = copy || getDictionary(locale),
    data = getContent(locale, d),
    text = routeText(route, d),
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
          __html: JSON.stringify(structuredData(route, stegaClean(d))).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <main id="contenido">
        <Breadcrumbs route={route} copy={d} />
        {kind === "home" && (
          <>
            <Hero locale={locale} copy={d} />
            <Services locale={locale} copy={d} />
            <Gallery projects={galleryProjects} />
            <section className="section">
              <div className="section-head">
                <div>
                  <p className="eyebrow">{d.tools}</p>
                  <h2>{d.toolsTitle}</h2>
                </div>
                <p>{d.toolsIntro}</p>
              </div>
              <ToolCards locale={locale} copy={d} />
            </section>
            <Process locale={locale} copy={d} />
            <Contact locale={locale} copy={d} />
          </>
        )}
        {kind === "services" && (
          <>
            <section className="section compact">
              <PageIntro brandName={(d.settings || defaultSettings).brandName} title={d.services} text={d.processIntro} />
            </section>
            <Services locale={locale} copy={d} />
          </>
        )}
        {kind === "projects" && (
          <>
            <section className="section compact">
              <PageIntro brandName={(d.settings || defaultSettings).brandName} title={d.projects} text={d.national} />
            </section>
            <Gallery projects={galleryProjects} />
          </>
        )}
        {(kind === "service" || kind === "project") && <Detail route={route} copy={d} />}
        {kind === "tools" && (
          <section className="section">
            <PageIntro brandName={(d.settings || defaultSettings).brandName} title={d.toolsTitle} text={d.toolsIntro} />
            <ToolCards locale={locale} copy={d} />
          </section>
        )}
        {(kind === "area" || kind === "spacing" || kind === "drainage") && (
          <section className="section tool-page">
            <PageIntro brandName={(d.settings || defaultSettings).brandName} title={text.title} text={text.description} />
            {kind === "drainage" ? <DrainageCalculator d={d} locale={locale} /> : <Calculator kind={kind} d={d} locale={locale} />}
            <a className="button" href={pathFor(locale, "contact")}>
              {d.quote} ↗
            </a>
          </section>
        )}
        {kind === "contact" && (
          <>
            <section className="section compact">
              <PageIntro brandName={(d.settings || defaultSettings).brandName} title={d.contact} text={d.national} />
            </section>
            <Contact locale={locale} copy={d} />
            <Process locale={locale} copy={d} />
          </>
        )}
        {kind === "privacy" && (
          <section className="section prose">
            <PageIntro brandName={(d.settings || defaultSettings).brandName} title={d.privacy} text={d.privacyText} />
            <h2>Google Analytics</h2>
            <p>{d.analyticsText}</p>
            <h2>{d.contact}</h2>
            <p>
              {(d.settings || defaultSettings).brandName} · <a href="tel:+34663318795">{(d.settings || defaultSettings).displayPhone}</a>
            </p>
          </section>
        )}
      </main>
      <footer>
        <div>
          <strong>{(d.settings || defaultSettings).brandName}</strong>
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
