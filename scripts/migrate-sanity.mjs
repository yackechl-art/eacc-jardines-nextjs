import fs from 'node:fs';import path from 'node:path';import {createClient} from '@sanity/client';
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||'production',token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token)throw Error('Set project ID and temporary SANITY_API_WRITE_TOKEN.');
const client=createClient({projectId,dataset,token,apiVersion:'2026-02-01',useCdn:false});
const content=JSON.parse(fs.readFileSync('data/content.json'));const uploaded=new Map();
async function image(file){if(uploaded.has(file))return uploaded.get(file);const asset=await client.assets.upload('image',fs.createReadStream(path.join('public',file)),{filename:path.basename(file)});const value={_type:'image',asset:{_type:'reference',_ref:asset._id}};uploaded.set(file,value);return value;}
function keys(value){if(Array.isArray(value))return value.map((v,i)=>typeof v==='object'&&v?{...keys(v),_key:`item-${i}`} : v);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,keys(v)]));return value;}
for(const language of ['es','en','fr','de','pt']){
 const _id=`siteContent-${language}`;
 if(await client.getDocument(_id)){console.log(`${language}: already exists, preserved`);continue;}
 const d=JSON.parse(fs.readFileSync(`data/locales/${language}.json`));
 d.settings={brandName:'EACC Jardines',phone:'34663318795',displayPhone:'663 318 795',logo:await image('assets/logo.png'),heroImage:await image('assets/jardin-montaje.png')};
 d.serviceItems=await Promise.all(d.serviceItems.map(async(s,i)=>({...s,_type:'serviceItem',image:await image(`assets/service-original-${i+1}.webp`),logoIncluded:i===3})));
 d.projectItems=await Promise.all(d.projectItems.map(async(p,i)=>({...p,_type:'projectItem',image:await image(content.projects[i].image),categories:content.projects[i].categories})));
 await client.createIfNotExists({_id,_type:'siteContent',...keys(d)});console.log(`${language}: migrated`);
}
console.log('Migration complete. Revoke the temporary Editor token.');
