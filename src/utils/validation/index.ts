import * as yup from "yup";

// Re-export all validation schemas and utilities
export * from "./common";
export * from "./auth";
export * from "./article";

// Generic validation function that can be used with any schema
export const validateForm = async <T extends Record<string, unknown>>(
	schema: yup.Schema<T>,
	data: T
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
	try {
		await schema.validate(data, { abortEarly: false });
		return { isValid: true, errors: {} };
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			const errors: Record<string, string> = {};
			error.inner.forEach((err) => {
				if (err.path) {
					errors[err.path] = err.message;
				}
			});
			return { isValid: false, errors };
		}
		return { isValid: false, errors: { form: "Validation failed" } };
	}
};
