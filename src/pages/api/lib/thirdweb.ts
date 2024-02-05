import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import ContractABI from './ContractABI.json'

const thirdwebSDK = ThirdwebSDK.fromPrivateKey(
  process.env.MINTWALLET_PK!,
  process.env.NETWORK_NAME!,
  {
    secretKey: process.env.THIRDWEB_SK!,
  }
)

export const mintNFT = async (address: string, tokenId: number) => {
  const contract = (
    await thirdwebSDK.getContract(
      process.env.NFT_CONTRACT_ADDRESS!,
      ContractABI
    )
  ).erc1155
  await contract.claimTo(address, tokenId, 1)

  return
}
