import type { NextApiRequest, NextApiResponse } from 'next'
import { neynarClient } from '../lib/neynar'

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

    if (tappedAnswer === sum?.toString()) {
      res.redirect(307, `${process.env.NEXT_PUBLIC_SITE_URL}/answer/correct`)
    } else {
      res.redirect(307, `${process.env.NEXT_PUBLIC_SITE_URL}/answer/incorrect`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
