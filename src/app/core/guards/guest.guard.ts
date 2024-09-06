import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// STORES
import { AuthStore } from '../store/auth.store';

export const guestGuard: CanActivateFn = () => {
	const authStore = inject(AuthStore);
	const router = inject(Router);

	authStore.isAuthenticated.subscribe({
		next: (value) => {
			if (value) {
				router.navigate(['todo']);
			}
		},
	});

	return true;
};
