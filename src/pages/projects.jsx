import { useState } from 'react'
import Image from 'next/future/image'
import { NextSeo } from 'next-seo'
import clsx from 'clsx'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import data from '@/data/projects.js'
import { baseUrl } from '../seo.config'

import { BsLink45Deg, BsGithub } from 'react-icons/bs'

export default function Projects() {
  const [isLoading, setLoading] = useState(true)
  return (
    <>
      <NextSeo
        title="Projects"
        canonical={`${baseUrl}projects/`}
        openGraph={{
          url: `${baseUrl}projects/`,
          title: 'Projects',
        }}
      />
      <SimpleLayout
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the past couple of years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-1 lg:grid-cols-2"
        >
          {data.map((project) => (
            <Card as="li" key={project.title}>
              <div className="aspect-w-16 aspect-h-9 relative z-10 flex h-64 w-full items-center justify-center shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0">
                <Image
                  src={project.imageSrc}
                  alt={`Screenshot of ${project.title}`}
                  className={clsx(
                    'h-full w-full duration-1000 ease-in-out',
                    isLoading ? 'blur-xl' : 'blur-0'
                  )}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link
                  href={project.link ? project.link.href : project.github}
                >
                  {project.title}
                </Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex items-center space-x-4 text-sm font-medium text-zinc-500 transition dark:text-zinc-200 md:group-hover:text-indigo-500">
                {project.github && (
                  <span className="flex items-center space-x-2">
                    <BsGithub className="h-4 w-4 flex-none fill-zinc-500 transition dark:fill-zinc-400" />
                    <span className="ml-2">GitHub</span>
                  </span>
                )}
                {project.link && (
                  <span className="flex items-center space-x-2">
                    <BsLink45Deg className="h-4 w-4 flex-none fill-zinc-500 transition dark:fill-zinc-400" />
                    <span className="-ml-4">{project.link.label}</span>
                  </span>
                )}
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
