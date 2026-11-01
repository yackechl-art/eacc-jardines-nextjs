# EACC Jardines · Next.js

Web corporativa de EACC Jardines, convertida a Next.js con App Router, React y TypeScript. Conserva el diseño, los colores, el logo, los textos aprobados, los diez servicios y la galería de ocho proyectos de la web original.

## Iniciar el proyecto

Requisitos: Node.js 24 LTS y pnpm 11.

```sh
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comprobar y preparar para producción

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm start
```

No requiere claves API ni variables de entorno.

## Editar contenidos

- `data/content.json`: servicios, descripciones, proyectos, categorías y rutas de fotografías. Añadir un proyecto aquí lo incorpora a la galería automáticamente.
- `app/page.tsx`: presentación, proceso, cobertura geográfica, contacto y pie de página.
- `components/`: navegación móvil, servicios, galería con filtros, ampliación de fotos y formulario.
- `app/globals.css`: identidad visual y estilos adaptados a móviles.
- `public/assets/`: montajes y logo originales, sin cambios en sus colores ni contenido.
- `lib/whatsapp.ts`: teléfono y preparación del mensaje de presupuesto.

La consulta se prepara en el navegador y abre WhatsApp con el mensaje; el visitante decide cuándo enviarlo. La web no almacena datos del formulario. Las fuentes DM Sans y Manrope se solicitan a Google Fonts desde la hoja de estilos, con fuentes de sistema como alternativa.

## Publicar

Puede desplegarse en un alojamiento compatible con Next.js, por ejemplo importando este repositorio en Vercel, o ejecutando `pnpm build` y `pnpm start` en un servidor Node.js. Esta conversión no cambia el alojamiento de la web existente en Sites.

## Propiedad de los materiales

El logo, los textos y las fotografías pertenecen a EACC Jardines. Este repositorio se ha preparado para uso privado; no se concede una licencia pública de reutilización de esos materiales.

## SEO e idiomas

El español es el idioma principal en `/`. Inglés, francés, alemán y portugués usan los prefijos `/en`, `/fr`, `/de` y `/pt`. El selector conserva la página equivalente y todas las rutas se generan como HTML estático.

Hay 130 páginas: inicio, catálogo, diez servicios detallados, galería, ocho proyectos, dos calculadoras, índice de herramientas, contacto y privacidad, en cinco idiomas. El contenido compartido está en `data/content.json`; las traducciones y los textos de interfaz están en `data/locales/*.json`. `lib/routes.ts` genera las rutas localizadas.

Cada página incluye título y descripción, URL canónica, `hreflang` recíproco con `x-default`, Open Graph y metadatos de Twitter. El atributo HTML `lang` corresponde a la URL. `/es/*` redirige permanentemente a la versión española sin prefijo.

- `/sitemap.xml`: páginas e idiomas equivalentes.
- `/robots.txt`: permite la indexación de producción; desactiva la de entornos de previsualización de Vercel.
- `/llms.txt`: resumen verificable y enlaces para agentes de IA.
- `/llms-full.txt`: versión ampliada con proyectos.
- `/llm.txt` y `/LLM.txt`: alias que redirigen a `/llms.txt`.

El dominio de producción acordado es `https://www.eaccjardines.com`. Se puede sobrescribir con `NEXT_PUBLIC_SITE_URL` durante la compilación. Revisa esta variable antes de publicar en otro dominio. Las rutas del sitemap deben ser públicas y devolver HTTP 200 para poder indexarse; el SEO del repositorio no modifica por sí solo una web alojada en otro servicio.

Los datos estructurados JSON-LD incluyen Organization, WebSite, WebPage/CollectionPage, BreadcrumbList, Service, OfferCatalog, ItemList, ImageObject y WebApplication, según la página. Los breadcrumbs también son visibles. No se inventan precios, reseñas, calificaciones, dirección postal ni horarios. No se declara una ficha LocalBusiness completa sin disponer de una dirección real. La incorporación de estos datos o de `llms.txt` no garantiza resultados enriquecidos, indexación ni menciones de IA.

## Google Tag Manager y Google Analytics

Se ha seleccionado `GTM-KWWXX8G5`. El contenedor solo se carga después de aceptar la analítica. Antes de cargarlo, el consentimiento de analítica se actualiza a concedido y el de publicidad permanece denegado. El rechazo se recuerda y no carga etiquetas; al retirar un consentimiento anterior se recarga la página para dejar de cargar el contenedor. La preferencia se puede cambiar desde el pie.

La propiedad de Google Analytics está creada en la cuenta empresarial `eaccjardines@gmail.com` con el nombre **EACC Jardines · www.eaccjardines.com**. Su flujo **EACC Jardines · Web** utiliza `https://www.eaccjardines.com`, ID de flujo `16247811302` e ID de medición **G-FZF7K4NYXJ**. La configuración de informes usa España/Madrid y EUR.

La medición se administra mediante la etiqueta de Google Analytics del contenedor **GTM-KWWXX8G5**, con activación Initialization - All Pages. El ID de Analytics queda documentado también como alternativa directa; el modo GTM conserva prioridad, por lo que el repositorio no carga una segunda instalación directa.

En el flujo se conservan las vistas de página y los desplazamientos. Se han desactivado los eventos automáticos de formularios, búsquedas internas, clics salientes, vídeos y descargas. Antes de iniciar GTM, el repositorio establece contexto de URL sin parámetros ni fragmentos y desactiva Google Signals y la personalización publicitaria.

Como alternativa, puede usarse Analytics directo con `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...` y `NEXT_PUBLIC_GTM_ID=` vacío. Se carga una sola modalidad: un contenedor GTM válido tiene prioridad. Las variables `NEXT_PUBLIC_*` son públicas y requieren volver a compilar al cambiarlas. No deben contener secretos.

La modalidad directa envía páginas vistas sin parámetros de consulta ni fragmentos y no envía campos del formulario ni medidas de las calculadoras. El contenido y la política de etiquetas de un contenedor GTM se gestionan en Google Tag Manager, no en este repositorio; no añadas información personal a su capa de datos.

## Calculadoras

`lib/calculators.ts` contiene las fórmulas y la validación. Superficies: rectángulo, círculo y triángulo con altura perpendicular; margen opcional de material. Plantación: posiciones inclusivas entre márgenes, en línea o cuadrícula. No incorpora precios, obstáculos ni recomendaciones agronómicas. Todas las unidades de entrada están indicadas en metros y los resultados se formatean en el idioma de la página.
