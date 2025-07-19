// This file is a placeholder for Railway-specific database connection logic.
// It's not actively used in the current setup which defaults to Neon via `lib/db.ts`.

import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.RAILWAY_DATABASE_URL!)
