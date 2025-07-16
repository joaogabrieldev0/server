/** biome-ignore-all lint/style/useTrimStartEnd: false */

import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../src/db/connection.ts';
import { schema } from '../../src/db/schema/index.ts';
import {
	generateEmbbeddings,
	transcribeAudio,
} from '../../src/services/gemini.ts';

// -> Tipagem do GetRoomsRoute
export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		'/rooms/:roomID/audio',
		{
			schema: {
				params: z.object({
					roomID: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { roomID } = request.params;
			const audio = await request.file();

			// -> Trocar para sweet alert mais pra frente
			if (!audio) {
				throw new Error('Audio is Required');
			}

			//1. Transcrever audio com gemini
			//2. Gerar vetor semântico / embeddings
			// 3. Armazenar os vetores no banco de dados

			//? - Streams
			// -> O node trabalha com o sistema de Streams -> Consumir o conteúdo de qualquer coisa aos poucos

			// Acumula em memória todo o conteúdo do arquivo até o arquivo ser totalmente carregado
			const audioBuffer = await audio.toBuffer();
			const audioAsBase64 = audioBuffer.toString('base64');

			const transcription = await transcribeAudio(
				audioAsBase64,
				audio.mimetype
			);

			const embeddings = await generateEmbbeddings(transcription);

			const result = await db
				.insert(schema.audioChuncks)
				.values({
					roomID,
					question: transcription,
					transcription,
					embeddings,
				})
				.returning();

			const chunck = result[0];

			if (!chunck) {
				throw new Error('Erro ao salvar chunck de áudio');
			}

			return reply.status(201).send({ chunckID: chunck.id });
		}
	);
};
