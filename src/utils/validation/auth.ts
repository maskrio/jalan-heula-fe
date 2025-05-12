import * as yup from "yup";
import { fields } from "./common";

// Login validation schema
export const loginSchema = yup.object().shape({
	identifier: fields.identifier,
	password: fields.password,
});

// Registration validation schema
export const registerSchema = yup.object().shape({
	username: fields.username,
	email: fields.email,
	password: fields.password,
	confirmPassword: fields.confirmPassword(),
});

// Reset password validation schema
export const resetPasswordSchema = yup.object().shape({
	password: fields.password,
	confirmPassword: fields.confirmPassword(),
});

// Forgot password validation schema
export const forgotPasswordSchema = yup.object().shape({
	email: fields.email,
});

// Change password validation schema
export const changePasswordSchema = yup.object().shape({
	currentPassword: yup.string().required("Current password is required"),
	newPassword: fields.password,
	confirmNewPassword: fields.confirmPassword("newPassword"),
});
