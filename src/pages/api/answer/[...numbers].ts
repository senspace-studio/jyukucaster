import type { NextApiRequest, NextApiResponse } from 'next'
import { neynarClient } from '../lib/neynar'
import { thirdwebSDK } from '../lib/thirdweb'
import ContractABI from './ContractABI.json'

const mintNFT = async (address: string, tokenId: number) => {
  const contract = (
    await thirdwebSDK.getContract(
      process.env.NFT_CONTRACT_ADDRESS!,
      ContractABI
    )
  ).erc1155
  contract.claimTo(address, tokenId, 1)
  return
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()

  try {
    const {
      trustedData: { messageBytes },
    } = req.body
    const decodedData = await neynarClient.validateFrameAction(messageBytes, {
      castReactionContext: true,
    })
    const tappedButtonIndex = (decodedData.action as any)?.tapped_button.index

    const [numbersArrayString, buttonsArrayString] =
      req.query.numbers?.toString().split('-') || []
    const numbers = numbersArrayString.split(',')
    const sum = numbers?.reduce((acc, cur) => acc + Number(cur), 0)
    const buttons = buttonsArrayString?.split(',')
    const tappedAnswer = buttons?.[tappedButtonIndex - 1]

    const numbersLen = numbers.length
    let level = 'elementaryschool'
    switch (numbersLen) {
      case 6:
        level = 'highschool'
        break
      case 10:
        level = 'mecha'
      default:
        break
    }

    const walletAddress = decodedData?.action?.interactor?.verifications[0]
    if (walletAddress) {
      const tokenId = numbersLen === 10 ? 2 : numbersLen === 6 ? 1 : 0
      await mintNFT(walletAddress, tokenId)
    }

    if (tappedAnswer === sum?.toString()) {
      res.redirect(
        307,
        `${process.env.NEXT_PUBLIC_SITE_URL}/answer/correct/${level}`
      )
    } else {
      res.redirect(
        307,
        `${process.env.NEXT_PUBLIC_SITE_URL}/answer/incorrect/${level}`
      )
    }
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
