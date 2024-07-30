import trackrBot from '@/images/projects/trackrBot.png'
import yc from '@/images/projects/yc.png'
import frize from '@/images/projects/frize.png'
import formulator from '@/images/projects/formulator.png'
import shouldreads from '@/images/projects/shouldreads.png'
import total_recall from '@/images/projects/total_recall.png'

const data = [
  {
    title: 'Total Recall',
    description:
      'The smartest way to recall, summarise or chat with a YouTube video. Just paste the link, hit enter, and ask questions about the video in seconds and get lightning fast answers.',
    techUsed: ['Next.js', 'Tailwind', 'Supabase', 'Groq', 'AWS Lambda'],
    image: total_recall,
    link: 'https://totalrecall.rittik.io',
  },
  {
    title: 'Formulator',
    description:
      "A Formula 1 client that keeps you updated with all the stats, scores, and standings in a beautifully designed UI that's as fast as your favourite team on race day!",
    techUsed: ['Next.js', 'Tailwind', 'OpenF1', 'Ergast'],
    image: formulator,
    link: 'https://formu1ator.vercel.app',
    github: 'https://github.com/rittikbasu/formulator',
  },
  {
    title: 'Frize',
    description:
      'An interactive dashboard that transforms time-tracking data from Rize into beautiful charts, graphs and insights.',
    techUsed: ['Next.js', 'Tailwind', 'Tremor UI', 'Supabase', 'OpenAI'],
    image: frize,
    link: 'https://frize.rittik.io',
    github: 'https://github.com/rittikbasu/frize',
  },
  {
    title: 'Price Alert Bot  (31 ⭐ on GitHub)',
    description:
      'A Telegram chatbot that helps you set price alerts for amazon products and sends you an alert message when it reaches the target price.',
    techUsed: ['Python', 'Telegram Bot API', 'ScraperAPI', 'Google Sheets API'],
    image: trackrBot,
    link: 'https://telegram.me/PriceA1ertBot',
    github: 'https://github.com/rittikbasu/trackrBot',
  },
  {
    title: 'Shouldreads',
    description:
      'A compilation of the most important books to read, scraped from twitter with natural language search and advanced filtering functionality',
    techUsed: ['Next.js', 'Tailwind', 'SQLite', 'OpenAI'],
    image: shouldreads,
    link: 'https://shouldreads.vercel.app/',
    github: 'https://github.com/rittikbasu/shouldreads',
  },
  {
    title: 'Job Client for Hacker News',
    description:
      'A fast and lightweight job client for Hacker News that helps you find Y Combinator startups that are currently hiring.',
    techUsed: ['Next.js', 'Tailwind', 'Hacker News API'],
    image: yc,
    link: 'https://yc.rittik.io',
    github: 'https://github.com/rittikbasu/yc-job-client',
  },
]

export default data
