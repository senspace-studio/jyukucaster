import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()

  const { untrustedData } = req.body
  const { level } = req.query

  if (untrustedData.buttonIndex === 1) {
    res.redirect(302, `${process.env.NEXT_PUBLIC_SITE_URL}`)
  } else {
    const tokenId =
      level?.toString() === 'mecha'
        ? 2
        : level?.toString() === 'highschool'
        ? 1
        : 0
    const openseaLink = `https://opensea.io/assets/base/${process.env.NFT_CONTRACT_ADDRESS}/${tokenId}`
    res.redirect(302, openseaLink)
  }
}
