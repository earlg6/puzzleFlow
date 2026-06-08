export type AnalyticsEvent =
  | 'waitlist_view'
  | 'waitlist_submit'
  | 'survey_submit'
  | 'language_change'
  | 'cta_click';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', event, params ?? {});
}
