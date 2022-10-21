import Image from 'next/future/image'
import Link from 'next/link'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'

import { BsTwitter, BsGithub, BsArrowDown } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa'
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTailwindcss,
  SiBootstrap,
  SiFirebase,
  SiJupyter,
  SiFlask,
} from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import portraitImage from '@/images/avatar.png'
import { baseUrl } from '../seo.config'
import { saveAs } from 'file-saver'

const saveFile = () => {
  saveAs(
    'https://doc-14-00-docs.googleusercontent.com/docs/securesc/9mq753fect86fvn38vmak7jpo737dm49/e55tnlohfpsiple5jlanc43vv3nighsc/1666394400000/08118691172474006346/08118691172474006346/1Du5LHbJitFLXPWbJ00B1b8YdKJ2J8ooa?e=download&ax=ALW9-sDGkIutcdfSfwL1xRIkzQWwkhUz_RUz8VmWewzOAl-YOyvsalRDC9PGkaliW38EAbi6dyrq4_0zApnmN5C1VGCS0-QoNJlvE9_6KZxuE26hwqje7rIPzbuISuo-sAOW8JkUPoKLNnkxSpaOsVXMfK_DjZv3YhC1_Hnu8Yb1WHp7OMhv0WCz0ycCuh8Bnttv3Iith3LPQuDuVXzVBuITc0BnHfeIWdS74bagGI_6n7lbug6K4aAd0iCSNV5xJnUGUdrz1qoausdg9CU0P0FogorYUrQEWEzlY-N1rTDrkU7MEITSrJjnvx6wOSymoKByHtCDv71wf4cmbjygTQMqJc1ptAjLqT8TJ6MeFjOTHjTwpb73zz1O5DjARuZuTqABV7fEyfsSdavxD4IIEn9D_GOPnaTmMUnn4yVVlN7cPBQM0_UNosie3c39S-gjpvdBJo6_qcDFOVSnLbOrLEnTLkaUeG_nXnQbhv57KALPSQz4jD4jpdFzluKhIkBh1RAq4y6qDM6y2VmG2rQxWn9-DW44c4UqzIw9r5-JFctMxQ2Fe6IhhuVQ0ueId8fEOtMQ7e7DDQS7zmgNDqFCQWes29Tx7w7K-bKu8Y0Ixl68Dl8oZhPvgk0XlW1379Jt-nzgot2CloJd9VyP2hONhip7rmzOiCR6Y4riLlgnY2l1yx3CVPcQFIs2O1rL3riKPaBRKcMwU0pxUvvxmNqWoiKujSrcZBWAzVx_GpfD7SsUsGLW7t_UrIyOMOLiNPZRrBTi2vgaDdhm6nxNBheNcsaRj3ovabVFCdqAtGN50hEFqMuZ4Ey5_bUi1oLrjd5EifuTx1uBLjExWxo_fO_Co5LK8ZeWc8RszkTiMSb4olkD9QR96kSCFWtT7f_0xNVFS_g42Fyz&uuid=e372e1bc-065f-48a4-b904-3be38fc7b405&authuser=0&nonce=23ger9qdllk3g&user=08118691172474006346&hash=am20v7ngkrij3s45kcoj49f862gsvas3',
    'Rittik_Basu.pdf'
  )
}

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          className,
          'group inline-flex items-center text-sm font-medium tracking-wide text-zinc-800 transition duration-300 hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500 md:hover:scale-125'
        )}
      >
        <Icon className="mr-3 h-[1.2rem] w-[1.2rem] flex-none fill-zinc-500 transition group-hover:fill-indigo-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function Skills({ className, icon: Icon, children }) {
  return (
    <li>
      <div className="group inline-flex items-center text-sm font-medium tracking-wide text-zinc-800 transition duration-300 dark:text-zinc-200 md:hover:scale-110">
        <Icon
          className={clsx(
            className,
            'mr-3 h-[1.2rem] w-[1.2rem] fill-indigo-500/70 dark:fill-indigo-300'
          )}
        />
        <span className="ml-4">{children}</span>
      </div>
    </li>
  )
}

