import { desc, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../src/db/connection.ts';
import { schema } from '../../src/db/schema/index.ts';
// biome-ignore lint/correctness/noUnusedImports: false
import { questions } from '../../src/db/schema/questions.ts';

// -> Tipagem do GetRoomsRoute
export const getRoomsQuestions: FastifyPluginCallbackZod = (app) => {
	app.get(
		'/rooms/:roomID/questions',
		{
			schema: {
				params: z.object({
					roomID: z.string(),
				}),
			},
		},
		async (request) => {
			const { roomID } = request.params;

			const result = await db
				.select({
					id: schema.questions.id,

					question: schema.questions.question,

					answer: schema.questions.answer,

					createdAt: schema.questions.createdAt,
				})
				.from(schema.questions)
				.where(eq(schema.questions.roomID, roomID))
				.orderBy(desc(schema.questions.createdAt));

			return result;
		}
	);
};
