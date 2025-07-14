import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

//! Nessa parte, deve-se ter EXTREMO cuidado na hora de importar os tipos das variáveis, TODAS elas DEVEM ser importadas de "drizzle-orm/pg-core"

export const rooms = pgTable('rooms', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	description: text(),
	createdAt: timestamp().defaultNow().notNull(),
});
