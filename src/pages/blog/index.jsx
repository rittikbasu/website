import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import slugify from 'slugify'

import { SimpleLayout } from '@/components/SimpleLayout'
import { BlogCard } from '@/components/BlogCard'
import { getDatabase } from '@/lib/notion'
import { SupabaseClient } from '@/lib/initSupabase'
import { baseUrl } from '../../seo.config'

import { createClient } from '@supabase/supabase-js'

function getArticleSlug(article) {
  return slugify(article.properties?.name.title[0].plain_text, {
    strict: true,
    lower: true,
  })
}

function distributeToColumns(items, numColumns) {
  const columns = Array.from({ length: numColumns }, () => [])

  items.forEach((item, index) => {
    columns[index % numColumns].push(item)
  })

  return columns
}

function renderColumns(columns) {
  return columns.map((column, columnIndex) => (
    <div key={`column-${columnIndex}`} className="space-y-10">
      {column.map(({ article, slug, likes }) => (
        <BlogCard
          key={article.id ?? slug}
          article={article}
          slug={slug}
          likes={likes}
        />
      ))}
    </div>
  ))
}

export default function Blog({ articles }) {
  const [likesBySlug, setLikesBySlug] = useState(() =>
    Object.fromEntries(
      articles.map((article) => [getArticleSlug(article), article.likes ?? 0])
    )
  )

  useEffect(() => {
    let isMounted = true

    const hydrateLikes = async () => {
      const articleSlugs = articles.map(getArticleSlug)

      if (!articleSlugs.length) return

      const { data } = await SupabaseClient.from('analytics')
        .select('slug, likes')
        .in('slug', articleSlugs)

      if (!isMounted || !data) return

      setLikesBySlug((prevLikes) => {
        const nextLikes = { ...prevLikes }

        data.forEach(({ slug, likes }) => {
          nextLikes[slug] = likes ?? 0
        })

        return nextLikes
      })
    }

    hydrateLikes()

    return () => {
      isMounted = false
    }
  }, [articles])

  const articleCards = articles.map((article) => {
    const slug = getArticleSlug(article)

    return {
      article,
      slug,
      likes: likesBySlug[slug] ?? article.likes ?? 0,
    }
  })

  const tabletColumns = distributeToColumns(articleCards, 2)
  const desktopColumns = distributeToColumns(articleCards, 3)

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
        <div className="space-y-10 md:hidden">
          {articleCards.map(({ article, slug, likes }) => (
            <BlogCard
              key={article.id ?? slug}
              article={article}
              slug={slug}
              likes={likes}
            />
          ))}
        </div>
        <div className="hidden grid-cols-2 gap-6 md:grid lg:hidden">
          {renderColumns(tabletColumns)}
        </div>
        <div className="hidden grid-cols-3 gap-6 lg:grid">
          {renderColumns(desktopColumns)}
        </div>
      </SimpleLayout>
    </>
  )
}
export const getStaticProps = async () => {
  const databaseId = process.env.NOTION_BLOG_DB_ID
  const database = await getDatabase(databaseId, 'date', 'descending')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || ''
  const SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey)

  // Fetch likes for each article and attach them to the article object.
  for (const article of database) {
    const title = slugify(article.properties?.name.title[0].plain_text, {
      strict: true,
      lower: true,
    })
    const response = await SupabaseAdmin.from('analytics')
      .select('likes')
      .filter('slug', 'eq', title)
    const likes = response.data?.[0]?.likes ?? 0

    article.likes = likes
  }

  return {
    props: {
      articles: database,
    },
    revalidate: 1,
  }
}
