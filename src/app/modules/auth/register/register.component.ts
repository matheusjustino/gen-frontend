import { Component, computed, Inject, OnDestroy } from '@angular/core';
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

// STORES
import { AuthStore } from '../../../core/store/auth.store';

// ENUMS
import { ServiceProviderEnum } from '../../../core/enums/service-provider.enum';

// INTERFACES
import { IAuthService } from '../../../core/interfaces/auth-service.interface';

// COMPONENTS
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, LoadingComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
	protected registerForm!: FormGroup;
	private subs = new SubSink();
	protected loading = computed<boolean>(() => false);

	constructor(
		@Inject(ServiceProviderEnum.AUTH_SERVICE)
		private readonly authService: IAuthService,
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly toastr: ToastrService,
		private readonly authStore: AuthStore,
	) {
		this.loading = this.authStore.loading;
		this.registerForm = this.fb.group({
			name: new FormControl('User', {
				nonNullable: true,
				validators: [Validators.required],
			}),
			email: new FormControl('user1@email.com', {
				nonNullable: true,
				validators: [Validators.required, Validators.email],
			}),
			password: new FormControl('123', {
				nonNullable: true,
				validators: [Validators.required],
			}),
		});
	}

	ngOnDestroy() {
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
