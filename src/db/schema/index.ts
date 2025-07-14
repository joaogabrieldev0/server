// BARREL FILE -> Arquivos que reexportam todos os arquivos que estam dentro

import { questions } from './questions.ts';
import { rooms } from './rooms.ts';

export const schema = {
	rooms,
	questions,
};
