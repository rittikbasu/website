import trackrBot from '@/images/projects/trackrBot.png'
import amicon from '@/images/projects/amicon.png'
import yc from '@/images/projects/yc.png'
import frize from '@/images/projects/frize.png'
import formulator from '@/images/projects/formulator.png'

const data = [
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
    title: 'Price Alert Bot  (28 ⭐ on GitHub)',
    description:
      'A Telegram chatbot that helps you set price alerts for amazon products and sends you an alert message when it reaches the target price.',
    techUsed: ['Python', 'Telegram Bot API', 'ScraperAPI', 'Google Sheets API'],
    image: trackrBot,
    link: 'https://telegram.me/PriceA1ertBot',
    github: 'https://github.com/rittikbasu/trackrBot',
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
  {
    title: 'Amicon',
    description:
      'An intra campus networking web app for students of Amity University to connect with each other, see where their peers are from and find and share information more easily.',
    techUsed: ['Javascript', 'Firebase', 'Bootstrap'],
    image: amicon,
    link: 'https://amicon-v1.web.app/',
    github: '',
  },
]

export default data
