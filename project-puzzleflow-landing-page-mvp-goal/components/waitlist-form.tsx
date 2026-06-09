'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {trackEvent} from '@/lib/analytics';
import {getSupabaseBrowserClient} from '@/lib/supabase';

const waitlistSchema = z.object({
  email: z.string().email(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
  earlyAccess: z.boolean().default(true)
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const t = useTranslations('waitlist');
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const viewed = useRef(false);
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: '',
      city: '',
      country: '',
      earlyAccess: true
    }
  });

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewed.current) {
          viewed.current = true;
          trackEvent('waitlist_view');
        }
      },
      {threshold: 0.35}
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  async function onSubmit(values: WaitlistValues) {
    setStatus('idle');
    const supabase = getSupabaseBrowserClient() as any;

    if (!supabase) {
      setStatus('error');
      return;
    }

    const {error} = await supabase.from('waitlist').insert([
  {
    email: values.email.toLowerCase(),
    city: values.city || null,
    country: values.country || null,
    early_access: values.earlyAccess
  }
]);

    if (error?.code === '23505') {
      setStatus('duplicate');
      return;
    }

    if (error) {
      setStatus('error');
      return;
    }

    trackEvent('waitlist_submit', {early_access: values.earlyAccess});
    setStatus('success');
    reset();
  }

  return (
    <div ref={sectionRef} className="rounded-lg border border-gray-200 bg-white p-5 shadow-soft sm:p-7">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-2 text-sm font-medium text-gray-800">
          {t('email')}
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-blue-100"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email ? <span className="text-sm text-red-600">{t('emailError')}</span> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-gray-800">
            {t('city')}
            <input
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-blue-100"
              type="text"
              autoComplete="address-level2"
              {...register('city')}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-gray-800">
            {t('country')}
            <input
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-blue-100"
              type="text"
              autoComplete="country-name"
              {...register('country')}
            />
          </label>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-gray-800">
          <input className="h-5 w-5 rounded border-gray-300 accent-accent" type="checkbox" {...register('earlyAccess')} />
          {t('earlyAccess')}
        </label>

        <button
          className="rounded-lg bg-accent px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {t('submit')}
        </button>
      </form>

      {status !== 'idle' ? (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
            status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
          role="status"
        >
          {status === 'success' ? t('success') : status === 'duplicate' ? t('duplicate') : t('error')}
        </p>
      ) : null}
    </div>
  );
}
