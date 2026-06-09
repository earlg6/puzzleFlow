'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {trackEvent} from '@/lib/analytics';
import {getSupabaseBrowserClient} from '@/lib/supabase';

const surveySchema = z.object({
  frequency: z.enum(['never', 'yearly', 'several', 'monthly']),
  ownedPuzzles: z.enum(['zero', 'oneFive', 'sixTen', 'tenPlus']),
  subscriptionInterest: z.enum(['yes', 'maybe', 'no'])
});

type SurveyValues = z.infer<typeof surveySchema>;

const frequencyOptions = ['never', 'yearly', 'several', 'monthly'] as const;
const ownedOptions = ['zero', 'oneFive', 'sixTen', 'tenPlus'] as const;
const interestOptions = ['yes', 'maybe', 'no'] as const;

export function SurveyForm() {
  const t = useTranslations('survey');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: {isSubmitting},
    reset
  } = useForm<SurveyValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      frequency: 'several',
      ownedPuzzles: 'oneFive',
      subscriptionInterest: 'maybe'
    }
  });

  async function onSubmit(values: SurveyValues) {
    setStatus('idle');
    const supabase = getSupabaseBrowserClient() as any;

    if (!supabase) {
      setStatus('error');
      return;
    }

    const {error} = await supabase.from('survey_responses').insert([
  {
    frequency: values.frequency,
    owned_puzzles: values.ownedPuzzles,
    subscription_interest: values.subscriptionInterest
  }
]);

    if (error) {
      setStatus('error');
      return;
    }

    trackEvent('survey_submit', {interest: values.subscriptionInterest});
    setStatus('success');
    reset();
  }

  return (
    <form className="grid gap-6 rounded-lg border border-gray-200 bg-white p-5 shadow-soft sm:p-7" onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup
        label={t('frequency')}
        name="frequency"
        options={frequencyOptions.map((option) => ({value: option, label: t(`options.${option}`)}))}
        register={register}
      />
      <RadioGroup
        label={t('owned')}
        name="ownedPuzzles"
        options={ownedOptions.map((option) => ({value: option, label: t(`options.${option}`)}))}
        register={register}
      />
      <RadioGroup
        label={t('interest')}
        name="subscriptionInterest"
        options={interestOptions.map((option) => ({value: option, label: t(`options.${option}`)}))}
        register={register}
      />

      <button
        className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {t('submit')}
      </button>

      {status !== 'idle' ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
          role="status"
        >
          {status === 'success' ? t('success') : t('error')}
        </p>
      ) : null}
    </form>
  );
}

type RadioGroupProps = {
  label: string;
  name: keyof SurveyValues;
  options: {value: string; label: string}[];
  register: ReturnType<typeof useForm<SurveyValues>>['register'];
};

function RadioGroup({label, name, options, register}: RadioGroupProps) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-gray-900">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-accent hover:bg-blue-50"
          >
            <input className="h-4 w-4 accent-accent" type="radio" value={option.value} {...register(name)} />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
