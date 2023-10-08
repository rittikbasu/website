export const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

const seoConfig = {
  defaultTitle: 'Rittik Basu | Full Stack Developer',
  titleTemplate: '%s | Rittik Basu',
  description:
    'A full-stack engineer specializing in building & designing scalable applications with great user experience.',
  openGraph: {
    title: 'Rittik Basu',
    description:
      'A full-stack engineer specializing in building & designing scalable applications with great user experience.',
    images: [
      {
        url: `${baseUrl}api/og?title=home`,
        width: 1200,
        height: 600,
        alt: `Rittik Basu | Full Stack Developer`,
      },
    ],
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Rittik Basu',
  },
  twitter: {
    handle: '@_rittik',
    site: '@_rittik',
    cardType: 'summary_large_image',
  },
}

export default seoConfig
