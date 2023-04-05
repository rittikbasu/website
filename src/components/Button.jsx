import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-white font-semibold text-zinc-700 md:hover:bg-indigo-300 active:bg-indigo-400 active:text-zinc-700/70 dark:bg-zinc-900 dark:text-zinc-200 dark:md:hover:bg-indigo-800/70 dark:active:bg-indigo-900 dark:active:text-zinc-200/70',
  secondary:
    'bg-zinc-100 font-medium text-zinc-900 active:bg-zinc-200 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:md:hover:bg-zinc-800 dark:md:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex items-center gap-2 font-poppins justify-center rounded-md py-2 px-3 text-sm transition active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
