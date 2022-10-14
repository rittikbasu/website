import Link from 'next/link'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'

import { BsTwitter, BsGithub } from 'react-icons/bs'
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { baseUrl } from '../seo.config'

function SocialLink({ className, icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className={clsx(
          className,
          'h-5 w-5 fill-zinc-500 transition dark:fill-zinc-400 md:group-hover:fill-indigo-600 md:dark:group-hover:fill-indigo-500'
        )}
      />
    </Link>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <NextSeo canonical={`${baseUrl}`} />
      <Container className="flex h-screen items-center justify-center">
        <div className="max-w-2xl">
          <div className="pl-1 text-sm font-bold tracking-widest text-zinc-600 dark:text-zinc-400 md:text-base">
            Hi, my name is
          </div>
          <h1
            className="py-4 text-4xl font-bold tracking-wide  text-zinc-800 
            dark:text-zinc-100 sm:text-5xl"
          >
            Rittik Basu.
          </h1>
          <h1
            className="animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-[1.6rem]  font-bold 
            tracking-wide text-transparent dark:from-purple-400
            dark:via-indigo-400 dark:to-pink-400 sm:text-5xl"
          >
            I build things for the web.
          </h1>
          <p className="my-6 pl-1 text-base text-zinc-600 dark:text-zinc-400">
            I&#39;m a computer engineer specializing in building & designing
            scalable frontend products with great user experiences. Currently
            I&#39;m working with Next.js & Tailwind and I ocassionally dabble in
            datascience & blockchain technology.
          </p>

          <Button
            href="/about"
            variant="primary"
            className="group ml-1 h-8 tracking-widest ring-2 ring-indigo-400"
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
