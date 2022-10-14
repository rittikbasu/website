import { useState, Fragment } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import clsx from 'clsx'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { baseUrl } from '../seo.config'
import data from '@/data/projects.js'

import { BsLink45Deg, BsGithub } from 'react-icons/bs'

const databaseId = process.env.NOTION_PROJECT_DB_ID
const delay = ['', 'delay-200', 'delay-500', 'delay-1000']

function Project({ project, index }) {
  const [isLoading, setLoading] = useState(true)
  const projectTitle = project.title
  const projectDescription = project.description
  const techUsed = project.techUsed
  const github = project.github
  const link = project.link
  const image = project.image
  return (
    <Card as="li">
      <div className="aspect-w-16 aspect-h-9 justify-cente group relative z-10 flex h-56 w-full items-center ring-1 ring-zinc-900/5 transition duration-500 dark:ring-0 tab:h-80 md:group-hover:scale-110 lg:h-64">
        <Image
          src={image}
          alt={`Screenshot of ${projectTitle}`}
          className={clsx(
            `h-full w-full rounded-xl object-contain duration-1000 ease-in-out ${delay[index]}`,
            isLoading ? 'blur-xl' : 'blur-0'
          )}
          height="300"
          width="500"
          placeholder="blur"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h2 className="z-10 mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {projectTitle}
      </h2>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-100/80 opacity-0 transition dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl md:group-hover:scale-100 md:group-hover:opacity-100" />
      <div className="z-10 pt-2">
        {techUsed.map((item, i) => {
          return (
            <Fragment key={i}>
              <span className="mr-2 inline-flex rounded-md text-sm font-semibold text-indigo-500/80 dark:text-indigo-400/70">
                {item}
              </span>
              {techUsed.length - 1 !== i && (
                <span className="mr-2 text-zinc-400 dark:text-zinc-500">|</span>
              )}
            </Fragment>
          )
        })}
      </div>
      <Card.Description>{projectDescription}</Card.Description>
      <p className="relative z-10 mt-4 flex items-center space-x-4 text-sm font-medium text-zinc-500 transition dark:text-zinc-200">
        {github && (
          <Link
            href={github}
            className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300 md:hover:text-indigo-500"
          >
            <BsGithub className="h-4 w-4 flex-none fill-current transition" />
            <span className="ml-2">Source Code</span>
          </Link>
        )}
        {link && (
          <Link
            href={link}
            className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300 md:hover:text-indigo-500"
          >
            <BsLink45Deg className="h-4 w-4 flex-none fill-current transition" />
            <span className="-ml-4">Live Demo</span>
          </Link>
        )}
      </p>
    </Card>
  )
}

export default function ProjectsIndex({ projects }) {
  return (
    <>
      <NextSeo
        title="Projects"
        description="A collection of projects I've worked on."
        canonical={`${baseUrl}projects/`}
        openGraph={{
          url: `${baseUrl}projects/`,
          title: 'Projects',
          description: 'A collection of projects I’ve worked on.',
        }}
      />
      <SimpleLayout
        preTitle="Things I've made"
        title="trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the past couple of years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-2"
        >
          {data.map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
