import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { BsTwitter, BsGithub } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { LuCopyCheck } from 'react-icons/lu'

import { Container } from '@/components/Container'

const EMAIL = 'hey@rittik.fyi'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="transition font-poppins md:hover:text-indigo-500 md:dark:hover:text-indigo-400"
    >
      {children}
    </Link>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex relative items-center">
      <button
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="transition font-poppins md:hover:text-indigo-500 md:dark:hover:text-indigo-400"
      >
        Mail
      </button>
      <div
        className={clsx(
          'absolute bottom-full left-1/2 mb-3 transition-all duration-200 -translate-x-1/2 pointer-events-none',
          hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        <div className="relative flex items-center gap-1.5 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-zinc-700">
          <div
            className={clsx(
              'absolute inset-0 flex items-center justify-center gap-1.5 rounded-md transition-all duration-300',
              copied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            )}
          >
            <LuCopyCheck className="h-3.5 w-3.5 text-green-400" />
            <span>Copied!</span>
          </div>
          <div
            className={clsx(
              'flex items-center gap-1.5 transition-all duration-300',
              copied ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            )}
          >
            <MdEmail className="h-3.5 w-3.5" />
            <span>{EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CopyEmailMobile() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy email address"
      className="p-1 -m-1 group"
    >
      <div className="relative w-5 h-5">
        <MdEmail
          className={clsx(
            'absolute inset-0 w-5 h-5 transition-all duration-300 fill-zinc-500 dark:fill-zinc-400',
            copied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          )}
        />
        <LuCopyCheck
          className={clsx(
            'absolute inset-0 w-5 h-5 transition-all duration-300',
            copied
              ? 'text-green-500 opacity-100 scale-100 dark:text-green-400'
              : 'text-green-500 opacity-0 scale-75 dark:text-green-400'
          )}
        />
      </div>
    </button>
  )
}

function SocialLinkMobile({ className, icon: Icon, ...props }) {
  return (
    <Link
      className="p-1 -m-1 group"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    >
      <Icon
        className={clsx(
          className,
          'w-5 h-5 transition fill-zinc-500 dark:fill-zinc-400'
        )}
      />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="pt-10 pb-14 bg-gray-100 border-t border-zinc-100 dark:border-zinc-700/40 dark:bg-black">
          <Container.Inner>
            <div className="flex flex-col gap-8 justify-between items-center sm:flex-row">
              <div className="hidden gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200 md:flex">
                <NavLink href="https://x.com/_rittik">Twitter</NavLink>
                <NavLink href="https://github.com/rittikbasu">GitHub</NavLink>
                <NavLink href="https://www.linkedin.com/in/rittikbasu/">
                  LinkedIn
                </NavLink>
                <CopyEmailButton />
              </div>
              <div className="flex gap-x-12 md:hidden">
                <SocialLinkMobile
                  href="https://x.com/_rittik"
                  aria-label="Follow on Twitter"
                  icon={BsTwitter}
                />
                <SocialLinkMobile
                  href="https://github.com/rittikbasu"
                  aria-label="Follow on GitHub"
                  icon={BsGithub}
                />
                <SocialLinkMobile
                  href="https://www.linkedin.com/in/rittikbasu/"
                  aria-label="Follow on LinkedIn"
                  icon={FaLinkedinIn}
                />
                <CopyEmailMobile />
              </div>
              <p className="text-sm tracking-wider font-poppins text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Rittik Basu. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
