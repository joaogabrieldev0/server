import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.ts';

//! Nessa parte, deve-se ter EXTREMO cuidado na hora de importar os tipos das variáveis, TODAS elas DEVEM ser importadas de "drizzle-orm/pg-core"

export const audioChuncks = pgTable('audio_chuncks', {
	id: uuid().primaryKey().defaultRandom(),
	roomID: uuid()
		.references(() => rooms.id)
		.notNull(),
	question: text().notNull(),
	answer: text(),
	transcription: text().notNull(),
	embeddings: vector({ dimensions: 768 }).notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
