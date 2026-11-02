import { defineType, defineField } from 'sanity';
import es from '../../data/locales/es.json';
const media = [
  defineField({name:'image',title:'Fotografía',type:'image',options:{hotspot:true}}),
  defineField({name:'imageUrl',title:'Imagen local de respaldo',type:'string',hidden:true}),
];
const item = (project: boolean) => defineType({name:project?'projectItem':'serviceItem',type:'object',title:project?'Proyecto':'Servicio',fields:[
  defineField({name:'title',title:'Título',type:'string',validation:r=>r.required()}),
  defineField({name:'description',title:'Descripción',type:'text',rows:3,validation:r=>r.required()}),
  defineField({name:'alt',title:'Descripción de la fotografía (accesibilidad)',type:'string'}),
  ...media,
  ...(project ? [defineField({name:'categories',title:'Categorías',type:'array',of:[{type:'string'}],options:{list:['cesped','jardines','terrenos','poda','riego','plantaciones','limpieza']}})] : [defineField({name:'logoIncluded',title:'La foto ya incluye el logo (no añadir otro)',type:'boolean',initialValue:false})]),
],preview:{select:{title:'title',subtitle:'description',media:'image'}}});
const titles: Record<string,string> = {slogan:'Lema principal',hero:'Presentación',serviceItems:'Servicios',projectItems:'Proyectos',settings:'Marca, contacto e imágenes'};
Object.assign(titles, {home:'Menú: Inicio',services:'Menú: Servicios',projects:'Menú: Proyectos',tools:'Menú: Herramientas',contact:'Menú: Contacto',privacy:'Enlace de privacidad',language:'Selector de idioma',quote:'Botón para pedir presupuesto',more:'Enlace para ver detalles',enlarge:'Botón para ampliar fotos',country:'Ubicación y cobertura',help:'Mensaje de contacto superior',heroLabel:'Etiqueta de la portada',heroResult:'Mensaje sobre la foto de portada',heroCta:'Botón principal de portada',viewProjects:'Botón para ver trabajos',national:'Cobertura nacional',clientsTitle:'Título de clientes',clients:'Tipos de clientes',servicesTitle:'Título de la sección Servicios',servicesIntro:'Introducción de Servicios',projectsTitle:'Título de Proyectos',projectsIntro:'Introducción de Proyectos',photoNote:'Nota de la galería',processTitle:'Título de Cómo trabajamos',processIntro:'Presentación de la empresa',stepsTitles:'Pasos: títulos',stepsText:'Pasos: explicaciones',filters:'Nombres de los filtros de proyectos',footer:'Texto del pie de página',privacyText:'Información de privacidad',analyticsText:'Información de analítica',toolsTitle:'Título de Herramientas',toolsIntro:'Introducción de Herramientas'});
const dictionaryFields = Object.entries(es).map(([name,value])=>defineField({name,title:titles[name]||(typeof value==='string'?`Texto: ${value.slice(0,55)}`:name),
  ...(name==='serviceItems'||name==='projectItems' ? {type:'array',of:[{type:name==='serviceItems'?'serviceItem':'projectItem'}],validation:(r:any)=>r.required().length(name==='serviceItems'?10:8),description:'El orden corresponde a las rutas existentes de la web.'} : Array.isArray(value)?{type:'array',of:[{type:'string'}],validation:(r:any)=>r.required().length(value.length)}:{type:String(value).length>130?'text':'string'}),
  group:name==='serviceItems'?'services':name==='projectItems'?'projects':'text',
}));
export const schemaTypes = [item(false),item(true),defineType({name:'siteContent',title:'Contenido del sitio',type:'document',groups:[{name:'text',title:'Textos',default:true},{name:'services',title:'Servicios'},{name:'projects',title:'Proyectos'},{name:'settings',title:'Marca y contacto'}],fields:[
  ...dictionaryFields,
  defineField({name:'settings',title:titles.settings,type:'object',group:'settings',fields:[
    defineField({name:'brandName',title:'Nombre de la empresa',type:'string',validation:r=>r.required()}),
    defineField({name:'phone',title:'Teléfono con prefijo de país, solo dígitos',type:'string',validation:r=>r.required().regex(/^\d{7,15}$/)}),
    defineField({name:'displayPhone',title:'Teléfono visible',type:'string',validation:r=>r.required()}),
    defineField({name:'logo',title:'Logo común para todas las fotografías',type:'image'}),
    defineField({name:'photoLogo',title:'Logo transparente sobre las fotografías',type:'image'}),
    defineField({name:'photoLogoUrl',type:'string',hidden:true}),
    defineField({name:'heroImage',title:'Foto de portada',type:'image',options:{hotspot:true}}),
    defineField({name:'logoUrl',type:'string',hidden:true}),defineField({name:'heroImageUrl',type:'string',hidden:true}),
  ]}),
],preview:{select:{id:'_id'},prepare:({id})=>({title:({es:'Español',en:'English',fr:'Français',de:'Deutsch',pt:'Português'} as Record<string,string>)[id.split('-').pop()]||id})}})];
