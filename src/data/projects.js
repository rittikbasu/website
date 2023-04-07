import memeGenerator from '@/images/projects/memeGenerator.png'
import summariser from '@/images/projects/summariser.png'
import trackrBot from '@/images/projects/trackrBot.png'
import amicon from '@/images/projects/amicon.png'
import yc from '@/images/projects/yc.png'

const data = [
  {
    title: 'Price Alert Bot  (25⭐ on GitHub)',
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
    link: 'https://yc.rittikbasu.tech',
    github: 'https://github.com/rittikbasu/yc-job-client',
  },
  {
    title: 'Text Summarizer',
    description:
      'Summarises text content from a web article or user input and provides an elegant summary of the provided text using extractive summarization.',
    image: summariser,
    techUsed: [
      'Python',
      'Flask',
      'Natural Language Processing',
      'Machine Learning',
    ],
    link: 'https://summariser.rittikbasu.repl.co/',
    github: 'https://github.com/rittikbasu/text-summarizer',
  },
  {
    title: 'Amicon',
    description:
      'An intra campus networking web app for students of Amity University Mumbai to connect with each other and share information more conveniently.',
    techUsed: ['Javascript', 'Firebase', 'Bootstrap'],
    image: amicon,
    link: 'https://amicon-v1.web.app/',
    github: '',
  },
  {
    title: 'Meme Generator',
    description:
      'A simple meme generator that lets you choose a template from the 100 most popular memes from Imgflip and create your own meme by adding text to it.',
    techUsed: ['React', 'Bootstrap', 'Python', 'ImgflipAPI'],
    image: memeGenerator,
    link: 'https://rittikbasu.github.io/meme-generator',
    github: 'https://github.com/rittikbasu/meme-generator',
  },
]

export default data
