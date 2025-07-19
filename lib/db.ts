import { neon } from "@neondatabase/serverless"
import { Pool } from "@neondatabase/serverless"

// For use with Next.js App Router and Server Components
export const sql = neon(process.env.RAILWAY_DATABASE_URL!)

// For use with Next.js API Routes or other environments that require a Pool
export const pool = new Pool({
  connectionString: process.env.RAILWAY_DATABASE_URL!,
})
