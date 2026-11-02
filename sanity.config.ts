import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
export default defineConfig({name:'eacc',title:'EACC Jardines',basePath:'/studio',
 projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'vg9zlhhc',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',
 plugins:[structureTool({structure:S=>S.list().title('EACC Jardines').items(['es','en','fr','de','pt'].map(language=>S.listItem().title(({es:'Español',en:'English',fr:'Français',de:'Deutsch',pt:'Português'} as Record<string,string>)[language]).child(S.document().schemaType('siteContent').documentId(`siteContent-${language}`))))}),presentationTool({previewUrl:{initial:'/',previewMode:{enable:'/api/draft-mode/enable',disable:'/api/draft-mode/disable'}},resolve:{locations:{siteContent:defineLocations({select:{language:'_id'},resolve:doc=>({locations:[{title:'Inicio',href:doc?.language?.endsWith('-es')?'/':`/${doc?.language?.split('-').pop()||'es'}`}]})})}}}),visionTool()],schema:{types:schemaTypes},
 document:{newDocumentOptions:()=>[],actions:prev=>prev.filter(action=>action.action!=='delete'&&action.action!=='duplicate')},
});
