import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()

  const { untrustedData } = req.body

  if (untrustedData.buttonIndex === 1) {
    res.redirect(302, `${process.env.NEXT_PUBLIC_SITE_URL}`)
  } else {
    res.redirect(307, `${process.env.NEXT_PUBLIC_SITE_URL}/problem`)
  }
}
