import { useEffect } from 'react'
import useSWR from 'swr'

async function fetcher(...args) {
  const res = await fetch(...args)
  return res.json()
}

export function PageViews({ slug }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = new Number(data?.total)

  return `${views >= 0 ? views.toLocaleString() : '---'} views`
}

export function UpdateViews(slug) {
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])
}
