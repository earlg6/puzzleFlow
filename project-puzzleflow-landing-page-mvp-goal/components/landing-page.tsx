'use client';

import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Handshake,
  LibraryBig,
  PackageCheck,
  Puzzle,
  RefreshCcw,
  RotateCcw,
  Sparkles,
  Users,
  WalletCards
} from 'lucide-react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import type {ReactNode} from 'react';
import {LanguageSwitcher} from '@/components/language-switcher';
import {SchemaJson} from '@/components/schema-json';
import {SurveyForm} from '@/components/survey-form';
import {WaitlistForm} from '@/components/waitlist-form';
import {trackEvent} from '@/lib/analytics';

const problemIcons = [CircleDollarSign, Boxes, RotateCcw];
const stepIcons = [Puzzle, CheckCircle2, RefreshCcw, PackageCheck];
const benefitIcons = [WalletCards, Boxes, Sparkles, Users, RefreshCcw, LibraryBig];

export function LandingPage() {
  const nav = useTranslations('nav');
  const hero = useTranslations('hero');
  const problem = useTranslations('problem');
  const how = useTranslations('how');
  const benefits = useTranslations('benefits');
  const survey = useTranslations('survey');
  const waitlist = useTranslations('waitlist');
  const faq = useTranslations('faq');
  const footer = useTranslations('footer');

  const problemCards = problem.raw('cards') as {title: string}[];
  const steps = how.raw('steps') as {title: string; text: string}[];
  const benefitItems = benefits.raw('items') as {title: string; text: string}[];
  const faqItems = faq.raw('items') as {question: string; answer: string}[];

  return (
    <>
      <SchemaJson />
      <div className="min-h-screen bg-white text-gray-950">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="#top"
              className="flex items-center gap-2 text-lg font-black tracking-normal text-gray-950"
              onClick={() => trackEvent('cta_click', {target: 'logo'})}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
                <Puzzle className="h-5 w-5" aria-hidden="true" />
              </span>
              PuzzleFlow
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-gray-700 md:flex" aria-label="Primary">
              <a className="transition hover:text-accent" href="#how-it-works">
                {nav('howItWorks')}
              </a>
              <a className="transition hover:text-accent" href="#benefits">
                {nav('benefits')}
              </a>
              <a className="transition hover:text-accent" href="#faq">
                {nav('faq')}
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <a
                className="hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
                href="#waitlist"
                onClick={() => trackEvent('cta_click', {target: 'header_waitlist'})}
              >
                {nav('join')}
              </a>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="overflow-hidden border-b border-gray-100">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
              <div className="max-w-3xl">
                <p className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-accent">
                  PuzzleFlow Romania
                </p>
                <h1 className="text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-5xl lg:text-6xl">
                  {hero('headline')}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">{hero('subheadline')}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#waitlist"
                    onClick={() => trackEvent('cta_click', {target: 'hero_waitlist'})}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {hero('primary')}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="#survey"
                    onClick={() => trackEvent('cta_click', {target: 'hero_survey'})}
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:border-accent hover:text-accent"
                  >
                    {hero('secondary')}
                  </a>
                </div>
              </div>

              <div>
                <div className="grid gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-soft">
                  {['#2563eb', '#111827', '#e5e7eb', '#60a5fa', '#9ca3af', '#dbeafe', '#1f2937', '#bfdbfe', '#f3f4f6'].map(
                    (color, index) => (
                      <div key={`${color}-${index}`} className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map((cell) => (
                          <div
                            key={cell}
                            className="aspect-square rounded-lg border border-white shadow-sm"
                            style={{backgroundColor: index % 2 === cell ? color : '#ffffff'}}
                          />
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <Section eyebrow={problem('eyebrow')} title={problem('title')} id="problem">
            <div className="grid gap-4 md:grid-cols-3">
              {problemCards.map((card, index) => {
                const Icon = problemIcons[index];
                return (
                  <article key={card.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <Icon className="mb-5 h-8 w-8 text-accent" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-gray-950">{card.title}</h3>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section eyebrow={how('eyebrow')} title={how('title')} id="how-it-works" tone="muted">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <article key={step.title} className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-accent">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-bold text-gray-950">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section eyebrow={benefits('eyebrow')} title={benefits('title')} id="benefits">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefitItems.map((item, index) => {
                const Icon = benefitIcons[index];
                return (
                  <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <Icon className="mb-5 h-7 w-7 text-accent" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-gray-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section eyebrow={survey('eyebrow')} title={survey('title')} id="survey" tone="muted">
            <div className="mx-auto max-w-3xl">
              <SurveyForm />
            </div>
          </Section>

          <Section eyebrow={waitlist('eyebrow')} title={waitlist('title')} id="waitlist">
            <div className="mx-auto max-w-3xl">
              <WaitlistForm />
            </div>
          </Section>

          <Section eyebrow={faq('eyebrow')} title={faq('title')} id="faq" tone="muted">
            <div className="mx-auto grid max-w-4xl gap-4">
              {faqItems.map((item) => (
                <details key={item.question} className="group rounded-lg border border-gray-200 bg-white p-5">
                  <summary className="cursor-pointer list-none text-base font-bold text-gray-950 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span className="text-accent transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-gray-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </Section>
        </main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-gray-600 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <Link href="#top" className="text-lg font-black text-gray-950">
                PuzzleFlow
              </Link>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy" className="hover:text-accent">
                  {footer('privacy')}
                </a>
                <a href="/terms" className="hover:text-accent">
                  {footer('terms')}
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
              <p>{footer('copyright')}</p>
              <div className="flex gap-4">
                <a href="https://www.tiktok.com" className="hover:text-accent">
                  TikTok
                </a>
                <a href="https://www.instagram.com" className="hover:text-accent">
                  Instagram
                </a>
                <a href="https://www.facebook.com" className="hover:text-accent">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: 'white' | 'muted';
};

function Section({id, eyebrow, title, children, tone = 'white'}: SectionProps) {
  return (
    <section id={id} className={tone === 'muted' ? 'bg-gray-50' : 'bg-white'}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-normal text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
