import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";
import 'server-only';
import { defineQuery, stegaClean } from 'next-sanity';
import { sanityFetch } from './live';
import { sanityConfigured } from './client';
import { getDictionary, defaultSettings, type Dictionary, type Locale } from '@/lib/i18n';
export const CONTENT_QUERY = defineQuery(`*[_type == "siteContent" && _id == "siteContent-" + $locale][0]{
  ...,
  settings{..., "logoUrl":coalesce(logo.asset->url, logoUrl), "heroImageUrl":coalesce(heroImage.asset->url, heroImageUrl)},
  serviceItems[]{..., "imageUrl":coalesce(image.asset->url, imageUrl)},
  projectItems[]{..., "imageUrl":coalesce(image.asset->url, imageUrl)}
}`);
export async function loadContent(locale: Locale, stega = true): Promise<Dictionary> {
  const fallback = getDictionary(locale);
  if (!sanityConfigured) return {...fallback, settings: defaultSettings};
  const {data: result} = await sanityFetch({query: CONTENT_QUERY, params: {locale}, stega});
  const data = result as Partial<Dictionary> | null;
  if (!data) throw new Error(`Missing Sanity content for ${locale}. Run the CMS migration.`);
  const imageUrl = (item: any) => item?.image?.asset ? createImageUrlBuilder(client).image(item.image).width(1600).auto("format").url() : item?.imageUrl;
  const settingsMedia = (data.settings || {}) as any;
  return {...fallback, ...data, settings: {...defaultSettings, ...data.settings, phone: stegaClean(data.settings?.phone || defaultSettings.phone), logoUrl: settingsMedia.logo?.asset ? createImageUrlBuilder(client).image(settingsMedia.logo).width(600).url() : settingsMedia.logoUrl || defaultSettings.logoUrl, heroImageUrl: settingsMedia.heroImage?.asset ? createImageUrlBuilder(client).image(settingsMedia.heroImage).width(1800).auto("format").url() : settingsMedia.heroImageUrl || defaultSettings.heroImageUrl},
    serviceItems: fallback.serviceItems.map((item, i) => ({...item, ...data.serviceItems?.[i], imageUrl: imageUrl(data.serviceItems?.[i])})),
    projectItems: fallback.projectItems.map((item, i) => ({...item, ...data.projectItems?.[i], imageUrl: imageUrl(data.projectItems?.[i]), categories: data.projectItems?.[i]?.categories ? stegaClean(data.projectItems[i].categories) : undefined})),
  } as Dictionary;
}
