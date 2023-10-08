import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'

import { BsTwitter, BsGithub } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaLinkedinIn } from 'react-icons/fa'
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTailwindcss,
  SiFirebase,
  SiJupyter,
  SiFlask,
  SiPostgresql,
} from 'react-icons/si'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import portraitImage from '@/images/avatar.png'
import { baseUrl } from '../seo.config'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          className,
          'group inline-flex items-center text-sm font-medium tracking-wide text-zinc-800 transition duration-300 hover:scale-110 hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500'
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
      <div className="group inline-flex items-center text-sm font-medium tracking-wide text-zinc-800 transition duration-300 hover:scale-110 dark:text-zinc-200">
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
                  alt="Avatar Image of Rittik Basu"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="transition duration-500 hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="lg:order-first lg:col-span-7 lg:row-span-2">
            <h1 className="font-heading text-4xl tracking-wider text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I&apos;m{' '}
              <span
                className="animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text
            text-transparent dark:from-purple-400 dark:via-indigo-400
            dark:to-pink-400"
              >
                Rittik Basu.
              </span>{' '}
              <br />I live in India, where I break things & learn fast.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400 md:text-justify">
              <p>
                Although I have a degree in computer science, I still consider
                myself a self taught developer. I got into coding in the second
                year of my undergrad, but I think I&apos;ve always had the
                mindset of a developer.
              </p>
              <p>
                As a child, I had an obsession with optimization which has
                stayed with me till this day. During my time in Mumbai, I would
                take local trains and constantly find ways to optimise my
                journey by discovering the shortest routes and fastest trains. I
                also loved playing video games, and I was always trying to find
                the best way to beat the game. I think that&apos;s what got me
                into coding. I wanted to find the best way to solve a problem.
              </p>
              <p>
                Initially, I started learning Python to automate mundane tasks
                in my daily life, but I soon fell in love with programming and
                began exploring other languages as well. I have been working
                with web technologies for the past 4 years now and I have been
                able to learn new tools & frameworks independently, applying
                them to real-world problems.
              </p>
              <div className="cursor-default">
                <span className="font-poppins font-bold tracking-widest underline">
                  Skills I have
                </span>
                <ul
                  role="list"
                  className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 font-poppins md:grid-cols-3"
                >
                  <div>
                    <Skills
                      icon={SiJavascript}
                      className="group-hover:fill-yellow-400 dark:group-hover:fill-yellow-300"
                    >
                      Javascript
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiReact}
                      className="group-hover:fill-blue-400 dark:group-hover:fill-blue-300"
                    >
                      React
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiNextdotjs}
                      className="group-hover:fill-black dark:group-hover:fill-white"
                    >
                      Next.js
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiFlask}
                      className="group-hover:fill-black dark:group-hover:fill-white"
                    >
                      Flask
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiTailwindcss}
                      className="group-hover:fill-blue-400"
                    >
                      Tailwind
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiPostgresql}
                      className="group-hover:fill-blue-500"
                    >
                      PostgreSQL
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiJupyter}
                      className="group-hover:fill-orange-400"
                    >
                      Jupyter
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiPython}
                      className="group-hover:fill-blue-400 dark:group-hover:fill-blue-300"
                    >
                      Python
                    </Skills>
                  </div>
                  <div>
                    <Skills
                      icon={SiFirebase}
                      className="group-hover:fill-yellow-400 dark:group-hover:fill-yellow-300"
                    >
                      Firebase
                    </Skills>
                  </div>
                </ul>
              </div>

              <div className="flex justify-center pt-8 md:hidden">
                <Button href="/projects" className="py-2">
                  See my projects
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden font-poppins lg:col-span-5 lg:block lg:pl-10">
            <div className="flex justify-center">
              <ul role="list" className="space-y-6">
                <SocialLink
                  href="https://twitter.com/_rittik"
                  icon={BsTwitter}
                  className=""
                >
                  _rittik
                </SocialLink>
                <SocialLink
                  href="https://github.com/rittikbasu"
                  icon={BsGithub}
                  className=""
                >
                  rittikbasu
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/rittikbasu/"
                  icon={FaLinkedinIn}
                  className=""
                >
                  rittikbasu
                </SocialLink>
                <div className="flex justify-center">
                  <div className="w-24 border-t border-zinc-300 dark:border-zinc-600/40"></div>
                </div>
                <SocialLink
                  href="mailto:hello@rittik.io"
                  icon={MdEmail}
                  className=""
                >
                  hello@rittik.io
                </SocialLink>
                <Button href="/projects" className="py-2">
                  See my projects
                </Button>
              </ul>
            </div>
          </div>
          <div className="lg:hidden"></div>
        </div>
      </Container>
    </>
  )
}
