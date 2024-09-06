import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// SERVICES
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = () => {
	const jwtService = inject(JwtService);
	const router = inject(Router);

	jwtService.isAuthentication.subscribe({
		next: (value) => {
			if (!value) {
				router.navigate(['']);
			}
		},
	});

	return true;
};