export default function About() {
  return (
    <>
      <NextSeo
        title="About"
        description="I'm a front end web developer and designer. I live in India, where I break things and learn fast."
        canonical={`${baseUrl}about/`}
        openGraph={{
          url: `${baseUrl}about/`,
          title: 'About',
          description:
            "I'm a front end web developer and designer. I live in India, where I break things and learn fast.",
          images: [
            {
              url: `${baseUrl}api/og?title=About`,
              width: 1200,
              height: 600,
              alt: `Blog | Rittik Basu`,
            },
          ],
        }}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="flex justify-center lg:col-span-5">
            <div className="pt-2 lg:pl-10">
              <div className="max-w-xs px-2.5">
                <Image
                  src={portraitImage}
                  alt="Rittik Basu"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="saturate-150 transition duration-500 md:hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="lg:order-first lg:col-span-7 lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-normal text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m{' '}
              <span
                className="animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text
            text-transparent dark:from-purple-400 dark:via-indigo-400
            dark:to-pink-400"
              >
                Rittik Basu.
              </span>{' '}
              <br />I live in India, where I break things & learn fast.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Although I have a degree in computer science I consider myself
                as a self taught developer. I got into coding in the second year
                of my undergrad but I've always had the mindset of a developer.
              </p>
              <p>
                I had an obsession with optimisation since I was a kid. When I
                lived in Mumbai and had to travel in the local trains I always
                tried to optimise my journey by finding the shortest route and
                the fastest train. I also used to play a lot of video games and
                I was always trying to find the best way to beat the game. I
                think that's what got me into coding. I wanted to find the best
                way to solve a problem.
              </p>
              <p>
                I started with Python because I wanted to automate some
                monotonous tasks of my daily life and then moved to web
                development. I have been working with web technologies for the
                past 3 years. I am currently contributing to a project called{' '}
                <a
                  href="https://letterhive.com"
                  className="inline-flex items-center font-medium text-indigo-500"
                >
                  Letterhive
                  <FiExternalLink className="ml-1 h-4 w-4" />
                </a>{' '}
                that lets you create a website which serves as a public inbox
                for email newsletters.
              </p>
              <div>
                <span className="font-bold tracking-widest underline">
                  Skills I have
                </span>
                <ul
                  role="list"
                  className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3"
                >
                  <div>
                    <Skills
                      icon={SiJavascript}
                      className="md:group-hover:fill-yellow-400 dark:md:group-hover:fill-yellow-300"
                    >
                      Javascript
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiReact}
                      className="md:group-hover:fill-blue-400 dark:md:group-hover:fill-blue-300"
                    >
                      React
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiNextdotjs}
                      className="md:group-hover:fill-black dark:md:group-hover:fill-white"
                    >
                      Next.js
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiTailwindcss}
                      className="md:group-hover:fill-blue-400"
                    >
                      Tailwind
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiBootstrap}
                      className="md:group-hover:fill-purple-500"
                    >
                      Bootstrap
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiFirebase}
                      className="md:group-hover:fill-yellow-400 dark:md:group-hover:fill-yellow-300"
                    >
                      Firebase
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiPython}
                      className="md:group-hover:fill-blue-400 dark:md:group-hover:fill-blue-300"
                    >
                      Python
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiJupyter}
                      className="md:group-hover:fill-orange-400"
                    >
                      Jupyter
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiFlask}
                      className="md:group-hover:fill-black dark:md:group-hover:fill-white"
                    >
                      Flask
                    </Skills>
                  </div>
                </ul>
              </div>
              <div className="flex justify-center md:justify-start">
                <Button
                  href="/projects"
                  variant="primary"
                  className="group h-8 tracking-widest ring-2 ring-indigo-400"
                >
                  See my projects
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block lg:pl-10">
            <div className="flex justify-center">
              <ul role="list" className="space-y-6">
                <SocialLink
                  href="https://twitter.com/_rittik"
                  icon={BsTwitter}
                  className=""
                >
                  Connect on Twitter
                </SocialLink>
                <SocialLink
                  href="https://github.com/rittikbasu"
                  icon={BsGithub}
                  className=""
                >
                  Connect on GitHub
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/rittikbasu/"
                  icon={FaLinkedinIn}
                  className=""
                >
                  Connect on LinkedIn
                </SocialLink>
                <div className="flex justify-center">
                  <div className="w-24 border-t border-zinc-300 dark:border-zinc-600/40"></div>
                </div>
                <Link
                  href="mailto:contact@rittikbasu.tech"
                  className="group flex items-center text-sm font-medium tracking-wide text-zinc-800 transition duration-300 after:justify-center hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500 md:hover:scale-125"
                >
                  <MdEmail className="mr-3 h-5 w-5 flex-none fill-zinc-500 transition group-hover:fill-indigo-500" />
                  contact@rittikbasu.tech
                </Link>
                <Button
                  href="#"
                  variant="secondary"
                  onClick={saveFile}
                  className="group w-full ring-indigo-300 md:hover:ring-2"
                >
                  <BsArrowDown className="h-3 w-3 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
                  Download Resume
                </Button>
              </ul>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="flex justify-center">
              <div className="my-4 w-24 border-t border-zinc-300 pt-8 dark:border-zinc-600/40"></div>
            </div>
            <div className="flex justify-center">
              <Button
                href="#"
                variant="secondary"
                onClick={saveFile}
                className="mb-10 w-4/5"
              >
                Download Resume
                <BsArrowDown className="h-3 w-3 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
