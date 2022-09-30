import { useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import clsx from 'clsx'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDatabase } from '@/lib/notion'
import { baseUrl } from '../seo.config'

import { BsLink45Deg, BsGithub } from 'react-icons/bs'

const databaseId = process.env.NOTION_PROJECT_DB_ID
const delay = ['', 'delay-200', 'delay-500', 'delay-1000']

function Project({ project, index }) {
  const [isLoading, setLoading] = useState(true)
  const projectTitle = project.properties.name.title[0].plain_text
  const projectDescription =
    project.properties.description.rich_text[0].plain_text
  const github = project.properties.github.rich_text.length
    ? project.properties.github.rich_text[0].plain_text
    : false
  const link = project.properties.link.rich_text.length
    ? project.properties.link.rich_text[0].plain_text
    : false
  const linkLabel = project.properties.linkLabel.rich_text.length
    ? project.properties.linkLabel.rich_text[0].plain_text
    : false
  const image = project.properties.image.rich_text[0].plain_text
  return (
    <Card as="li">
      <div className="aspect-w-16 aspect-h-9 group relative z-10 flex h-56 w-full items-center justify-center rounded-xl shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0 tab:h-80 lg:h-64">
        <Image
          src={image}
          alt={`Screenshot of ${projectTitle}`}
          className={clsx(
            `h-full w-full rounded-xl duration-1000 ease-in-out ${delay[index]}`,
            isLoading ? 'blur-xl' : 'blur-0'
          )}
          height="300"
          width="500"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h2 className="z-10 mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {projectTitle}
      </h2>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-100/80 opacity-0 transition dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl md:group-hover:scale-100 md:group-hover:opacity-100" />
      <Card.Description>{projectDescription}</Card.Description>
      <p className="relative z-10 mt-6 flex items-center space-x-4 text-sm font-medium text-zinc-500 transition dark:text-zinc-200 ">
        {github && (
          <Link
            href={github}
            className="flex items-center space-x-2 md:hover:text-indigo-500"
          >
            <BsGithub className="h-4 w-4 flex-none fill-current transition" />
            <span className="ml-2">GitHub</span>
          </Link>
        )}
        {link && (
          <Link
            href={link}
            className="flex items-center space-x-2 md:hover:text-indigo-500"
          >
            <BsLink45Deg className="h-4 w-4 flex-none fill-current transition" />
            <span className="-ml-4">{linkLabel}</span>
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
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the past couple of years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-1 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <Project key={project.id} project={project} index={index} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId, 'order', 'ascending')
  return {
    props: {
      projects: database,
    },
    revalidate: 1,
  }
}
