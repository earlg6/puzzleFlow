# PuzzleFlow Landing Page MVP

Production-ready waitlist validation landing page for a puzzle subscription service in Romania.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- next-intl
- Supabase
- React Hook Form
- Zod
- GA4 event tracking

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Add your Supabase and GA4 values to `.env`.

4. Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

Run the SQL in `supabase/migrations/001_create_waitlist_and_survey.sql` in your Supabase SQL editor or apply it through the Supabase CLI.

Tables:

- `waitlist`
- `survey_responses`

The `waitlist.email` column is unique, which prevents duplicate registrations.

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=
```

## Analytics Events

The helper `trackEvent()` supports:

- `waitlist_view`
- `waitlist_submit`
- `survey_submit`
- `language_change`
- `cta_click`

## Docker

Run:

```bash
docker compose up
```

The app will be available at `http://localhost:3000`.

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

### Supabase

Before collecting signups, apply the migration and confirm Row Level Security insert policies are active.
