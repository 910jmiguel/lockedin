import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: ".env" }); // or .env.local

// Create connection pool for Supabase
const connectionString = process.env.SUPABASE_DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);
