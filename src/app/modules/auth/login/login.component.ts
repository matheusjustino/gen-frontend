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
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
	protected loginForm!: FormGroup;
	private subs = new SubSink();

	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly toastr: ToastrService,
	) {
		this.loginForm = this.fb.group({
			email: new FormControl('user1@email.com', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl('123', [Validators.required]),
		});
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	navigateTo(route: string) {
		this.router.navigate([route]);
	}

	onSubmit() {
		if (this.loginForm.valid) {
			this.subs.sink = this.authService
				.onLogin(this.loginForm.value)
				.subscribe({
					complete: () => {
						this.toastr.success('Logged in');
					},
					error: (err) => {
						this.toastr.error(err.message);
					},
				});
		} else {
			this.loginForm.markAllAsTouched();
		}
	}
}
