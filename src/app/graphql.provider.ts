import { ApplicationConfig, inject } from '@angular/core';
import {
	ApolloClientOptions,
	ApolloLink,
	InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

// ENVS
import { environment } from '../environments/environment';

const auth = setContext((operation, context) => {
	const token = localStorage.getItem(environment.localStorage.authToken);

	if (token === null) {
		return {};
	} else {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	}
});

export function apolloOptionsFactory(): ApolloClientOptions<any> {
	const httpLink = inject(HttpLink);
	return {
		link: ApolloLink.from([
			auth,
			httpLink.create({ uri: environment.apiUrl }),
		]),
		cache: new InMemoryCache(),
	};
}

export const graphqlProvider: ApplicationConfig['providers'] = [
	Apollo,
	{
		provide: APOLLO_OPTIONS,
		useFactory: apolloOptionsFactory,
	},
];
