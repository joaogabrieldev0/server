// Para validação das variáveis ambiente ".env"

import { z } from 'zod';

const envSchema = z.object({
	// coerce.number -> converte o valor para numero
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url().startsWith('postgresql://'),
	GEMINI_API_KEY: z.string(),
});

export const dotenv = envSchema.parse(process.env);
