import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import slugify from 'slugify'
import clsx from 'clsx'

import { Text } from '@/components/RenderNotion'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDatabase } from '@/lib/notion'
import { baseUrl } from '../../seo.config'
import { PageViews } from '@/components/PageViews'

import { AiOutlineEye } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'

const databaseId = process.env.NOTION_BLOG_DB_ID

function Article({ article, index }) {
  const articleTitle = article.properties?.name.title[0].plain_text
  const articleDescription = article.properties.description?.rich_text
  const [status, setStatus] = useState(article.properties.Status?.status?.name)
  const fixedStatus = article.properties.Status?.status?.name
  const slug = slugify(articleTitle).toLowerCase()
  const wordCount = article.properties.wordCount.number
  const readingTime = Math.ceil(wordCount === null ? 0 : wordCount / 265)
  const published = article.properties.publish.checkbox
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

  const [isLoading, setLoading] = useState(true)
  const [statusBg, setStatusBg] = useState('bg-indigo-500/90')
  const delay = ['', 'delay-200', 'delay-500', 'delay-1000']

  const handleClick = () => {
    if (status !== '🌱  Seedling') return
    setStatus('✍🏾  In Progress')
    setStatusBg('bg-orange-500/90')
    setTimeout(() => {
      setStatus(article.properties.Status?.status?.name)
      setStatusBg('bg-indigo-500/90')
    }, 3000)
  }
  return (
    <div
      className={`break-inside group relative h-auto max-w-full rounded-lg border border-gray-200 p-4 transition-all hover:shadow dark:border-gray-700`}
      key={slug}
    >
      <Link
        href={fixedStatus === '🌱  Seedling' ? 'javascript:;' : '/blog/' + slug}
        className={`${
          fixedStatus === '🌱  Seedling'
            ? 'cursor-default group-hover:animate-pulse'
            : 'cursor-pointer'
        }`}
        onClick={handleClick}
      >
        {!!coverImg ? (
          <div className="aspect-w-16 aspect-h-9 relative h-64 w-full">
            <div
              className={`absolute top-0 right-0 z-10 flex h-6 w-24 items-center justify-center rounded-l-md rounded-t-none rounded-tr-md ${statusBg}`}
            >
              <span className="font-poppins text-xs font-medium text-zinc-100">
                {status}
              </span>
            </div>
            <Image
              src={coverImg}
              alt={'Cover Image for ' + articleTitle}
              className={clsx(
                `h-full w-full rounded-md object-cover duration-1000 ease-in-out ${delay[index]}`,
                isLoading ? 'blur-md' : 'blur-0'
              )}
              height="300"
              width="500"
              onLoadingComplete={() => setLoading(false)}
              placeholder="blur"
              blurDataURL={coverImg}
            />
          </div>
        ) : (
          <div
            className={`absolute top-0 right-0 z-10 flex h-6 w-24 items-center justify-center rounded-l-md rounded-t-none rounded-tr-md ${statusBg}`}
          >
            <span className="font-poppins text-xs font-medium text-zinc-100">
              {status}
            </span>
          </div>
        )}
        <h3 className="mt-4 text-lg">
          <div
            className={`font-heading tracking-wider text-zinc-900 no-underline dark:text-zinc-100 ${
              fixedStatus !== '🌱  Seedling' && 'group-hover:underline'
            }`}
          >
            {articleTitle}
          </div>
        </h3>
        <p className="mt-4 block max-w-full break-all text-base text-gray-500 dark:text-gray-400">
          <Text text={articleDescription} />
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center font-poppins text-xs tracking-wide text-zinc-900 dark:text-zinc-100">
            <AiOutlineEye className="mr-2 h-4 w-4" />
            <PageViews slug={slug} />
          </span>
          <span className="flex items-center font-poppins text-xs text-zinc-900 dark:text-zinc-100">
            <BsBook className="mr-2" />
            {readingTime} min read
          </span>
        </div>
      </Link>
    </div>
  )
}

export default function ArticlesIndex({ articles }) {
  // split articles array into two
  const articles1 = articles.slice(0, Math.ceil(articles.length / 2))
  const articles2 = articles.slice(Math.ceil(articles.length / 2))

  return (
    <>
      <NextSeo
        title="Blog"
        description="This is a collection of my long-form thoughts on Web Dev, AI, Blockchains, and more in various stages of completion from Seedling to Evergreen."
        canonical={`${baseUrl}blog/`}
        openGraph={{
          url: `${baseUrl}blog/`,
          title: 'Blog',
          description:
            'This is a collection of my long-form thoughts on Web Dev, AI, Blockchains, and more in various stages of completion from Seedling to Evergreen.',
          images: [
            {
              url: `${baseUrl}api/og?title=Blog`,
              width: 1200,
              height: 600,
              alt: `Blog | Rittik Basu`,
            },
          ],
        }}
      />
      <SimpleLayout
        title="Welcome to my"
        postTitle="Digital Garden."
        intro="This is a collection of my long-form thoughts on Web Dev, AI, Blockchains, and more in various stages of completion from Seedling to Evergreen. I hope you find something that piques your interest."
      >
        <div className="masonry lg:masonry-md md:masonry-sm space-y-10">
          {articles.map((article, index) => (
            <Article key={article.id} article={article} index={index} />
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId, 'date', 'descending')
  return {
    props: {
      articles: database,
    },
    revalidate: 1,
  }
}
