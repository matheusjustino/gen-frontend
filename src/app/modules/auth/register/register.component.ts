import { Component, OnDestroy } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
	protected registerForm!: FormGroup;
	private subs = new SubSink();

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly toastr: ToastrService,
	) {
		this.registerForm = this.fb.group({
			name: new FormControl('User', [Validators.required]),
			email: new FormControl('user1@email.com', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl('123', [Validators.required]),
		});
	}

	ngOnDestroy() {
		console.log(this.subs);
		this.subs.unsubscribe();
	}

	navigateTo(route: string) {
		this.router.navigate([route]);
	}

	onSubmit() {
		if (this.registerForm.valid) {
			this.subs.sink = this.authService
				.register(this.registerForm.value)
				.subscribe({
					complete: () => {
						this.toastr.success('Registered successfully');
						this.registerForm.reset();
						this.navigateTo('');
					},
					error: (err) => {
						this.toastr.error(err.message);
					},
				});
		} else {
			this.registerForm.markAllAsTouched();
		}
	}
}
