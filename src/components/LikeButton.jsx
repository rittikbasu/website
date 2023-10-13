import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { SupabaseClient } from '@/lib/initSupabase'
import { BsHeartFill } from 'react-icons/bs'

export function LikeBtn({ slug }) {
  const [isLiked, setLiked] = useState(false)
  const [likes, setLikes] = useState()
  const [likeLimit, setLikeLimit] = useState(0)

  useEffect(() => {
    const getLikes = async () => {
      const { data } = await SupabaseClient.from('analytics')
        .select('likes')
        .filter('slug', 'eq', slug)
      setLikes(data[0]?.likes)
    }

    getLikes()
  }, [slug])

  const updateLikes = async () => {
    setLikeLimit(likeLimit + 1)
    if (likeLimit < 5) {
      setLiked(true)
      const { data } = await SupabaseClient.rpc('increment_likes', {
        page_slug: slug,
      })
      setLikes((prevLikes) => prevLikes + 1)
      setTimeout(() => setLiked(false), 1000)
    }
  }
  return (
    <div className="mt-10 flex justify-center md:block">
      <button
        className={clsx(
          likeLimit >= 5
            ? 'py-2 duration-1000 md:transition-all md:duration-[2000ms]'
            : 'group relative mx-auto inline-flex w-32 items-center justify-center overflow-hidden rounded-full bg-zinc-200 px-8 py-2 transition dark:bg-zinc-800'
        )}
        onClick={updateLikes}
        disabled={likeLimit >= 5 || isLiked}
      >
        {likeLimit < 5 && (
          <>
            <div className="absolute inset-0 flex items-center [container-type:inline-size]">
              <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(220,38,38,0.8)_0deg,transparent_60deg,transparent_300deg,rgba(220,38,38,0.8)_360deg)] opacity-100 transition duration-300 [animation-duration:3s] group-hover:opacity-100 dark:bg-[conic-gradient(from_0_at_50%_50%,rgba(220,38,38,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(220,38,38,0.5)_360deg)] md:opacity-0"></div>
            </div>

            <div className="absolute inset-0.5 rounded-full bg-white shadow-inner dark:bg-zinc-900"></div>

            <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>
          </>
        )}
        <span className="flex items-center justify-center gap-x-3">
          <BsHeartFill
            className={clsx(
              'z-10 h-5 w-5 ',
              isLiked
                ? 'animate-heartbeat fill-red-500 dark:fill-red-500'
                : likeLimit >= 5
                ? 'fill-indigo-400 duration-1000 dark:fill-indigo-500'
                : 'fill-red-500 duration-500 dark:fill-red-600'
            )}
          />
          <span className="relative mt-px bg-gradient-to-b bg-clip-text font-poppins text-lg font-medium text-zinc-700 transition-all duration-200 dark:from-white/25 dark:to-white dark:text-transparent">
            {likes}
          </span>
        </span>
      </button>
    </div>
  )
}
