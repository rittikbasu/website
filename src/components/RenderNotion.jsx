import { Fragment } from 'react'
import Link from 'next/link'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import Image from 'next/future/image'

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
          <a className="no-underline" href={text.link.url}>
            {text.content}
          </a>
        ) : code ? (
          <code className="text-red-500 dark:text-red-400">{text.content}</code>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

const embed = (value, type) => {
  let src
  try {
    src = value.type === 'external' ? value.external.url : value.file.url
  } catch {
    src = value.url
  }
  const caption = value.caption ? value.caption[0]?.plain_text : ''
  if (src.startsWith('https://twitter.com')) {
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
            className="md:h-80 md:w-auto"
            height="300"
            width="500"
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
  //   console.log(id)

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
    case 'numbered_list_item':
      // console.log("")
      return (
        <li className={type === 'numbered_list_item' ? 'list-decimal' : ''}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
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
      return <figure>{embed(value, type)}</figure>
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>
    case 'code':
      //   console.log(value.language)
      return (
        <pre className="dark:prose-invert">
          <code className={`language-${value.language}`} key={id}>
            {value.rich_text[0].plain_text}
          </code>
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
            <Link href={src_file} passHref>
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
