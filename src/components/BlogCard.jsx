import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import slugify from 'slugify'

import { Text } from '@/components/RenderNotion'

import { AiOutlineEye } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import CountUp from 'react-countup'

export function BlogCard({ article }) {
  const articleTitle = article.properties?.name.title[0].plain_text
  const articleDescription = article.properties.description?.rich_text
  const [status, setStatus] = useState(article.properties.Status?.status?.name)
  const fixedStatus = article.properties.Status?.status?.name
  const slug = slugify(articleTitle).toLowerCase()
  const wordCount = article.properties.wordCount.number
  const readingTime = Math.ceil(wordCount === null ? 0 : wordCount / 265)
  const published = article.properties.publish.checkbox
  const views = article.pageViews
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

  const handleClick = (e) => {
    if (status !== '🌱  Seedling') return
    e.preventDefault()
    setStatus('✍🏾  In Progress')
    setStatusBg('bg-pink-600/80 dark:bg-pink-500/80 duration-[5000ms]')
    setTimeout(() => {
      setStatus(article.properties.Status?.status?.name)
      setStatusBg('bg-indigo-500/90 duration-[3000ms]')
    }, 3000)
  }
  return (
    <div
      className={clsx(
        `break-inside group relative h-auto max-w-full rounded-lg border border-gray-200 p-4 transition-all hover:shadow dark:border-gray-700`,
        fixedStatus === '🌱  Seedling' &&
          'border-gray-200/60 dark:border-gray-700/40'
      )}
      key={slug}
    >
      <div
        className={clsx(
          `absolute z-10 flex h-6 w-24 items-center justify-center rounded-l-md rounded-t-none rounded-tr-md`,
          !!coverImg ? 'top-4 right-4' : 'top-0 right-0',
          fixedStatus === '🌱  Seedling' ? statusBg : 'bg-indigo-500/90'
        )}
      >
        <span className="font-poppins text-xs font-medium text-zinc-100">
          {status}
        </span>
      </div>
      <Link
        href={fixedStatus === '🌱  Seedling' ? '' : '/blog/' + slug}
        className={`${
          fixedStatus === '🌱  Seedling'
            ? 'cursor-default opacity-60 dark:opacity-40'
            : 'cursor-pointer'
        }`}
        onClick={handleClick}
      >
        {!!coverImg && (
          <div className="aspect-w-16 aspect-h-9 relative h-64 w-full">
            <Image
              src={coverImg}
              alt={'Cover Image for ' + articleTitle}
              className={clsx(
                `h-full w-full rounded-md object-cover duration-1000 ease-in-out`,
                isLoading ? 'blur-md' : 'blur-0'
              )}
              height="300"
              width="500"
              onLoadingComplete={() => setLoading(false)}
              placeholder="blur"
              blurDataURL={coverImg}
            />
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
        {fixedStatus !== '🌱  Seedling' && (
          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center font-poppins text-xs tracking-wide text-zinc-900 dark:text-zinc-100">
              <AiOutlineEye className="mr-2 h-4 w-4" />
              <CountUp end={views} duration={3} />
            </span>
            <span className="flex items-center font-poppins text-xs text-zinc-900 dark:text-zinc-100">
              <BsBook className="mr-2" />
              {readingTime} min read
            </span>
          </div>
        )}
      </Link>
    </div>
  )
}
