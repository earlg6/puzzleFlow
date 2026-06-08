export function SchemaJson() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://puzzleflow.ro';
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PuzzleFlow',
      url: baseUrl,
      sameAs: ['https://www.tiktok.com/@puzzleflow', 'https://www.instagram.com/puzzleflow', 'https://www.facebook.com/puzzleflow']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PuzzleFlow',
      url: baseUrl,
      inLanguage: ['ro', 'en', 'uk', 'ru']
    }
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}
