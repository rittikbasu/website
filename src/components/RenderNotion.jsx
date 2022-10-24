import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/future/image'

import clsx from 'clsx'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import hljs from 'highlight.js/lib/core'
// import individual languages
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('typescript', typescript)
import python from 'highlight.js/lib/languages/python'
hljs.registerLanguage('python', python)
import html from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('html', html)
import plaintext from 'highlight.js/lib/languages/plaintext'
hljs.registerLanguage('plaintext', plaintext)

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url}>{text.content}</a>
        ) : code ? (
          <code className="text-red-500 dark:text-red-400">{text.content}</code>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

const Embed = (value, type) => {
  let src
  const [isLoading, setLoading] = useState(true)
  try {
    src = value.type === 'external' ? value.external.url : value.file.url
  } catch {
    src = value.url
  }
  const caption = value.caption ? value.caption[0]?.plain_text : ''
  if (src.startsWith('https://twitter.com')) {
    // dynamically importing TwitterTweetEmbed to improve performance
    // const TwitterTweetEmbed = dynamic(() =>
    //   import('react-twitter-embed').then((mod) => mod.TwitterTweetEmbed)
    // )
    const tweetId = src.match(/status\/(\d+)/)[1]
    return <TwitterTweetEmbed tweetId={tweetId} />
  } else if (src.startsWith('https://www.youtube.com')) {
    src = src.replace('watch?v=', 'embed/')
    return (
      <iframe
        className="aspect-video w-full rounded-3xl"
        src={src}
        alt={caption}
      />
    )
  } else if (type === 'image') {
    return (
      <>
        <div className="flex items-center justify-center">
          <Image
            src={src}
            alt={caption ? caption : 'Notion image'}
            className={clsx(
              'h-48 w-full duration-700 ease-in-out tab:h-64 md:h-80 md:w-auto',
              isLoading ? 'blur-2xl' : 'blur-0 grayscale-0'
            )}
            height="300"
            width="500"
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        {caption && <figcaption className="text-center">{caption}</figcaption>}
      </>
    )
  } else {
    return <div>Not supported</div>
  }
}

const renderNestedList = (block) => {
  const { type } = block
  const value = block[type]
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>
}

export const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <ul className="m-0 list-disc">
          <li>
            <Text text={value.rich_text} />
            {!!value.children && renderNestedList(block)}
          </li>
        </ul>
      )
    case 'numbered_list_item':
      return (
        <ol className="m-0 list-decimal">
          <li>
            <Text text={value.rich_text} />
            {!!value.children && renderNestedList(block)}
          </li>
        </ol>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image':
    case 'video':
    case 'embed':
      return <figure className="mb-4 mt-6">{Embed(value, type)}</figure>
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>
    case 'code':
      const language = value.language.replace(' ', '').toLowerCase()
      const code = value.rich_text[0].plain_text
      let codeHighlight
      try {
        codeHighlight = hljs.highlight(code, {
          language: language,
        }).value
      } catch (err) {
        codeHighlight = hljs.highlight(code, {
          language: 'plaintext',
        }).value
      }
      return (
        <pre className="md:custom-scrollbar text-xs dark:prose-invert md:text-sm">
          <code
            dangerouslySetInnerHTML={{ __html: codeHighlight }}
            key={id}
          ></code>
        </pre>
      )
    case 'pdf':
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <div className="text-gray-300 no-underline">
            📎{' '}
            <Link href={src_file} className="no-underline" passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    // TODO: support table block
    // case "table":
    //   console.log(value.children);
    //   return (
    //     <div>
    //       <Text text={value.rich_text} />
    //     </div>
    //   );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}
