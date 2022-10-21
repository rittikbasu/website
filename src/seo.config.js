export const baseUrl = 'https://www.rittikbasu.tech/'

export default {
  defaultTitle: 'Rittik Basu | Front End Developer',
  titleTemplate: '%s | Rittik Basu',
  description:
    "I'm a computer engineer specializing in building & designing scalable frontend products with great user experiences. Currently I'm working with Next.js & Tailwind and I ocassionally dabble in datascience & blockchain technology.",
  openGraph: {
    title: 'Rittik Basu',
    description:
      "I'm a computer engineer specializing in building & designing scalable frontend products with great user experiences. Currently I'm working with Next.js & Tailwind and I ocassionally dabble in datascience & blockchain technology.",
    images: [
      {
        url: `${baseUrl}api/og?title=Rittik Basu`,
        width: 1200,
        height: 600,
        alt: `Rittik Basu | Front End Developer`,
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
