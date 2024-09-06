import { gql } from 'apollo-angular';

export const REGISTER = gql`
	mutation ($name: String!, $email: String!, $password: String!) {
		register(input: { name: $name, email: $email, password: $password })
	}
`;

export const DO_LOGIN = gql`
	mutation ($email: String!, $password: String!) {
		doLogin(input: { email: $email, password: $password })
	}
`;

export const CREATE_TODO = gql`
	mutation ($title: String!, $description: String!, $status: TodoStatus!) {
		createTodo(
			input: { title: $title, description: $description, status: $status }
		) {
			id
			title
			description
			status
		}
	}
`;

export const UPDATE_TODO = gql`
	mutation (
		$id: String!
		$title: String!
		$description: String!
		$status: TodoStatus!
	) {
		updateTodo(
			input: {
				id: $id
				title: $title
				description: $description
				status: $status
			}
		) {
			id
			title
			description
			status
		}
	}
`;

export const DELETE_TODO = gql`
	mutation ($todoId: String!) {
		deleteTodo(todoId: $todoId)
	}
`;
