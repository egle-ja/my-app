import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx ./prisma/seed.ts', // or "node ./prisma/seed.js"
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
