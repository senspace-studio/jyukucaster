import { NextPage } from 'next'
import Head from 'next/head'

const AnswerCorrect: NextPage = () => {
  return (
    <>
      <Head>
        <title>Incorrect</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/image/incorrect.gif`}
        />
      </Head>
    </>
  )
}

export default AnswerCorrect
