import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// ENVS
import { environment } from '../../../environments/environment';

export interface AuthState {
	loading: boolean;
	isAuthenticated: boolean;
}

export const authInitialState: AuthState = {
	loading: false,
	isAuthenticated: false,
};

@Injectable({
	providedIn: 'root',
})
export class AuthStore {
	private readonly _store = signal(authInitialState);
	readonly loading = computed(() => this._store().loading);
	readonly isAuthenticated: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	constructor() {
		const token = this.getToken();
		if (token) {
			this.updateToken(true);
		}
	}

	setLoading(loading: boolean): void {
		this._store.update((state) => ({ ...state, loading }));
	}

	getToken(): string | null {
		return localStorage.getItem(environment.localStorage.authToken);
	}

	updateToken(status: boolean): void {
		this.isAuthenticated.next(status);
	}

	setToken(token: string): void {
		this.updateToken(true);
		localStorage.setItem(environment.localStorage.authToken, token);
	}

	removeToken(): void {
		this.updateToken(false);
		localStorage.removeItem(environment.localStorage.authToken);
	}
}
