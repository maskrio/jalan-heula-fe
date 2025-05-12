/**
 * Get the base URL for API requests from environment variables
 * @returns The base URL for API requests
 */
export function getBaseUrl(): string {
	// Use the environment variable or fallback to a default value
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	if (!baseUrl) {
		console.warn(
			"NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
		);
		return "http://localhost:1337/api";
	}

	return baseUrl;
}
