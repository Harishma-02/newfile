import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// No top level await
export const db = drizzle(client);

export async function connectDB() {
  await client.connect();
  console.log("Database connected");
}
