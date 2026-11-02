# EACC Jardines CMS

Project: **EACC Jardines** (`vg9zlhhc`), dataset `production`, owned by the approved project owner.

Open `/studio` on the website. Sign in with Google using that account. The five language documents contain the existing site text, service and project descriptions, photos, accessibility descriptions, brand, phone number, shared logo and cover image. The **Presentation** tab opens the website beside the editor; click text or a service photo to select its field. Draft changes stay in preview until **Publish** is used.

The existing public URLs remain stable when display titles are edited. Service/project order is tied to those existing URLs; changing the number of entries or adding new page types requires a route/schema change. Calculator logic and tracking credentials remain application configuration, not editable public content.

## Runtime connection

Use Node.js 22.12 or newer. The hosting project needs:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=vg9zlhhc`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `SANITY_API_READ_TOKEN`: the private Viewer token, supplied through the hosting environment settings. Never prefix this token with `NEXT_PUBLIC_` or commit it.

Sanity API CORS must allow the exact Studio origin with credentials. Local origin: `http://localhost:3000`. Add the exact preview and production origins when deploying; do not use wildcard credential origins.

Live Content updates published pages without redeploying. Visual Editing is only mounted in authenticated Draft Mode. The preview enable route validates the Sanity secret using `defineEnableDraftMode`. `/api/draft-mode/disable` exits preview. Tokens and private draft content are excluded from public metadata.

Without CMS configuration the checked-in content remains usable for development. With CMS configured, missing documents fail visibly instead of silently hiding connection problems.

## Migration and verification

The five language documents and project images were imported with the included idempotent migration script. Existing documents are preserved on repeat runs. For a new dataset, provide a temporary Editor token in ignored `.env.migration`, run `npm run cms:migrate`, then revoke the Editor token and remove that file. Only the Viewer token belongs on the website.

Checks: `npm test`, `npm run cms:validate`, `npm run build`.
