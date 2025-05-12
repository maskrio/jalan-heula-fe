import * as yup from "yup";

// Common validation patterns that can be reused across schemas
export const patterns = {
	username: /^[a-zA-Z0-9_-]+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
};

// Common validation messages to maintain consistency
export const messages = {
	required: (field: string) => `${field} is required`,
	min: (field: string, length: number) =>
		`${field} must be at least ${length} characters`,
	max: (field: string, length: number) =>
		`${field} must be less than ${length} characters`,
	email: "Email must be a valid email address",
	username:
		"Username can only contain letters, numbers, underscores and hyphens",
	password: {
		min: "Password must be at least 8 characters",
		pattern:
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
	},
	passwordMatch: "Passwords must match",
};

// Common field definitions that can be reused across schemas
export const fields = {
	username: yup
		.string()
		.required(messages.required("Username"))
		.min(3, messages.min("Username", 3))
		.max(20, messages.max("Username", 20))
		.matches(patterns.username, messages.username),

	email: yup
		.string()
		.required(messages.required("Email"))
		.email(messages.email),

	password: yup
		.string()
		.required(messages.required("Password"))
		.min(8, messages.password.min)
		.matches(patterns.password, messages.password.pattern),

	confirmPassword: (passwordField: string = "password") =>
		yup
			.string()
			.required(messages.required("Password confirmation"))
			.oneOf([yup.ref(passwordField)], messages.passwordMatch),

	// Generic field for identifiers (username or email)
	identifier: yup
		.string()
		.required(messages.required("Email or username"))
		.min(3, messages.min("Email or username", 3)),
};
