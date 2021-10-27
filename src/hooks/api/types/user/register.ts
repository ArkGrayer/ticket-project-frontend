export interface RegisterInput {
	email: string;
	password: string;
}

export interface RegisterOutput {
	authCode: string;
}
