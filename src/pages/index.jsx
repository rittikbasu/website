import Link from 'next/link'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { baseUrl } from '../seo.config'

export default function Home({ articles }) {
  return (
    <>
      <NextSeo canonical={`${baseUrl}`} />
      <Container className="-mt-[64px] flex h-screen items-center justify-center md:-mt-10">
        <div className="max-w-2xl">
          <div className="animate-fade-in pb-4 pl-1 font-heading text-sm font-bold tracking-widest text-zinc-600 dark:text-zinc-400 md:text-base">
            Hi, my name is
          </div>
          <div className="animate-glow hidden h-px animate-fade-left bg-gradient-to-r from-zinc-500/0 via-zinc-300/50 to-zinc-500/0 dark:from-zinc-500/0 dark:via-zinc-500/50 dark:to-zinc-500/0 md:block" />
          <h1
            className="md:dark:text-edge-outline-dark md:text-edge-outline-light text-edge-outline-light-sm dark:text-edge-outline-dark-sm z-10 animate-title bg-zinc-900 bg-clip-text  font-heading 
            text-4xl font-bold tracking-wider text-zinc-800 text-transparent duration-1000 dark:bg-white sm:text-5xl"
          >
            Rittik Basu.
          </h1>
          <div className="animate-glow hidden h-px animate-fade-right bg-gradient-to-r from-zinc-500/0 via-zinc-300/50 to-zinc-500/0 dark:from-zinc-500/0 dark:via-zinc-500/50 dark:to-zinc-500/0 md:block" />
          <div className="animate-fade-in">
            <h1
              className="animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text pt-4 font-heading text-[1.6rem]  font-bold 
            tracking-wider text-transparent dark:from-purple-400
            dark:via-indigo-400 dark:to-pink-400 sm:text-5xl"
            >
              I build things for the web.
            </h1>
          </div>
          <p className="mt-4 mb-6 animate-fade-in pl-1 text-base text-zinc-600 dark:text-zinc-400 md:my-6">
            I&apos;m a full-stack engineer specializing in building & designing
            scalable applications with great user experience. My current tech
            stack includes Next.js, Typescript & Tailwind and I occasionally
            dabble in AI & blockchain technology.
          </p>

          <Button
            href="/about"
            variant="primary"
            className="group ml-1 h-8 animate-fade-in tracking-widest ring-2 ring-indigo-400"
          >
            Learn More
          </Button>
        </div>
      </Container>
    </>
  )
}

// export async function getStaticProps() {
//   if (process.env.NODE_ENV === 'production') {
//     await generateRssFeed()
//   }

//   return {
//     props: {
//       articles: (await getAllArticles())
//         .slice(0, 4)
//         .map(({ component, ...meta }) => meta),
//     },
//   }
// }
