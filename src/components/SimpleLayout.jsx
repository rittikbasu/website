import { Container } from '@/components/Container'

export function SimpleLayout({ title, intro, preTitle, postTitle, children }) {
  const gradientClasses =
    'animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 animate-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400'
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1
          className={`font-heading text-4xl tracking-wider text-zinc-800 dark:text-zinc-100 sm:text-5xl`}
        >
          {' '}
          {preTitle && <span className={gradientClasses}>{preTitle}</span>}{' '}
          {title}{' '}
          {postTitle && <span className={gradientClasses}>{postTitle}</span>}{' '}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-10 sm:mt-20">{children}</div>
    </Container>
  )
}
