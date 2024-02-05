import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

type Props = {
  level: string
}

// server side props
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const level = ctx.query.level

  return {
    props: {
      level: level,
    },
  }
}

const AnswerCorrect: NextPage<Props> = ({ level }) => {
  return (
    <>
      <Head>
        <title>Incorrect</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/image/incorrect.gif`}
        />
        <meta property="fc:frame:button:1" content="Information" />
        <meta property="fc:frame:button:2" content="Retake!" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/api/retake/${level}`}
        />
      </Head>
    </>
  )
}

export default AnswerCorrect
