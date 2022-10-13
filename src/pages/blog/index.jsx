import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import slugify from 'slugify'

import { Text } from '@/components/RenderNotion'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { FormatDate } from '@/components/FormatDate'
import { getDatabase } from '@/lib/notion'
import { baseUrl } from '../../seo.config'

const databaseId = process.env.NOTION_BLOG_DB_ID

function Article({ article }) {
  const date = FormatDate(article.properties.date.date.start)
  const articleTitle = article.properties.name.title[0].plain_text
  const articleDescription = article.properties.description.rich_text
  const slug = slugify(articleTitle).toLowerCase()
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${slug}`}>{articleTitle}</Card.Title>
        <Card.Eyebrow as="time" dateTime={date} className="md:hidden" decorate>
          {date}
        </Card.Eyebrow>
        <Card.Description>
          <Text text={articleDescription} />
        </Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={date} className="mt-1 hidden md:block">
        {date}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <NextSeo
        title="Blog"
        description="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        canonical={`${baseUrl}blog/`}
        openGraph={{
          url: `${baseUrl}blog/`,
          title: 'Blog',
        }}
      />
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
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
