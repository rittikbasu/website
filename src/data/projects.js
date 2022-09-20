import netflix from '@/images/logos/netflix.jpg'
import crypto from '@/images/logos/crypto.jpg'
import trackrBot from '@/images/logos/trackrBot.webp'
import twitch from '@/images/logos/twitch.jpg'

const data = [
  {
    title: 'Meme Generator',
    description:
      'A meme generator that allows you to add text to images. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    techUsed: ['react', 'bootstrap', 'python'],
    imageSrc: netflix,
    link: {
      href: 'https://rittikbasu.github.io/meme-generator',
      label: 'github.com',
    },
  },
  {
    title: 'Price Alert Bot',
    description:
      'A bot that sends you an email when the price of a product drops below a certain price. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    imageSrc: trackrBot,
    link: { href: 'https://telegram.me/PriceA1ertBot', label: 'github.com' },
  },
  {
    title: 'Hate Speech Detector',
    description:
      'A machine learning model that detects hate speech in text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Volupta Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    imageSrc: twitch,
    link: { href: 'https://telegram.me/PriceA1ertBot', label: 'telegram' },
  },
  {
    title: 'Text Summarizer',
    description:
      'A machine learning model that summarizes text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    imageSrc: crypto,
    link: {
      href: 'https://summariser.rittikbasu.repl.co/',
      label: 'github.com',
    },
  },
]

export default data

//   {
//     name: 'cosmOS',
//     description:
//       'The operating system that powers our Planetaria space shuttles.',
//     link: { href: '#', label: 'github.com' },
//     logo: trackrBot,
//   },
