import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getDictionary,getContent,imageSrc} from '../lib/i18n.ts';
import {pathFor,routeText} from '../lib/routes.ts';
import {metadataFor} from '../lib/seo.ts';
test('CMS overrides reach visible content and metadata while canonical URLs stay stable',()=>{
 const original=getDictionary('es');const copy=structuredClone(original);
 copy.serviceItems[0]={...copy.serviceItems[0],title:'Tepe editado desde Sanity',imageUrl:'https://cdn.sanity.io/images/test/production/photo.webp'};
 assert.equal(getContent('es',copy).services[0].title,'Tepe editado desde Sanity');
 assert.equal(imageSrc(getContent('es',copy).services[0].image),copy.serviceItems[0].imageUrl);
 const route={locale:'es',kind:'service',id:0};
 assert.equal(routeText(route,copy).title,copy.serviceItems[0].title);
 assert.match(metadataFor(route,copy).title,/Tepe editado/);
 assert.equal(pathFor('es','service',0),'/servicios/instalacion-de-cesped-natural-y-en-tepe');
 assert.notEqual(getContent('es').services[0].title,copy.serviceItems[0].title);
});
test('CMS contact number controls WhatsApp messages',async()=>{
 const {buildWhatsAppUrl}=await import('../lib/whatsapp.ts');
 const copy={...getDictionary('es'),settings:{phone:'34900111222'}};
 assert.match(buildWhatsAppUrl('Tepe','Sevilla','',copy),/^https:\/\/wa.me\/34900111222\?/);
});
test('CMS dictionary is passed through the actual page renderer',async()=>{
 const React=await import('react');
 const {renderToStaticMarkup}=await import('react-dom/server');
 const {SitePage}=await import('../components/pages.tsx');
 const copy=structuredClone(getDictionary('es'));
 copy.servicesTitle='CMS_RENDER_INTEGRATION_CHECK';
 const html=renderToStaticMarkup(React.createElement(SitePage,{route:{locale:'es',kind:'services'},copy}));
 assert.ok(html.includes('CMS_RENDER_INTEGRATION_CHECK'));
});
