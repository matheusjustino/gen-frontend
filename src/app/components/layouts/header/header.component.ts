import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// SERVICES
import { AuthService } from '../../../core/services/auth.service';

// STORES
import { AuthStore } from '../../../core/store/auth.store';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	protected isAuthenticated$;

	constructor(
		private readonly authService: AuthService,
		private readonly authStore: AuthStore,
	) {
		this.isAuthenticated$ = authStore.isAuthenticated;
	}

	onLogout() {
		this.authService.onLogout();
	}
}
