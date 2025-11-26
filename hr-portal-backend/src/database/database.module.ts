import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: () => {
        const client = postgres(process.env.DATABASE_URL as string);
        return drizzle(client);
      },
    },
  ],
  exports: ['DRIZZLE'],
})
export class DatabaseModule {}
