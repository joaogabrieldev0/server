import { desc } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../src/db/connection.ts';
import { schema } from '../../src/db/schema/index.ts';

// -> Tipagem do GetRoomsRoute
export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
	app.get('/rooms', async () => {
		const results = await db
			.select({
				id: schema.rooms.id,
				name: schema.rooms.name,
			})
			.from(schema.rooms)
			.orderBy(desc(schema.rooms.createdAt));

		return results;
	});
};
