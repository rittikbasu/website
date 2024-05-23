import { Fragment, useState } from 'react'
import Link from 'next/link'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import Image from 'next/image'
import clsx from 'clsx'
import slugify from 'slugify'

import { Container } from '@/components/Container'
import { Text, renderBlock } from '@/components/RenderNotion'
import { LikeBtn } from '@/components/LikeButton'
import { Prose } from '@/components/Prose'
import { getDatabase, getPage, getBlocks } from '@/lib/notion'
import { baseUrl } from '../../seo.config'
import { UpdateViews } from '@/components/PageViews'

import { BsArrowLeft } from 'react-icons/bs'

const databaseId = process.env.NOTION_BLOG_DB_ID

export default function Post({
  article,
  dateUtc,
  dateFormatted,
  lastEditedUtc,
  lastEditedFormatted,
  blocks,
  slug,
}) {
  const [isLoading, setLoading] = useState(true)
  if (!article || !blocks) {
    return <div />
  }
  const articleTitle = article.properties.name.title
  const articleDescription = article.properties.description.rich_text
  const wordCount = article.properties.wordCount.number
  const readingTime = Math.ceil(wordCount === null ? 0 : wordCount / 265)
  const env = process.env.NODE_ENV

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
  // if env is production, update the views
  if (env === 'production') {
    UpdateViews(slug)
  }
  // console.log(
  //   `${baseUrl}api/og?title=${encodeURIComponent(
  //     articleTitle[0].plain_text
  //   ).replaceAll('&', '%26')}&date=${encodeURIComponent(lastEditedFormatted).replace(
  //     '%2C',
  //     '%2c'
  //   )}`
  // )
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
          images: [
            {
              url: `${baseUrl}api/og?title=${encodeURIComponent(
                articleTitle[0].plain_text
              ).replaceAll('&', '%26')}&date=${encodeURIComponent(
                dateFormatted
              ).replace('%2C', '%2c')}`,
              width: 1200,
              height: 600,
              alt: `Card for ${articleTitle[0].plain_text} page`,
            },
          ],
          type: 'article',
          article: {
            authors: ['Rittik Basu'],
            publishedTime: new Date(dateUtc).toISOString(),
            modifiedTime: new Date(lastEditedUtc).toISOString(),
          },
        }}
      />

      <ArticleJsonLd
        url={`${baseUrl}articles/${slug}/`}
        title={articleTitle[0].plain_text}
        images={[
          `${baseUrl}api/og?title=${encodeURIComponent(
            articleTitle[0].plain_text
          ).replaceAll('&', '%26')}&date=${encodeURIComponent(
            lastEditedFormatted
          ).replace('%2C', '%2c')}`,
        ]}
        datePublished={new Date(dateUtc).toISOString()}
        dateModified={new Date(lastEditedUtc).toISOString()}
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
                <h1 className="mb-4 font-heading text-4xl tracking-wide text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  <Text text={articleTitle} />
                </h1>
                <div className="mb-6 flex items-center font-poppins">
                  <time
                    dateTime={dateFormatted}
                    className="flex items-center text-sm text-zinc-400 dark:text-zinc-500 md:text-base"
                  >
                    {dateFormatted}
                  </time>
                  <span className="mx-2 text-zinc-400 dark:text-zinc-500 md:text-base">
                    •
                  </span>
                  <span className="flex items-center text-xs text-zinc-400 dark:text-zinc-500 md:text-base">
                    {readingTime} min read
                  </span>
                </div>
                {coverImg && (
                  <Image
                    src={coverImg}
                    alt={'Cover Image for ' + articleTitle[0].plain_text}
                    className={clsx(
                      'h-56 w-full rounded-2xl object-cover shadow-md duration-1000 ease-in-out md:h-96',
                      isLoading ? 'blur-xl' : 'blur-0'
                    )}
                    width={1200}
                    height={300}
                    priority
                    onLoad={() => setLoading(false)}
                  />
                )}
                {coverImgCaption && (
                  <figcaption className="mt-3 text-center text-sm italic text-zinc-400 dark:text-zinc-500">
                    Photo by {coverImgCaption}
                  </figcaption>
                )}
              </header>
              <Prose className={coverImg ? 'mt-8' : 'mt-0'}>
                {blocks.map((block) => (
                  <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
              </Prose>
              <div className="my-8 text-center text-sm italic text-zinc-400 dark:text-zinc-500 md:my-12">
                This post was last updated on {lastEditedFormatted}
              </div>
              <LikeBtn variant="bottom" slug={slug} />
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
      params: {
        slug: slugify(
          article.properties.name.title[0].plain_text
        ).toLowerCase(),
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const database = await getDatabase(databaseId, 'date', 'descending')
  const id = database.find(
    (post) =>
      slugify(post.properties.name.title[0].plain_text).toLowerCase() === slug
  ).id
  const article = await getPage(id)
  const lastEditedUtc = article.last_edited_time
  const lastEditedFormatted = new Date(lastEditedUtc).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  )
  const dateUtc = article.properties.date.date.start
  const dateFormatted = new Date(dateUtc).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
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
      dateUtc,
      dateFormatted,
      lastEditedUtc,
      lastEditedFormatted,
      blocks: blocksWithChildren,
      slug: slug,
    },
    revalidate: 1,
  }
}
