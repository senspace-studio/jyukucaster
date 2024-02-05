import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import ContractABI from './ContractABI.json'
import { NextApiRequest, NextApiResponse } from 'next'

const thirdwebSDK = ThirdwebSDK.fromPrivateKey(
  process.env.MINTWALLET_PK!,
  process.env.NETWORK_NAME!,
  {
    secretKey: process.env.THIRDWEB_SK!,
  }
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenId, secret } = req.body

  if (req.method !== 'POST' || !address || !tokenId || !secret)
    return res.status(404).end()
  if (secret !== process.env.MINT_SECRET_PHRASE) return res.status(403).end()

  const contract = (
    await thirdwebSDK.getContract(
      process.env.NFT_CONTRACT_ADDRESS!,
      ContractABI
    )
  ).erc1155
  await contract.claimTo(address, tokenId, 1)

  res.status(200).end()
}
