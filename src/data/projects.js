import trackrBot from '@/images/projects/trackrBot.png'
import frize from '@/images/projects/frize.png'
import formulator from '@/images/projects/formulator.png'
import shouldreads from '@/images/projects/shouldreads.png'
import total_recall from '@/images/projects/total_recall.png'
import askmandi from '@/images/projects/askmandi.png'
import mentions from '@/images/projects/mentions.png'
import wakeclaude from '@/images/projects/wakeclaude.png'

const data = [
  {
    title: 'Wakeclaude',
    description:
      'A tiny macOS TUI to schedule Claude Code prompts to run while you\'re away from your computer or automatically resume chats after your session limits resets.',
    techUsed: ['Go', 'Bubble Tea', 'Homebrew'],
    image: wakeclaude,
    github: 'https://github.com/rittikbasu/wakeclaude',
    stars: "23"
  },
  {
    title: 'Mentions',
    description:
      'All your books, movies, youtube, music and TV show mentions and recommendations from your whatsapp group chat with the boys in one place so nothing gets lost.',
    techUsed: ['Next.js', 'Pocketbase', 'TMDB', 'OpenAI'],
    image: mentions,

    github: 'https://github.com/rittikbasu/mentions',
  },
  {
    title: 'Ask Mandi',
    description:
      'A chat interface for India’s mandi (agriculture market) data. Ask questions in plain English and get accurate SQL-backed answers in seconds.',
    techUsed: ['Next.js', 'Supabase MCP', 'Redis'],
    image: askmandi,
    link: 'https://askmandi.vercel.app',
    github: 'https://github.com/rittikbasu/askmandi',
  },
  {
    title: 'Total Recall',
    description:
      'The smartest way to recall, summarise or chat with a YouTube video. Just paste the link, hit enter, and ask questions about the video in seconds and get lightning fast answers.',
    techUsed: ['Next.js', 'Supabase', 'Groq', 'AWS Lambda'],
    image: total_recall,
    link: 'https://totalrecall.vercel.app',
  },
  {
    title: 'Formulator',
    description:
      "A Formula 1 client that keeps you updated with all the stats, scores, and standings in a beautifully designed UI that's as fast as your favourite team on race day!",
    techUsed: ['Next.js', 'OpenF1', 'Jolpica API'],
    image: formulator,
    link: 'https://formu1ator.vercel.app',
    github: 'https://github.com/rittikbasu/formulator',
  },
  {
    title: 'Frize',
    description:
      'An interactive dashboard that transforms time-tracking data from Rize into beautiful charts, graphs and insights.',
    techUsed: ['Next.js', 'Tremor UI', 'Supabase', 'OpenAI'],
    image: frize,
    link: 'https://frize.vercel.app',
    github: 'https://github.com/rittikbasu/frize',
  },
  {
    title: 'Price Alert Bot',
    description:
      'A Telegram chatbot that helps you set price alerts for amazon products and sends you an alert message when it reaches the target price.',
    techUsed: ['Python', 'Telegram Bot API', 'ScraperAPI', 'Google Sheets API'],
    image: trackrBot,
    link: 'https://telegram.me/PriceA1ertBot',
    github: 'https://github.com/rittikbasu/trackrBot',
    stars: 45,
  },
  {
    title: 'Shouldreads',
    description:
      'A compilation of the most important books to read, scraped from twitter with natural language search and advanced filtering functionality',
    techUsed: ['Next.js', 'SQLite', 'OpenAI'],
    image: shouldreads,
    link: 'https://shouldreads.vercel.app/',
    github: 'https://github.com/rittikbasu/shouldreads',
  },
]

export default data
