import { defineConfig } from 'drizzle-kit';
import { dotenv } from './src/env.ts';

export default defineConfig({
	dialect: 'postgresql',
	casing: 'snake_case',
	schema: './src/db/schema/**.ts',
	out: './src/db/migrations',
	dbCredentials: {
		url: dotenv.DATABASE_URL,
	},
});
