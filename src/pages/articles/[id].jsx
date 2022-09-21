import { Fragment } from 'react'
import Head from 'next/head'

import { getDatabase, getPage, getBlocks } from '@/lib/notion'
import { databaseId } from './index.jsx'

import { Container } from '@/components/Container'
import { Text, renderBlock } from '@/components/RenderNotion'
import { Prose } from '@/components/Prose'
import { FormatDate } from '@/components/FormatDate'

import { BsArrowLeft } from 'react-icons/bs'

export default function Post({ article, blocks }) {
  if (!article || !blocks) {
    return <div />
  }
  const date = FormatDate(article.created_time)
  const articleTitle = article.properties.name.title
  const articleDescription = article.properties.description.rich_text
  return (
    <div>
      <Head>
        <title>{`${articleTitle[0].plain_text} - Rittik Basu`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={articleDescription[0].plain_text} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <a href="/articles">
              <button
                type="button"
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <BsArrowLeft className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300" />
              </button>
            </a>
            <article>
              <header className="flex flex-col">
                <h1 className="my-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  <Text text={articleTitle} />
                </h1>
                <time
                  dateTime={date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{date}</span>
                </time>
              </header>
              <Prose className="mt-8">
                {blocks.map((block) => (
                  <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
              </Prose>
            </article>
          </div>
        </div>
      </Container>
    </div>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((article) => ({
      params: { id: article.id },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const article = await getPage(id)
  const blocks = await getBlocks(id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children
    }
    return block
  })

  return {
    props: {
      article,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
