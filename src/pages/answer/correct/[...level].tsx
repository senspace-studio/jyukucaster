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
        <title>Jyukucaster | Correct</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/image/correct_${level}.gif`}
        />
        <meta property="fc:frame:button:1" content="Information" />
        <meta property="fc:frame:button:2" content="View NFT" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:button:2:action" content="post_redirect" />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/api/complete/${level}`}
        />
      </Head>
    </>
  )
}

export default AnswerCorrect
