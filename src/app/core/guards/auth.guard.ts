import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// STORES
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = () => {
	const authStore = inject(AuthStore);
	const router = inject(Router);

	authStore.isAuthenticated.subscribe({
		next: (value) => {
			if (!value) {
				router.navigate(['']);
			}
		},
	});

	return true;
};
