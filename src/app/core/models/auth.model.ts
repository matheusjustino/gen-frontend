export interface IUser {
	id: string;
	name: string;
	email: string;
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface ILoginResponse {
	message: string;
	token: string;
	user: IUser;
}
