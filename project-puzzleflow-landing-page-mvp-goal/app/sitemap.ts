import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://puzzleflow.ro';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: locale === 'ro' ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === 'ro' ? 1 : 0.8
  }));
}
