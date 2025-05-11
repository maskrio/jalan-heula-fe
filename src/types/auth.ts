export type RegisterCredentials = {
	username: string;
	email: string;
	password: string;
};

export type LoginCredentials = {
	identifier: string;
	password: string;
};

export type User = {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
	}
};
