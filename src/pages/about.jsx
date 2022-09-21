import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

import { BsTwitter, BsGithub, BsArrowDown } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa'
import portraitImage from '@/images/avatar.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm font-medium tracking-widest text-zinc-800 transition hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500"
      >
        <Icon
          className={clsx(
            className,
            'mr-3 h-[1.2rem] w-[1.2rem] flex-none fill-zinc-500 transition group-hover:fill-indigo-500'
          )}
        />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function SocialLinkMobile({ className, icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className={clsx(
          className,
          'h-5 w-5 fill-zinc-500 transition group-hover:fill-indigo-600 dark:fill-zinc-400 dark:group-hover:fill-indigo-300'
        )}
      />
    </Link>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Rittik Basu</title>
        <meta
          name="description"
          content="I’m Rittik Basu. I live in India, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="flex justify-center">
            <div className="pt-2 lg:pl-20">
              <div className="max-w-xs px-2.5">
                <Image
                  src={portraitImage}
                  alt="Rittik Basu"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Rittik Basu. I live in India, where I design the future.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I’ve loved making things for as long as I can remember, and
                wrote my first program when I was 6 years old, just two weeks
                after my mom brought home the brand new Macintosh LC 550 that I
                taught myself to type on.
              </p>
              <p>
                The only thing I loved more than computers as a kid was space.
                When I was 8, I climbed the 40-foot oak tree at the back of our
                yard while wearing my older sister’s motorcycle helmet, counted
                down from three, and jumped — hoping the tree was tall enough
                that with just a bit of momentum I’d be able to get to orbit.
              </p>
              <p>
                I spent the next few summers indoors working on a rocket design,
                while I recovered from the multiple surgeries it took to fix my
                badly broken legs. It took nine iterations, but when I was 15 I
                sent my dad’s Blackberry into orbit and was able to transmit a
                photo back down to our family computer from space.
              </p>
              <p>
                Today, I’m the founder of Planetaria, where we’re working on
                civilian space suits and manned shuttle kits you can assemble at
                home so that the next generation of kids really <em>can</em>{' '}
                make it to orbit — from the comfort of their own backyards.
              </p>
            </div>
          </div>
          <div className="hidden lg:block lg:pl-20">
            <div className="flex justify-center rounded-2xl border border-zinc-100 bg-zinc-800/40 p-6 dark:border-zinc-700/40">
              <ul role="list" className="space-y-6">
                {/* <h2 className="flex justify-center pb-4 font-semibold text-zinc-900 dark:text-zinc-100 lg:text-lg xl:text-2xl">
                  <span className="ml-3">Contact</span>
                </h2> */}
                <SocialLink href="#" icon={BsTwitter}>
                  Connect on Twitter
                </SocialLink>
                <SocialLink href="#" icon={FaDiscord} className="">
                  Connect on Discord
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
                <SocialLink
                  href="mailto:irittik@gmail.com"
                  icon={MdEmail}
                  className="h-6 w-6"
                >
                  irittik@gmail.com
                </SocialLink>
                <Button href="#" variant="secondary" className="group w-full">
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
            <div className="flex items-center justify-center gap-10">
              <SocialLinkMobile
                href="https://twitter.com"
                aria-label="Follow on Twitter"
                icon={BsTwitter}
              />
              <SocialLinkMobile
                href="https://instagram.com"
                aria-label="Follow on Instagram"
                icon={FaDiscord}
                className="h-6 w-6"
              />
              <SocialLinkMobile
                href="https://github.com"
                aria-label="Follow on GitHub"
                icon={BsGithub}
              />
              <SocialLinkMobile
                href="https://linkedin.com"
                aria-label="Follow on LinkedIn"
                icon={FaLinkedinIn}
              />
              <SocialLinkMobile
                className="h-6 w-6"
                href="mailto:irittik@gmail.com"
                icon={MdEmail}
              >
                irittik@gmail.com
              </SocialLinkMobile>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
