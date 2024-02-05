![Logo](/docs/logo.png)

# An Farcaster Frame Experimental: JYUKUCASTER

This repository is an experiment in Farcaster's implementation of Frames, a feature that allows developers to create mini-applications on social network (warpcast) timelines, and we created Jyukucaster, a mini-game of quiz.

Currently, Mental Arithmetic problems are available.

\*This is experimental implementation. Use this for your own risk.

## How it works

All actions are performed within FarcasterFrames.

1. Recast the cast.
2. Start with the I'm Ready button.
3. Solve the problem and send the answer.
4. If the answer is correct, you will receive an NFT.

## Frameworks

- Next.js for frontend and api function
- Thirdweb for managing nft
- Neynar for interaction with farcast

## Technique

1. Implement an api function that returns a gif image as the image (fc:frame:image) loaded in the Farcaster Frames. Dynamically generate questions so that the user can play over and over again.
2. Data integration with Farcaster using Neynar.
