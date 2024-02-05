import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

type Props = {
  image: string
  buttons: string[]
  numbers: number[]
}

// server side props
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const level = ctx.query.level

  let countOfNumbers = 4
  switch (level) {
    case 'highschool':
      countOfNumbers = 6
      break
    case 'mecha':
      countOfNumbers = 10
      break
    default:
      break
  }
  const rawNumbers = Array.from({ length: countOfNumbers * 5 }, () =>
    Math.floor(Math.random() * 30)
  )
  const numbers = rawNumbers
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    .slice(0, countOfNumbers)

  const correctSum = numbers.reduce((a, b) => a + b, 0)
  const fakeSums = [
    correctSum + 10,
    correctSum + Math.floor(Math.random() * 100),
    correctSum + Math.floor(Math.random() * 15),
    correctSum - Math.floor(Math.random() * 15),
    Math.floor(Math.random() * 30),
  ]

  const sums = [
    correctSum.toString(),
    fakeSums
      .sort(() => Math.random() - 0.5)
      .map((v) => v.toString())
      .slice(0, 3),
  ].sort(() => Math.random() - 0.5)

  return {
    props: {
      image: `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/gif/problem?numbers=${numbers.join(',')}&level=${level}`,
      numbers: numbers,
      buttons: sums,
    },
  }
}

const Problem: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Problem</title>
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
