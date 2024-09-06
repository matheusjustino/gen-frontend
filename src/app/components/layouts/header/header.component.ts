import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// SERVICES
import { AuthService } from '../../../core/services/auth.service';
import { JwtService } from '../../../core/services/jwt.service';

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
		private readonly jwtService: JwtService,
	) {
		this.isAuthenticated$ = jwtService.isAuthentication;
	}

	onLogout() {
		this.authService.onLogout();
	}
}
