// Para criação do servidor

import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createQuestionRoute } from '../http/routes/create-question.ts';
import { createRoomRoute } from '../http/routes/create-room.ts';
import { getRoomsQuestions } from '../http/routes/get-room-questions.ts';
import { getRoomsRoute } from '../http/routes/get-rooms.ts';
import { uploadAudioRoute } from '../http/routes/upload-audio.ts';
import { dotenv } from './env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: 'http://localhost:5173',
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// middlewhere -> rota para verificar se o servidor está rodando bem
app.get('/health', () => {
	return 'OK';
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

await app.listen({ port: dotenv.PORT });
