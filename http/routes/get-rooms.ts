import { count, desc, eq } from 'drizzle-orm';
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
				createdAt: schema.rooms.createdAt,
				questionsCount: count(schema.questions.id),
			})
			.from(schema.rooms)
			.leftJoin(schema.questions, eq(schema.questions.roomID, schema.rooms.id))
			.groupBy(schema.rooms.id)
			.orderBy(desc(schema.rooms.createdAt));

		return results;
	});
};
