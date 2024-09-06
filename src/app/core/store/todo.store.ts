import { computed, Injectable, signal } from '@angular/core';

// MODELS
import { ITodo } from '../models/todo.model';

export interface AppState {
	todos: ITodo[];
}

const initialState: AppState = {
	todos: [],
};

@Injectable({
	providedIn: 'root',
})
export class TodoStore {
	private readonly _store = signal(initialState);
	readonly todos = computed(() => this._store().todos);

	setTodos(todos: ITodo[]): void {
		this._store.update((state) => ({ ...state, todos }));
	}

	addTodo(todo: ITodo): void {
		this._store.update((state) => ({
			...state,
			todos: [...state.todos, todo],
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
}
