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

export async function generateAnswer(
	question: string,
	transcription: string[]
) {
	const context = transcription.join('\n\n');

	const prompt = `
		Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em Português do Brasil.

		CONTEXTO: ${context}

		PERGUNTA: ${question}

		INSTRUÇÕES:
			- Use apenas informações contidas no contexto enviado
			- Se a resposta não for enviada no contexto, apenas escreva que não possui informações
			- Seja objetivo;
			- Mantenha um tom educativo e profissional;
			- Crie trechos relevantes do contexto se apropriado;
			- Se for citar o contexto, utilize o termo "conteúdo da aula;
	`.trim();

	const response = await gemini.models.generateContent({
		model,
		contents: [
			{
				text: prompt,
			},
		],
	});

	if (!response.text) {
		throw new Error('Falha ao gerar resposta pelo Gemini');
	}

	return response.text;
}
