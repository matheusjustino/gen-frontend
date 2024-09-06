import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map, Observable, throwError } from 'rxjs';

// STORES
import { AuthStore } from './../store/auth.store';

// GQL
import { DO_LOGIN, REGISTER } from '../gql/mutations';

// MODELS
import { ILogin, IRegister } from '../models/auth.model';

// INTERFACES
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	public constructor(
		private readonly apollo: Apollo,
		private readonly authStore: AuthStore,
	) {}

	register(data: IRegister): Observable<void> {
		this.authStore.setLoading(true);
		return this.apollo
			.mutate<void>({
				mutation: REGISTER,
				variables: data,
			})
			.pipe(
				map(() => {
					this.authStore.setLoading(false);
				}),
				catchError((err) => {
					this.authStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}

	onLogin(data: ILogin): Observable<void> {
		this.authStore.setLoading(true);
		return this.apollo
			.mutate<{ doLogin: string }>({
				mutation: DO_LOGIN,
				variables: data,
			})
			.pipe(
				map((res) => {
					if (!!res.data?.doLogin) {
						this.authStore.setToken(res.data.doLogin);
						this.apollo.client.resetStore();
						this.authStore.setLoading(false);
					}
				}),
				catchError((err) => {
					this.authStore.setLoading(false);
					return throwError(() => err);
				}),
			);
	}

	onLogout(): void {
		this.authStore.removeToken();
		this.apollo.client.resetStore();
	}
}
