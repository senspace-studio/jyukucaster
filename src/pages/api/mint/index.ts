import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import ContractABI from './ContractABI.json'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import { pgClient } from '../lib/pg'

const thirdwebSDK = ThirdwebSDK.fromPrivateKey(
  process.env.MINTWALLET_PK!,
  process.env.NETWORK_NAME!,
  {
    secretKey: process.env.THIRDWEB_SK!,
  }
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await pgClient.connect()
  const claims = await pgClient.query(
    `SELECT * FROM claims WHERE minted = false`
  )

  const contract = (
    await thirdwebSDK.getContract(
      process.env.NFT_CONTRACT_ADDRESS!,
      ContractABI
    )
  ).erc1155

  const promises = claims.rows.map(async (claim) => {
    await contract.claimTo(claim.address, claim.token_id, 1)
    await pgClient.query(
      `UPDATE claims SET minted = true WHERE id = ${claim.id}`
    )
  })

  await Promise.all(promises)

  return
}
