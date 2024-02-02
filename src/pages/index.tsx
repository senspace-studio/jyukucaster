import { Container, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/api/gif/ready?${new Date().getTime()}`}
        />
        <meta property="fc:frame:button:1" content="Information" />
        <meta property="fc:frame:button:2" content="I'm Ready" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/api/ready`}
        />
      </Head>

      <Container>
        <Heading textAlign="center">What is mental arithmetic?</Heading>
      </Container>
    </>
  )
}

export default Home
