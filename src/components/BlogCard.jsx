import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Text } from '@/components/RenderNotion'

import { BsHeartFill } from 'react-icons/bs'
import { GoBook } from 'react-icons/go'
import CountUp from 'react-countup'

export function BlogCard({ article, likes = 0, slug }) {
  const articleTitle = article.properties?.name.title[0].plain_text
  const articleDescription = article.properties.description?.rich_text
  const [status, setStatus] = useState(article.properties.Status?.status?.name)
  const fixedStatus = article.properties.Status?.status?.name
  const wordCount = article.properties.wordCount.number
  const readingTime = Math.ceil(wordCount === null ? 0 : wordCount / 265)
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

  const ArticleWrapper = fixedStatus === '🌱  Seedling' ? 'div' : Link
  const linkProps =
    fixedStatus === '🌱  Seedling' ? {} : { href: '/blog/' + slug }
  return (
    <div
      className={clsx(
        `group relative h-auto max-w-full rounded-lg border border-gray-200 p-4 transition-all hover:shadow dark:border-gray-700`,
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
        <span className="text-xs font-medium font-poppins text-zinc-100">
          {status}
        </span>
      </div>
      <ArticleWrapper
        {...linkProps}
        className={`${
          fixedStatus === '🌱  Seedling'
            ? 'cursor-default opacity-60 dark:opacity-40'
            : 'cursor-pointer'
        }`}
        onClick={handleClick}
      >
        {!!coverImg && (
          <div className="overflow-hidden w-full h-64 rounded-md aspect-w-16 aspect-h-9">
            <Image
              src={coverImg}
              alt={'Cover Image for ' + articleTitle}
              className={clsx(
                `object-cover w-full h-full rounded-md duration-1000 ease-in-out`,
                isLoading ? 'blur-md' : 'blur-0'
              )}
              height="300"
              width="500"
              onLoad={() => setLoading(false)}
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
        <p className="block mt-4 max-w-full text-base text-gray-500 break-all dark:text-gray-400">
          <Text text={articleDescription} />
        </p>
        {fixedStatus !== '🌱  Seedling' && (
          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center font-poppins text-xs tracking-wide text-zinc-900 dark:text-zinc-100">
              <BsHeartFill className="mr-2 h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
              <CountUp end={likes} duration={2} separator="," />
              <span className="ml-1">{likes === 1 ? 'like' : 'likes'}</span>
            </span>
            <span className="flex items-center font-poppins text-xs text-zinc-900 dark:text-zinc-100">
              <GoBook className="mr-2 h-[0.9rem] w-[0.9rem]" />
              {readingTime} min read
            </span>
          </div>
        )}
      </ArticleWrapper>
    </div>
  )
}
