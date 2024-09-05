import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { DO_LOGIN, REGISTER } from '../gql/mutations';
import { ILogin, IRegister } from '../models/auth.model';
import { JwtService } from './jwt.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public constructor(
		private readonly tokenService: JwtService,
		private readonly apollo: Apollo,
	) {}

	register(data: IRegister) {
		return this.apollo.mutate<{ register: boolean }>({
			mutation: REGISTER,
			variables: data,
		});
	}

	onLogin(data: ILogin) {
		return this.apollo
			.mutate<{ doLogin: string }>({
				mutation: DO_LOGIN,
				variables: data,
			})
			.pipe(
				map((res) => {
					if (!!res.data?.doLogin) {
						this.tokenService.setToken(res.data.doLogin);
						this.apollo.client.resetStore();
					}
				}),
			);
	}

	onLogout() {
		this.tokenService.removeToken();
		this.apollo.client.resetStore();
	}
}
