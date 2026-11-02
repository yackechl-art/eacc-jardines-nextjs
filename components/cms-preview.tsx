import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '@/sanity/lib/live';
import { sanityConfigured } from '@/sanity/lib/client';
export async function CmsPreview(){
 if(!sanityConfigured)return null;
 const preview=(await draftMode()).isEnabled;
 return <><SanityLive />{preview&&<><VisualEditing /><a href="/api/draft-mode/disable" style={{position:'fixed',bottom:12,left:12,zIndex:9999,background:'white',padding:12}}>Salir de vista previa</a></>}</>;
}
