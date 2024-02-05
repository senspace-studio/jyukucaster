import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import ContractABI from './ContractABI.json'
import { NextApiRequest, NextApiResponse } from 'next'
import { pgClient } from '../lib/pg'

const thirdwebSDK = ThirdwebSDK.fromPrivateKey(
  process.env.MINTWALLET_PK!,
  process.env.NETWORK_NAME!,
  {
    secretKey: process.env.THIRDWEB_SK!,
  }
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
      try {
        await contract.claimTo(claim.address, claim.token_id, 1)
        await pgClient.query(
          `UPDATE claims SET minted = true WHERE address = ${claim.address} AND token_id = ${claim.token_id} AND minted = ${claim.minted}`
        )
      } catch (error) {
        console.log(error)
      }
    })

    await Promise.all(promises)

    res.status(200).end()
  } catch (error) {
    res.status(500).end()
  }
}
