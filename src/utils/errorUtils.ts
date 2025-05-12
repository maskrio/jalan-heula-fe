/**
 * Type guard to check if an object has a specific property
 */
function hasProperty<K extends string>(
	obj: unknown,
	key: K
): obj is Record<K, unknown> {
	return typeof obj === "object" && obj !== null && key in obj;
}

/**
 * Error types for application operations
 */
export enum ErrorType {
	INVALID_CREDENTIALS = "invalid_credentials",
	USER_EXISTS = "user_exists",
	NETWORK_ERROR = "network_error",
	SERVER_ERROR = "server_error",
	VALIDATION_ERROR = "validation_error",
	UNKNOWN_ERROR = "unknown_error",
}

/**
 * Structured app error with categorized type
 */
export interface AppError {
	type: ErrorType;
	message: string;
	originalError?: unknown;
}

/**
 * Extract error message from API error response
 * @param error Any error object
 * @param defaultMessage Default message to show if error format is not recognized
 * @returns Error message string
 */
export function extractErrorMessage(
	error: unknown,
	defaultMessage: string
): string {
	// Handle AppError objects first
	if (
		hasProperty(error, "type") &&
		hasProperty(error, "message") &&
		typeof error.message === "string"
	) {
		return error.message;
	}
	if (
		hasProperty(error, "response") &&
		hasProperty(error.response, "data") &&
		hasProperty(error.response.data, "message") &&
		typeof error.response.data.message === "string"
	) {
		return error.response.data.message;
	}

	if (
		hasProperty(error, "error") &&
		hasProperty(error.error, "message") &&
		typeof error.error.message === "string"
	) {
		return error.error.message;
	}

	if (hasProperty(error, "message") && typeof error.message === "string") {
		return error.message;
	}
	if (
		hasProperty(error, "statusText") &&
		typeof error.statusText === "string"
	) {
		return error.statusText;
	}

	return defaultMessage;
}

/**
 * Categorize errors based on API response
 * @param error Any error object
 * @returns Structured AppError object
 */
export function categorizeError(error: unknown): AppError {
	// Default error
	const defaultError: AppError = {
		type: ErrorType.UNKNOWN_ERROR,
		message: extractErrorMessage(error, "An unexpected error occurred"),
		originalError: error,
	};

	// If it's already an AppError, return it
	if (
		error &&
		typeof error === "object" &&
		"type" in error &&
		"message" in error
	) {
		return error as AppError;
	}

	// Handle fetch errors (network issues)
	if (error instanceof Error && error.name === "TypeError") {
		return {
			type: ErrorType.NETWORK_ERROR,
			message:
				"Unable to connect to server. Please check your internet connection.",
			originalError: error,
		};
	}
	// Handle API error responses
	if (error && typeof error === "object") {
		const err = error as Record<string, unknown>;
		// Check for Strapi-style error object - keep original message
		if (err.error && typeof err.error === "object") {
			const strapiError = err.error as Record<string, unknown>;
			const errorMessage =
				typeof strapiError.message === "string"
					? strapiError.message
					: "An error occurred"; // Handle validation errors
			if (
				typeof strapiError.name === "string" &&
				strapiError.name === "ValidationError"
			) {
				if (
					errorMessage.toLowerCase().includes("identifier") ||
					errorMessage.toLowerCase().includes("password") ||
					errorMessage.toLowerCase().includes("credentials")
				) {
					return {
						type: ErrorType.INVALID_CREDENTIALS,
						message: errorMessage,
						originalError: error,
					};
				}

				return {
					type: ErrorType.VALIDATION_ERROR,
					message: errorMessage,
					originalError: error,
				};
			}

			// Email already taken
			if (errorMessage.toLowerCase().includes("email")) {
				return {
					type: ErrorType.USER_EXISTS,
					message: errorMessage,
					originalError: error,
				};
			}

			// Return the error with its original message
			return {
				type: ErrorType.UNKNOWN_ERROR,
				message: errorMessage,
				originalError: error,
			};
		}

		// Handle HTTP status codes
		if (err.status) {
			switch (err.status) {
				case 401:
					return {
						type: ErrorType.INVALID_CREDENTIALS,
						message: "Invalid login credentials",
						originalError: error,
					};
				case 403:
					return {
						type: ErrorType.INVALID_CREDENTIALS,
						message:
							"Access denied. Please check your credentials.",
						originalError: error,
					};
				case 400:
					return {
						type: ErrorType.VALIDATION_ERROR,
						message: "Please check your information and try again",
						originalError: error,
					};
				case 500:
				case 502:
				case 503:
					return {
						type: ErrorType.SERVER_ERROR,
						message: "Server error. Please try again later.",
						originalError: error,
					};
			}
		}
	}

	return defaultError;
}
