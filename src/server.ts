// Para criação do servidor

import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createRoomRoute } from '../http/routes/create-room.ts';
import { getRoomsQuestions } from '../http/routes/get-room-questions.ts';
import { getRoomsRoute } from '../http/routes/get-routes.ts';
import { dotenv } from './env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// middlewhere -> rota para verificar se o servidor está rodando bem
app.get('/health', () => {
	return 'OK';
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);

await app.listen({ port: dotenv.PORT });
