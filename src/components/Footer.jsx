import Link from 'next/link'

import { Container } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-indigo-500 dark:hover:text-indigo-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 bg-gray-100 pt-10 pb-16 dark:border-zinc-700/40 dark:bg-black">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/articles">Articles</NavLink>
                <NavLink href="/projects">Projects</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
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
