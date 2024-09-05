import { gql } from 'apollo-angular';

export const GET_TODOS = gql`
	query {
		getTodos {
			id
			title
			description
			status
		}
	}
`;
