import { Observable } from 'rxjs';

// MODELS
import { ICreateTodo, IUpdateTodo } from '../models/todo.model';

export interface ITodoService {
	getAll(): Observable<void>;
	create(data: ICreateTodo): Observable<void>;
	update(data: IUpdateTodo): Observable<void>;
	delete(todoId: string): Observable<void>;
}
