import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.ts';

//! Nessa parte, deve-se ter EXTREMO cuidado na hora de importar os tipos das variáveis, TODAS elas DEVEM ser importadas de "drizzle-orm/pg-core"

export const questions = pgTable('questions', {
	id: uuid().primaryKey().defaultRandom(),
	roomID: uuid()
		.references(() => rooms.id)
		.notNull(),
	question: text().notNull(),
	answer: text(),
	createdAt: timestamp().defaultNow().notNull(),
});
