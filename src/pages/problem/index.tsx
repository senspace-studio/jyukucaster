import { NextPage } from 'next'
import Head from 'next/head'

type Props = {
  image: string
  buttons: string[]
  numbers: number[]
}

// server side props
export async function getServerSideProps() {
  const numbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 30)
  )

  const correctSum = numbers.reduce((a, b) => a + b, 0)
  const fakeSum1 = correctSum + Math.floor(Math.random() * 100)
  const fakeSum2 = correctSum + Math.floor(Math.random() * 10)
  const fakeSum3 = correctSum + Math.floor(Math.random() * 10)

  const sums = [
    correctSum.toString(),
    fakeSum1.toString(),
    fakeSum2.toString(),
    fakeSum3.toString(),
  ]
  sums.sort(() => Math.random() - 0.5)

  return {
    props: {
      image: `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/gif/problem?numbers=${numbers.join(',')}`,
      numbers: numbers,
      buttons: sums,
    },
  }
}

const Problem: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={props.image} />
        <meta property="fc:frame:button:1" content={props.buttons[0]} />
        <meta property="fc:frame:button:2" content={props.buttons[1]} />
        <meta property="fc:frame:button:3" content={props.buttons[2]} />
        <meta property="fc:frame:button:4" content={props.buttons[3]} />
        <meta
          property="fc:frame:post_url"
          content={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/api/answer/${props.numbers.join(',')}-${props.buttons.join(',')}`}
        />
      </Head>
    </>
  )
}

export default Problem
