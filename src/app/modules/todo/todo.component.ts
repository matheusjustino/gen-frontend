import { Component, computed, OnDestroy, OnInit } from '@angular/core';
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

// MODELS
import { ITodo, ITodoStatus } from '../../core/models/todo.model';

// SERVICES
import { TodoService } from '../../core/services/todo.service';

// STORES
import { TodoStore } from '../../core/store/todo.store';

// COMPONENTS
import { SlidePanelComponent } from '../../components/slide-panel/slide-panel.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

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
	protected readonly todoStatus = ITodoStatus;
	protected readonly todoForm!: FormGroup;
	private readonly subs = new SubSink();
	protected todos = computed<ITodo[]>(() => []);
	protected isSlidePanelOpen = false;
	protected todoId: string | null = null;

	constructor(
		private readonly fb: FormBuilder,
		private readonly todoService: TodoService,
		private readonly toastr: ToastrService,
		private readonly todoStore: TodoStore,
	) {
		this.todos = this.todoStore.todos;
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
			complete: () => {
				this.toastr.success(`TODOs loaded successfully`);
			},
		});
	}

	private createTodo() {
		this.subs.sink = this.todoService
			.create(this.todoForm.value)
			.subscribe({
				next: () => {
					this.toastr.success(`TODO created successfully`);
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
				next: () => {
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
