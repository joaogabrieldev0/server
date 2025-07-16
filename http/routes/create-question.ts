import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../src/db/connection.ts';
import { schema } from '../../src/db/schema/index.ts';
import {
	generateAnswer,
	generateEmbbeddings,
} from '../../src/services/gemini.ts';

// -> Tipagem do GetRoomsRoute
export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		'/rooms/:roomID/questions',
		{
			schema: {
				params: z.object({
					roomID: z.string(),
				}),
				body: z.object({
					question: z.string().min(1),
				}),
			},
		},
		async (request, reply) => {
			const { roomID } = request.params;

			const { question } = request.body;

			const embeddings = await generateEmbbeddings(question);

			const embeddingsAsString = `[${embeddings.join(',')}]`;

			const chuncks = await db
				.select({
					id: schema.audioChuncks.id,
					transcription: schema.audioChuncks.transcription,
					similarity: sql<number>`1 - (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector)`,
				})
				.from(schema.audioChuncks)
				.where(
					and(
						eq(schema.audioChuncks.roomID, roomID),
						sql`1 - (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
					)
				)
				.orderBy(
					sql`${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector`
				)
				.limit(3);

			let answer: string | null = null;

			if (chuncks.length > 0) {
				const transcriptions = chuncks.map((chunck) => chunck.transcription);

				answer = await generateAnswer(question, transcriptions);
			}

			const result = await db
				.insert(schema.questions)
				.values({
					roomID,
					question,
					answer,
				})
				.returning();

			const insertedQuestion = result[0];

			if (!insertedQuestion) {
				throw new Error('Failed to create new room');
			}

			return reply
				.status(201)
				.send({ questionID: insertedQuestion.id, answer });
		}
	);
};
