export const locales = ['ro', 'en', 'uk', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ro';

export const localeLabels: Record<Locale, string> = {
  ro: 'RO',
  en: 'EN',
  uk: 'UA',
  ru: 'RU'
};
