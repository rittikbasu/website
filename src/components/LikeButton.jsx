import { useState } from 'react'
import clsx from 'clsx'
import { SupabaseClient } from '@/lib/initSupabase'
import { BsHeartFill } from 'react-icons/bs'

const activeClass =
  'rounded-lg bg-gradient-to-br from-red-500 to-amber-500 p-0.5 text-xl font-medium text-zinc-500 dark:text-zinc-100 focus:outline-none w-1/3 md:w-1/5'
const inactiveClass =
  'rounded-lg bg-gradient-to-br dark:from-indigo-500 dark:to-pink-500 p-0.5 text-xl font-medium text-zinc-500 dark:text-zinc-100 focus:outline-none w-1/3 md:w-1/5 from-indigo-400 to-pink-400'

export function LikeBtn({ slug, variant }) {
  const [isLiked, setLiked] = useState(false)
  const [likes, setLikes] = useState()
  const [stopCounter, setStopCounter] = useState(0)
  const getLikes = async () => {
    const { data } = await SupabaseClient.from('analytics')
      .select('likes')
      .filter('slug', 'eq', slug)
    setLikes(data[0]?.likes)
  }
  const updateLikes = async () => {
    setStopCounter(stopCounter + 1)
    if (stopCounter < 5) {
      setLiked(true)
      const { data } = await SupabaseClient.rpc('increment_likes', {
        page_slug: slug,
      })
      getLikes()
      setLiked(false)
    }
  }
  getLikes()
  return (
    <div className="mt-10 flex justify-center md:block">
      <button
        className={clsx(stopCounter >= 5 ? inactiveClass : activeClass)}
        onClick={updateLikes}
      >
        <span className="flex items-center justify-center gap-x-3 rounded-md bg-white px-5 py-1 transition-all duration-75 ease-in dark:bg-zinc-900">
          <BsHeartFill
            className={clsx(
              isLiked
                ? 'h-5 w-5 scale-125 animate-ping fill-indigo-500 dark:fill-indigo-400 md:scale-150'
                : stopCounter >= 5
                ? 'h-5 w-5 fill-indigo-500 dark:fill-indigo-400'
                : 'h-5 w-5 fill-red-500 dark:fill-red-600'
            )}
          />
          {likes}
        </span>
      </button>
    </div>
  )
}
