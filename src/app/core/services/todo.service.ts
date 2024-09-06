import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map, Observable, throwError } from 'rxjs';

// GQL
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from '../gql/mutations';
import { GET_TODOS } from '../gql/queries';

// INTERFACES
import { ITodoService } from '../interfaces/todo-service.interface';

// MODELS
import { ICreateTodo, ITodo, IUpdateTodo } from '../models/todo.model';

// STORES
import { TodoStore } from '../store/todo.store';

@Injectable({
	providedIn: 'root',
})
export class TodoService implements ITodoService {
	constructor(
		private readonly apollo: Apollo,
		private readonly todoStore: TodoStore,
	) {}

	getAll(): Observable<void> {
		this.todoStore.setLoading(true);
		return this.apollo
			.query<{ getTodos: ITodo[] }>({
				query: GET_TODOS,
			})
			.pipe(
				map((res) => {
					this.todoStore.setTodos(res.data.getTodos);
					this.todoStore.setLoading(false);
				}),
				catchError((err) => {
					this.todoStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}

	create(data: ICreateTodo): Observable<void> {
		this.todoStore.setLoading(true);
		return this.apollo
			.mutate<{ createTodo: ITodo }>({
				mutation: CREATE_TODO,
				variables: data,
			})
			.pipe(
				map((res) => {
					this.todoStore.addTodo(res.data?.createTodo!);
					this.todoStore.setLoading(false);
				}),
				catchError((err) => {
					this.todoStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}

	update(data: IUpdateTodo): Observable<void> {
		this.todoStore.setLoading(true);
		return this.apollo
			.mutate<{ updateTodo: ITodo }>({
				mutation: UPDATE_TODO,
				variables: data,
			})
			.pipe(
				map((res) => {
					this.todoStore.updateTodo(res.data?.updateTodo!);
					this.todoStore.setLoading(false);
				}),
				catchError((err) => {
					this.todoStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}

	delete(todoId: string): Observable<void> {
		return this.apollo
			.mutate<{ deleteTodo: string }>({
				mutation: DELETE_TODO,
				variables: {
					todoId,
				},
			})
			.pipe(
				map(() => {
					this.todoStore.deleteTodo(todoId);
				}),
				catchError((err) => {
					this.todoStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}
}
