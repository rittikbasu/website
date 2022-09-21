import netflix from '@/images/projects/memeGenerator.gif'
import summariser from '@/images/projects/summariser.gif'
import trackrBot from '@/images/projects/trackrBot.webp'
import amicon from '@/images/projects/amicon.gif'

const data = [
  {
    title: 'Meme Generator',
    description:
      'A simple meme generator that lets you choose a template from the 100 most popular memes from Imgflip and create your own meme by adding text to it.',
    techUsed: ['react', 'bootstrap', 'python'],
    imageSrc: netflix,
    link: {
      href: 'https://rittikbasu.github.io/meme-generator',
      label: 'Website',
    },
    github: 'https://github.com/rittikbasu/meme-generator',
  },
  {
    title: 'Price Alert Bot',
    description:
      'A Telegram chatbot that helps you set price alerts for amazon products and sends you an alert message when it reaches the target price.',
    imageSrc: trackrBot,
    link: { href: 'https://telegram.me/PriceA1ertBot', label: 'Telegram' },
    github: 'https://github.com/rittikbasu/trackrBot',
  },
  {
    title: 'Amicon.',
    description:
      'An intra campus networking web app for students of Amity University Mumbai to connect with each other and share information more conveniently.',
    imageSrc: amicon,
    link: { href: 'https://amicon-v1.web.app/', label: 'Website' },
    github: '',
  },
  {
    title: 'Text Summarizer',
    description:
      'Summarises text content from a web article or user input and provides an elegant summary of the provided text using extractive summarization.',
    imageSrc: summariser,
    link: {
      href: 'https://summariser.rittikbasu.repl.co/',
      label: 'Website',
    },
    github: 'https://github.com/rittikbasu/text-summarizer',
  },
]

export default data
