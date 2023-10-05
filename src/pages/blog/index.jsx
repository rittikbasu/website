import { NextSeo } from 'next-seo'
import slugify from 'slugify'

import { SimpleLayout } from '@/components/SimpleLayout'
import { BlogCard } from '@/components/BlogCard'
import { getDatabase } from '@/lib/notion'
import { baseUrl } from '../../seo.config'

import { createClient } from '@supabase/supabase-js'

export default function Blog({ articles }) {
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
            <BlogCard key={index} article={article} index={index} />
          ))}
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

  // Fetch pageViews data for each article and update the database object
  for (const article of database) {
    const title = slugify(
      article.properties?.name.title[0].plain_text
    ).toLowerCase()
    const response = await SupabaseAdmin.from('analytics')
      .select('views')
      .filter('slug', 'eq', title)
    const pageViews = response.data[0]?.views || 0

    // Update the article object with the pageViews data
    article.pageViews = pageViews
  }

  return {
    props: {
      articles: database,
    },
    revalidate: 1,
  }
}
