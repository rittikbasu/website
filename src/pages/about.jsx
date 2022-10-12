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
        description="I'm a web developer and designer. I live in India, where I break things and learn fast."
        canonical={`${baseUrl}about/`}
        openGraph={{
          url: `${baseUrl}about/`,
          title: 'About',
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
                  className="transition duration-500 md:hover:scale-110"
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
              <br />I live in India, where I break things and learn fast.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Although I have a degree in computer science I consider myself
                as a self taught developer. I was always obsessed with solving
                problems and optmising things, and wrote my first program when I
                was 6 years old, just two weeks after my mom brought home the
                brand new Macintosh LC 550 that I taught myself to type on.
              </p>
              <p>
                The only thing I loved more than computers as a kid was space.
                When I was 8, I climbed the 40-foot oak tree at the back of our
                yard while wearing my older sister’s motorcycle helmet, counted
                down from three, and jumped — hoping the tree was tall enough
                that with just a bit of momentum I’d be able to get to orbit.
              </p>
              <p>
                <span className="font-bold tracking-widest underline">
                  Skills I have
                </span>
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 md:grid-cols-3"
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
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block lg:pl-10">
            <div className="flex justify-center rounded-2xl bg-zinc-100/30 dark:bg-transparent">
              <ul role="list" className="space-y-6">
                {/* <h2 className="flex justify-center pb-4 font-semibold text-zinc-900 dark:text-zinc-100 lg:text-lg xl:text-2xl">
                  <span className="ml-3">Contact</span>
                </h2> */}
                <SocialLink href="#" icon={BsTwitter} className="">
                  Connect on Twitter
                </SocialLink>
                <SocialLink href="#" icon={BsGithub} className="">
                  Connect on GitHub
                </SocialLink>
                <SocialLink href="#" icon={FaLinkedinIn} className="">
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
              <Button href="#" variant="secondary" className="mb-10 w-4/5">
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
