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
