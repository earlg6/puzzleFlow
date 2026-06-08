'use client';

import Link from 'next/link';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import {defaultLocale, localeLabels, locales, type Locale} from '@/i18n/config';
import {trackEvent} from '@/lib/analytics';

function localizePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  const hasLocale = locales.includes(first as Locale);
  const rest = hasLocale ? segments.slice(1) : segments;

  if (nextLocale === defaultLocale) {
    return `/${rest.join('/')}` || '/';
  }

  return `/${[nextLocale, ...rest].join('/')}`;
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-gray-200 bg-white p-1 text-xs font-semibold text-gray-600">
      {locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={localizePath(pathname, nextLocale)}
          onClick={() => trackEvent('language_change', {from: locale, to: nextLocale})}
          className={`rounded-full px-2.5 py-1.5 transition ${
            locale === nextLocale ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
          }`}
          aria-current={locale === nextLocale ? 'page' : undefined}
        >
          {localeLabels[nextLocale]}
        </Link>
      ))}
    </div>
  );
}
