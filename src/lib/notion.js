import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId, sortProperty, sort) => {
  // const response = await notion.databases.query({
  //   database_id: databaseId,
  // });
  const env = process.env.NODE_ENV
  const status = env === 'development' ? 'preview' : 'publish'
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: status,
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: sortProperty,
        direction: sort,
      },
    ],
  })
  return response.results
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}
