import {defineEnableDraftMode} from 'next-sanity/draft-mode';
import {client} from '@/sanity/lib/client';
const handler=defineEnableDraftMode({client:client.withConfig({token:process.env.SANITY_API_READ_TOKEN||''})});
export async function GET(request:Request){
 if(!process.env.SANITY_API_READ_TOKEN)return new Response('Draft preview is not configured',{status:503});
 return handler.GET(request);
}
