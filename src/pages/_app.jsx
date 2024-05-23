import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'
import 'highlight.js/styles/github-dark.css'
import { DefaultSeo } from 'next-seo'
import seoOptions from '../seo.config'
import * as gtag from '@/lib/gtag'
import { Work_Sans } from 'next/font/google'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

const calSans = localFont({
  display: 'swap',
  subsets: ['latin'],
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-calsans',
})

const workSans = Work_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-worksans',
  weight: ['400', '500', '700'],
})

const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '700'],
})

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)
  const pageRouter = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url)
    }
    pageRouter.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      pageRouter.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [pageRouter.events])

  return (
    <main
      className={`${workSans.variable} ${poppins.variable} ${calSans.variable} font-sans`}
    >
      <DefaultSeo {...seoOptions} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative selection:bg-indigo-500 selection:text-white dark:selection:bg-indigo-800">
        <Header previousPathname={previousPathname} />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
      </div>
    </main>
  )
}
