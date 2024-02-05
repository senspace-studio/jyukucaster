import { About } from '@/components/about'
import { Container, Heading } from '@chakra-ui/react'
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

const Home: NextPage<Props> = ({ level }) => {
  return (
    <>
      <Head>
        <title>Jyukucaster | Mental Arithmetic</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/image/ready.gif`}
        />
        <meta property="fc:frame:button:1" content="Information" />
        <meta property="fc:frame:button:2" content="I'm Ready" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/api/ready/${level}`}
        />
      </Head>

      <About />
    </>
  )
}

export default Home
