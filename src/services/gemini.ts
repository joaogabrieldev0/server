import { GoogleGenAI } from '@google/genai';
import { dotenv } from '../env.ts';

const gemini = new GoogleGenAI({
	apiKey: dotenv.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
	// audio/webm
	const response = await gemini.models.generateContent({
		model,
		contents: [
			{
				text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição, mantenha a pontuação adequeada e divida o texto em parágrafos quando for propriado.',
			},
			{
				inlineData: {
					mimeType,
					data: audioAsBase64,
				},
			},
		],
	});

	if (!response.text) {
		// -> Adicionar SweetAlert ou outra API
		throw new Error('Não foi possível converter o áudio');
	}

	return response.text;
}

export async function generateEmbbeddings(text: string) {
	const response = await gemini.models.embedContent({
		model: 'text-embedding-004',
		contents: [{ text }],
		config: {
			taskType: 'RETRIEVAL_DOCUMENT',
		},
	});

	if (!response.embeddings?.[0].values) {
		throw new Error('Não foi possivel gerar o embbeddings');
	}

	return response.embeddings[0].values;
}
