import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}
const font = fetch(
  new URL('/public/fonts/Ubuntu-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')
    const hasDate = searchParams.has('date')
    const date = hasDate ? searchParams.get('date') : hasDate
    const footerFontSize = hasDate ? 'lg' : 'xl'
    const titleFontSize = hasDate ? '6xl' : '7xl'
    const marginTop = hasDate ? '12' : '24'
    const letterSpacing = hasDate ? 'normal' : 'widest'
    const fontData = await font

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontFamily: 'Ubuntu, sans-serif',
            backgroundColor: 'black',
            color: 'white',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          <div
            tw={`flex leading-tight font-bold text-${titleFontSize} tracking-${letterSpacing}`}
            style={{ textShadow: '1px 2px 2px #151515' }}
          >
            {title === 'home' ? (
              <span>
                Rittik<span tw="ml-6">Basu</span>
              </span>
            ) : (
              title
            )}
          </div>
          <div tw={`flex flex-col mt-${marginTop}`}>
            <div
              tw="h-8 w-[800px] rounded-xl mb-8"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #6366f1, rgba(255,255,255,0))',
              }}
            />
            <div
              tw="h-8 w-[500px] rounded-xl mb-8"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #6366f1, rgba(255,255,255,0.4))',
              }}
            />
            <div
              tw="h-8 w-[700px] rounded-xl mb-8"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #6366f1, rgba(255,255,255,0.4))',
              }}
            />
          </div>
          <div tw={`flex justify-between w-full mt-4 text-${footerFontSize}`}>
            {hasDate && (
              <span style={{ textShadow: '1px 2px 2px #151515' }}>{date}</span>
            )}
            <span
              tw="text-indigo-400"
              style={{ textShadow: '1px 2px 2px #151515' }}
            >
              rittikbasu.tech
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Ubuntu',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
