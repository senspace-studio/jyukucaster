import { Client } from 'pg'

export const pgClient = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export const pgConnect = async () => {
  try {
    await pgClient.connect()
  } catch (_) {}
  return pgClient
}
