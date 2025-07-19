import { createClient } from "@libsql/client"

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

export async function executeQuery(sql: string, args: any[] = []) {
  try {
    const result = await client.execute({
      sql,
      args,
    })
    return result.rows
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}
