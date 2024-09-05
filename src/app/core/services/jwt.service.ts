import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// ENVS
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class JwtService {
	isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false,
	);
	constructor() {
		const token = this.getToken();
		if (token) {
			this.updateToken(true);
		}
	}

	updateToken(status: boolean) {
		this.isAuthentication.next(status);
	}

	setToken(token: string) {
		this.updateToken(true);
		localStorage.setItem(environment.localStorage.authToken, token);
	}

	getToken(): string | null {
		return localStorage.getItem(environment.localStorage.authToken);
	}

	removeToken() {
		this.updateToken(false);
		localStorage.removeItem(environment.localStorage.authToken);
	}
}
