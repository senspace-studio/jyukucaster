// api with next.js

import { NextApiRequest, NextApiResponse } from 'next'
import GIFEncoder from 'gifencoder'
import sharp from 'sharp'
import { Image, createCanvas } from 'canvas'
import { background, checkReady, waitingAnswer } from '../assets/messageSvg'
import path from 'path'

path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Roboto-Medium.ttf')

export const config = {
  maxDuration: 60,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(404).end()

  const numbers = req.query.numbers?.toString().split(',')
  const level = req.query.level?.toString()
  if (
    !numbers ||
    !level ||
    !['elementaryschool', 'college', 'mecha'].includes(level)
  )
    return res.status(400).end()

  const speedOfDelay =
    level === 'elementaryschool' ? 1500 : level === 'college' ? 1200 : 750
  const waitingReadySvgs = new Array(Math.floor(3000 / speedOfDelay)).fill(
    checkReady
  )

  const problemSvgs = numbers.map((number) => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="955" height="500" viewBox="0,0,955,500">
        ${background}
        <rect x="0" y="0" width="100%" height="100%" fill="black" opacity="0.9" />
        <text x="50%" y="50%" text-anchor="middle" font-size="100" fill="white">${number}</text>
      </svg>
    `
  })
  const finishedSvgs = new Array(1).fill(waitingAnswer)

  const combinedSvgs = [...waitingReadySvgs, ...problemSvgs, ...finishedSvgs]

  const encoder = new GIFEncoder(955, 500)
  const canvas = createCanvas(955, 500)
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
  encoder.setDelay(speedOfDelay)
  encoder.setQuality(10)

  for (const svg of combinedSvgs) {
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, 955, 500)
      ctx.drawImage(img, 0, 0)
      encoder.addFrame(ctx as any)
    }
    img.src = await sharp(Buffer.from(svg)).png().toBuffer()
  }

  encoder.finish()
}
