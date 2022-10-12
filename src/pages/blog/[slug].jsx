import { Fragment, useState } from 'react'
import Link from 'next/link'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import Image from 'next/future/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Text, renderBlock } from '@/components/RenderNotion'
import { Prose } from '@/components/Prose'
import { FormatDate } from '@/components/FormatDate'
import { getDatabase, getPage, getBlocks } from '@/lib/notion'
import { baseUrl } from '../../seo.config'

import { BsArrowLeft } from 'react-icons/bs'

const databaseId = process.env.NOTION_BLOG_DB_ID

export default function Post({ article, blocks, slug }) {
  const [isLoading, setLoading] = useState(true)
  if (!article || !blocks) {
    return <div />
  }
  const date = FormatDate(article.properties.date.date.start)
  const articleTitle = article.properties.name.title
  const articleDescription = article.properties.description.rich_text
  const coverImgFn = () => {
    if (article.cover) {
      const imgType = article.cover.type
      const image =
        imgType === 'external'
          ? article.cover.external.url
          : article.cover.file.url
      return image
    } else {
      return false
    }
  }
  const coverImg = coverImgFn()
  const coverImgCaption = article.properties.coverImgCaption.rich_text.length
    ? article.properties.coverImgCaption.rich_text[0].plain_text
    : false
  return (
    <div>
      <NextSeo
        title={articleTitle[0].plain_text}
        description={articleDescription[0].plain_text}
        canonical={`${baseUrl}articles/${slug}/`}
        openGraph={{
          url: `${baseUrl}articles/${slug}/`,
          title: articleTitle[0].plain_text,
          description: articleDescription[0].plain_text,
          type: 'article',
          article: {
            authors: ['Rittik Basu'],
            publishedTime: new Date(
              article.properties.date.date.start
            ).toISOString(),
          },
        }}
      />
      <ArticleJsonLd
        url={`${baseUrl}articles/${slug}/`}
        title={articleTitle[0].plain_text}
        datePublished={new Date(
          article.properties.date.date.start
        ).toISOString()}
        authorName="Rittik Basu"
        description={articleDescription[0].plain_text}
      />
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              aria-label="Go back to articles"
              className="group mb-8 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 md:flex lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <BsArrowLeft className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300" />
            </Link>
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
                {coverImg && (
                  <Image
                    src={coverImg}
                    alt={articleTitle[0].plain_text}
                    className={clsx(
                      'h-48 w-full rounded-2xl object-cover shadow-md duration-1000 ease-in-out md:h-72',
                      isLoading ? 'blur-xl' : 'blur-0'
                    )}
                    width={1200}
                    height={300}
                    layout="fill"
                    priority
                    onLoadingComplete={() => setLoading(false)}
                  />
                )}
                {coverImgCaption && (
                  <figcaption className="mt-3 text-center text-sm italic text-zinc-400 dark:text-zinc-500">
                    Photo by Luke Lung on Unsplash
                  </figcaption>
                )}
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
  const database = await getDatabase(databaseId, 'date', 'descending')
  return {
    paths: database.map((article) => ({
      params: { slug: article.properties.slug.rich_text[0].plain_text },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const database = await getDatabase(databaseId, 'date', 'descending')
  const id = database.find(
    (post) => post.properties.slug.rich_text[0].plain_text === slug
  ).id
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
      slug: slug,
    },
    revalidate: 1,
  }
}
