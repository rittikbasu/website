import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs'
import { FaDiscord } from 'react-icons/fa'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { formatDate } from '@/lib/formatDate'

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

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-indigo-600 dark:fill-zinc-400 dark:group-hover:fill-indigo-300" />
    </Link>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>
          Rittik Basu - Web Developer, founder, and amateur astronaut
        </title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
      <Container className="flex h-screen items-center justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Web developer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Spencer, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
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
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={BsGithub}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={BsLinkedin}
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
