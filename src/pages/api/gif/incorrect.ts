// api with next.js

import { NextApiRequest, NextApiResponse } from 'next'
import GIFEncoder from 'gifencoder'
import sharp from 'sharp'
import { Image, createCanvas } from 'canvas'
import { incorrect } from '../assets/messageSvg'
import path from 'path'

path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Roboto-Medium.ttf')

export const config = {
  maxDuration: 60,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(404).end()

  const correctSvgs = new Array(1).fill(incorrect)
  const combinedSvgs = [...correctSvgs]

  const encoder = new GIFEncoder(1910, 1000)
  const canvas = createCanvas(1910, 1000)
  const ctx = canvas.getContext('2d')

  // GIFエンコーダーのストリームを設定
  const stream = encoder.createReadStream()
  let chunks: any[] = []
  stream.on('data', (chunk) => chunks.push(chunk))
  stream.on('end', () => {
    const gifBuffer = Buffer.concat(chunks)
    res.setHeader('Content-Type', 'image/gif')
    res.send(gifBuffer)
  })

  encoder.start()
  encoder.setRepeat(-1)
  encoder.setDelay(1000)
  encoder.setQuality(10)

  for (const svg of combinedSvgs) {
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, 1910, 1000)
      ctx.drawImage(img, 0, 0)
      encoder.addFrame(ctx as any)
    }
    img.src = await sharp(Buffer.from(svg)).png().toBuffer()
  }

  encoder.finish()
}
