export type ITodoType = 'OPEN' | 'PROGRESS' | 'DONE';

export const ITodoStatus = ['OPEN', 'PROGRESS', 'DONE'];

export interface ITodo {
	id?: string;
	title: string;
	description: string;
	status: ITodoType;
}

export interface ICreateTodo {
	title: string;
	description: string;
	status: ITodoType;
}

export interface IUpdateTodo {
	id: string;
	title?: string;
	description?: string;
	status?: ITodoType;
}
