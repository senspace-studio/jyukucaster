import { ThirdwebSDK } from '@thirdweb-dev/sdk'

export const thirdwebSDK = ThirdwebSDK.fromPrivateKey(
  process.env.MINTWALLET_PK!,
  process.env.NETWORK_NAME!,
  {
    secretKey: process.env.THIRDWEB_SK!,
  }
)
