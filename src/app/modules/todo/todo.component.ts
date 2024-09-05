import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { SlidePanelComponent } from '../../components/slide-panel/slide-panel.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';
import { ITodo, ITodoStatus } from '../../core/models/todo.model';
import { TodoService } from '../../core/services/todo.service';

@Component({
	selector: 'app-todo',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		LucideAngularModule,
		TodoCardComponent,
		SlidePanelComponent,
	],
	templateUrl: './todo.component.html',
	styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit, OnDestroy {
	protected readonly PlusIcon = Plus;
	protected todos: ITodo[] = [];
	protected todoStatus = ITodoStatus;
	protected isSlidePanelOpen = false;
	protected todoId: string | null = null;
	protected todoForm!: FormGroup;
	private subs = new SubSink();

	constructor(
		private readonly fb: FormBuilder,
		private readonly todoService: TodoService,
		private readonly toastr: ToastrService,
	) {
		this.todoForm = this.fb.group({
			title: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			status: new FormControl('OPEN', [Validators.required]),
		});
	}

	ngOnInit() {
		this.getAllTodos();
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	onOpenSlidePanel() {
		this.isSlidePanelOpen = true;
	}

	onCloseSlidePanel() {
		this.isSlidePanelOpen = false;
		this.resetForm();
	}

	onLoadTodoForm(item: ITodo) {
		this.todoId = item.id!;
		this.todoForm.patchValue({
			title: item.title,
			description: item.description,
			status: item.status,
		});
		this.onOpenSlidePanel();
	}

	onSubmit() {
		if (this.todoForm.valid) {
			if (this.todoId) {
				this.updateTodo();
			} else {
				this.createTodo();
			}
		} else {
			this.todoForm.markAsTouched();
		}
	}

	private resetForm() {
		this.todoId = null;
		this.todoForm.reset();
	}

	private getAllTodos() {
		this.subs.sink = this.todoService.getAll().subscribe({
			next: (res) => {
				this.todos = res;
			},
		});
	}

	private createTodo() {
		this.subs.sink = this.todoService
			.create(this.todoForm.value)
			.subscribe({
				next: (res) => {
					this.toastr.success(`TODO created successfully`);
					this.todos = [res, ...this.todos];
					this.onCloseSlidePanel();
				},
				error: (err) => {
					console.error(err);
					this.toastr.error(`Something went wrong`);
				},
			});
	}

	private updateTodo() {
		this.subs.sink = this.todoService
			.update({ ...this.todoForm.value, id: this.todoId })
			.subscribe({
				next: (res) => {
					const outdatedTodoIndex = this.todos.findIndex(
						(t) => t.id === res.id,
					);
					if (outdatedTodoIndex > -1) {
						const todosCopy = [...this.todos];
						todosCopy[outdatedTodoIndex] = res;
						this.todos = [...todosCopy];
					}
					this.toastr.success(`TODO updated successfully`);
					this.onCloseSlidePanel();
				},
				error: (err) => {
					console.error(err);
					this.toastr.error(`Something went wrong`);
				},
			});
	}
}
