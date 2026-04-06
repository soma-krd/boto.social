import { PostgresStore } from '@mastra/pg';

export const pStore = new PostgresStore({
  id: 'boto-store',
  connectionString: process.env.DATABASE_URL!,
});
