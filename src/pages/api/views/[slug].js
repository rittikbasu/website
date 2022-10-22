import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || ''

export const SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey)

export default async (req, res) => {
  if (req.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await SupabaseAdmin.rpc('increment_views', {
      page_slug: req.query.slug,
    })
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`,
    })
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('analytics')
      .select('views')
      .filter('slug', 'eq', req.query.slug)

    if (data) {
      return res.status(200).json({
        total: data[0]?.views || null,
      })
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  })
}
