import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';

import { CREATE_TODO, UPDATE_TODO } from '../gql/mutations';
import { GET_TODOS } from '../gql/queries';
import { ICreateTodo, ITodo, IUpdateTodo } from '../models/todo.model';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	constructor(private readonly apollo: Apollo) {}

	getAll() {
		return this.apollo
			.query<{ getTodos: ITodo[] }>({
				query: GET_TODOS,
			})
			.pipe(map((res) => res.data.getTodos));
	}

	create(data: ICreateTodo) {
		return this.apollo
			.mutate<{ createTodo: ITodo }>({
				mutation: CREATE_TODO,
				variables: data,
			})
			.pipe(map((res) => res.data?.createTodo!));
	}

	update(data: IUpdateTodo) {
		return this.apollo
			.mutate<{ updateTodo: ITodo }>({
				mutation: UPDATE_TODO,
				variables: data,
			})
			.pipe(map((res) => res.data?.updateTodo!));
	}
}
