import { Box, Center, Container, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const About: FC = () => {
  return (
    <Container my={10} fontSize="lg">
      <Center>
        <Image alt="" src="/image/logo.png" width="350" height="50" />
      </Center>

      <Box mt={10}>
        <Text>
          This page is an experiment in Farcaster's implementation of Frames, a
          feature that allows developers to create mini-applications on social
          network (warpcast) timelines, and we created Jyukucaster, a mini-game
          of quiz. Currently, Mental Arithmetic problems are available.
        </Text>
        <Text mt={2} color="red" fontSize="sm">
          *This is experimental implementation. Use this for your own risk.
        </Text>
      </Box>

      <Box mt={10}>
        <Text>All actions are performed within FarcasterFrames.</Text>
        <Text mt={2}>
          1. Recast the cast.
          <br />
          2. Start with the I'm Ready button.
          <br />
          3. Solve the problem and send the answer.
          <br />
          4. If the answer is correct, you will receive an NFT.
        </Text>
      </Box>

      <Flex gap={2} justifyContent="center" mt={20}>
        <Link
          target="_blank"
          href="https://github.com/senspace-studio/jyukucaster"
        >
          GitHub
        </Link>
        <Link target="_blank" href="https://warpcast.com/yuki0214">
          {`　|　Farcaster　|　`}
        </Link>
        <Link target="_blank" href="https://twitter.com/k_0214">
          X
        </Link>
      </Flex>
    </Container>
  )
}
