import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';

// GQL
import { CREATE_TODO, UPDATE_TODO } from '../gql/mutations';
import { GET_TODOS } from '../gql/queries';

// MODELS
import { ICreateTodo, ITodo, IUpdateTodo } from '../models/todo.model';

// STORES
import { TodoStore } from '../store/todo.store';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	constructor(
		private readonly apollo: Apollo,
		private readonly todoStore: TodoStore,
	) {}

	getAll() {
		return this.apollo
			.query<{ getTodos: ITodo[] }>({
				query: GET_TODOS,
			})
			.pipe(
				map((res) => {
					this.todoStore.setTodos(res.data.getTodos);
					return res.data.getTodos;
				}),
			);
	}

	create(data: ICreateTodo) {
		return this.apollo
			.mutate<{ createTodo: ITodo }>({
				mutation: CREATE_TODO,
				variables: data,
			})
			.pipe(
				map((res) => {
					this.todoStore.addTodo(res.data?.createTodo!);
					return res.data?.createTodo!;
				}),
			);
	}

	update(data: IUpdateTodo) {
		return this.apollo
			.mutate<{ updateTodo: ITodo }>({
				mutation: UPDATE_TODO,
				variables: data,
			})
			.pipe(
				map((res) => {
					this.todoStore.updateTodo(res.data?.updateTodo!);
					return res.data?.updateTodo!;
				}),
			);
	}
}
