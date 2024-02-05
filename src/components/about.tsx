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
          Jyukucaster is a three-day math quiz built on Base using Farcaster’s
          Frames feature. Solve a math problem each day by adding together the
          numbers displayed on the screen and graduate to the next grade! With
          the right answer, you’ll get a generative art photo NFT of your
          graduation!
        </Text>
        <Text mt={2} color="red" fontSize="sm">
          *This is a test implementation. Load times may be longer for some than
          others.
        </Text>
      </Box>

      <Box mt={10}>
        <Text>Directions:</Text>
        <Text mt={2}>
          1. Recast the quiz.
          <br />
          2. Press the I'm Ready button. <br />
          3. Read the numbers on the screen. <br />
          4. Press the button with the correct answer. <br />
          5. If the answer is correct, you will receive an NFT. <br />
          6. Wait until the next day for your next quiz!
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
