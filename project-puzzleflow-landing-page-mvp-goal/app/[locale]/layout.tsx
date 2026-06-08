import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Inter} from 'next/font/google';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {defaultLocale, locales, type Locale} from '@/i18n/config';
import {Analytics} from '@/components/analytics';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap'
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://puzzleflow.ro';

const title = 'PuzzleFlow - Puzzle subscription library in Romania';
const description =
  'Join the PuzzleFlow waitlist and help validate Romania’s first puzzle subscription library.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  alternates: {
    canonical: '/',
    languages: {
      ro: '/',
      en: '/en',
      uk: '/uk',
      ru: '/ru'
    }
  },
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: 'PuzzleFlow',
    locale: 'ro_RO',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  },
  robots: {
    index: true,
    follow: true
  }
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === defaultLocale ? 'ro' : locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
