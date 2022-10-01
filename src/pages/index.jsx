import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'

import { BsTwitter, BsGithub } from 'react-icons/bs'
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { FormatDate } from '@/components/FormatDate'
import { baseUrl } from '../seo.config'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {article.date}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

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
          <h1
            className="animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-4xl  font-bold 
            tracking-wide text-transparent dark:from-purple-400
            dark:via-indigo-400 dark:to-pink-400 sm:text-5xl"
          >
            Web Developer, <br className="md:hidden" /> Designer & Amateur Music
            Composer
            {/* <div class="words">
              <span className="rotate-custom">Web developer</span>
              <span className="rotate-custom">Founder</span>
              <span className="rotate-custom">Amateur Music Composer</span>
            </div> */}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Rittik Basu, a computer engineer and technology enthusiast based
            in India. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com"
              aria-label="Follow on Twitter"
              icon={BsTwitter}
            />
            <SocialLink
              href="https://instagram.com"
              aria-label="Follow on Instagram"
              icon={FaDiscord}
              className="h-[1.35rem] w-[1.35rem]"
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={BsGithub}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={FaLinkedinIn}
            />
          </div>
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
