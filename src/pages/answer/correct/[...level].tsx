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
        <title>Correct</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/image/correct_${level}.gif`}
        />
      </Head>
    </>
  )
}

export default AnswerCorrect
