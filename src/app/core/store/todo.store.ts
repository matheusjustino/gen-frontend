import { computed, Injectable, signal } from '@angular/core';

// MODELS
import { ITodo } from '../models/todo.model';

export interface TodoState {
	loading: boolean;
	todos: ITodo[];
}

export const todoInitialState: TodoState = {
	loading: false,
	todos: [],
};

@Injectable({
	providedIn: 'root',
})
export class TodoStore {
	private readonly _store = signal(todoInitialState);
	readonly todos = computed(() => this._store().todos);
	readonly loading = computed(() => this._store().loading);

	setLoading(loading: boolean): void {
		this._store.update((state) => ({ ...state, loading }));
	}

	setTodos(todos: ITodo[]): void {
		this._store.update((state) => ({ ...state, todos }));
	}

	addTodo(todo: ITodo): void {
		this._store.update((state) => ({
			...state,
			todos: [todo, ...state.todos],
		}));
	}

	updateTodo(todo: ITodo): void {
		this._store.update((state) => {
			const outdatedTodoIndex = state.todos.findIndex(
				(t) => t.id === todo.id,
			);
			if (outdatedTodoIndex > -1) {
				const todosCopy = [...state.todos];
				todosCopy[outdatedTodoIndex] = todo;
				return {
					...state,
					todos: todosCopy,
				};
			}

			return state;
		});
	}

	deleteTodo(todoId: string): void {
		this._store.update((state) => {
			return {
				...state,
				todos: [...state.todos.filter((todo) => todo.id !== todoId)],
			};
		});
	}
}
