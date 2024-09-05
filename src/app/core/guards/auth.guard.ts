import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';

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
