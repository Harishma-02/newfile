// src/database/database.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public db: NodePgDatabase;

  private pool: Pool;

  async onModuleInit() {
    // Initialize PostgreSQL connection pool
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL="postgres://postgres:harisraj@localhost:5432/postgres"
, // Set this in your .env
      // Optional settings:
      // ssl: { rejectUnauthorized: false },
      // max: 10,
    });

    // Initialize Drizzle ORM
    this.db = drizzle(this.pool);

    console.log('Database connected and Drizzle initialized.');
  }

  async onModuleDestroy() {
    // Close pool on shutdown
    await this.pool.end();
    console.log('Database connection closed.');
  }
}
