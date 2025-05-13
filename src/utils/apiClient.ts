import { getBaseUrl } from "@/utils";
/**
 * HTTP request methods
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * Request options for API calls
 */
export interface RequestOptions {
	method?: HttpMethod;
	headers?: Record<string, string>;
	params?: Record<string, string>;
	data?: unknown;
	token?: string;
	contentType?: "json" | "form-urlencoded" | "multipart";
	showError?: boolean;
}

/**
 * Generic API client for making HTTP requests
 */
export const apiClient = {
	/**
	 * Make an HTTP request to the API
	 * @param endpoint API endpoint (without base URL)
	 * @param options Request options
	 * @returns Response data
	 */ async request<T>(
		endpoint: string,
		options: RequestOptions = {}
	): Promise<T> {
		const {
			method = "GET",
			headers = {},
			params,
			data,
			token,
			contentType = "json",
		} = options;

		// Build URL with query parameters
		const url = new URL(`${getBaseUrl()}${endpoint}`);
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, value);
			});
		}

		// Set default headers
		const requestHeaders: Record<string, string> = {
			...headers,
		};

		// Set content type header based on contentType option
		if (method !== "GET" && data) {
			if (contentType === "json") {
				requestHeaders["Content-Type"] = "application/json";
			} else if (contentType === "form-urlencoded") {
				requestHeaders["Content-Type"] =
					"application/x-www-form-urlencoded";
			}
		}

		// Add authorization header if token is provided
		if (token) {
			requestHeaders["Authorization"] = `Bearer ${token}`;
		}

		// Build request options
		const requestOptions: RequestInit = {
			method,
			headers: requestHeaders,
		};

		// Add request body if not a GET request
		if (method !== "GET" && data) {
			if (contentType === "json") {
				requestOptions.body = JSON.stringify(data);
			} else if (contentType === "form-urlencoded") {
				const formData = new URLSearchParams();
				Object.entries(data).forEach(([key, value]) => {
					formData.append(key, String(value));
				});
				requestOptions.body = formData.toString();
			} else if (
				contentType === "multipart" &&
				data instanceof FormData
			) {
				requestOptions.body = data;
			}
		}
		try {
			const response = await fetch(url.toString(), requestOptions); // Handle non-OK responses			// Clone the response so we can use it multiple times if needed
			const clonedResponse = response.clone();
					if (!response.ok) {
				// Try to parse the error response as JSON first
				let errorData;
				let errorMessage = null;

				try {
					const responseText = await response.text();
					errorData = JSON.parse(responseText);

					// Extract error message with better error detection
					if (
						errorData.error &&
						typeof errorData.error === "object"
					) {
						errorMessage =
							errorData.error.message ||
							errorData.error.details ||
							null;
					} else if (errorData.message) {
						errorMessage = errorData.message;
					}
				} catch (parseError) {
					// If parsing fails, use the status text
					throw {
						status: response.status,
						statusText: response.statusText,
						message: parseError,
						response: { data: await clonedResponse.text() },
					};
				}

				// Throw with structured error data from API
				throw {
					status: response.status,
					statusText: response.statusText,
					message: errorMessage || response.statusText,
					error: errorData.error || errorData,
					response: { data: errorData },
				};
			}
			
			// Handle 204 No Content responses - return empty object for these responses
			if (response.status === 204) {
				return {} as T;
			}
			
			let responseData: T;
			try {
				responseData = await response.json();
			} catch {
				try {
					// If JSON parsing fails, try to get the text from the cloned response
					throw {
						status: response.status,
						statusText: response.statusText,
						response: { data: await clonedResponse.text() },
					};
				} catch {
					// If both methods fail, throw a generic error
					throw {
						status: response.status,
						statusText: response.statusText,
						message: "Failed to parse response",
						response: { data: null },
					};
				}
			}

			return responseData as T;
		} catch (error) {
			console.error(`API request failed: ${endpoint}`, error);
			throw error;
		}
	},

	/**
	 * Make a GET request
	 * @param endpoint API endpoint
	 * @param options Request options
	 * @returns Response data
	 */
	async get<T>(
		endpoint: string,
		options: Omit<RequestOptions, "method" | "data"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	},

	/**
	 * Make a POST request
	 * @param endpoint API endpoint
	 * @param data Request body data
	 * @param options Request options
	 * @returns Response data
	 */ async post<T>(
		endpoint: string,
		data?: unknown,
		options: Omit<RequestOptions, "method" | "data"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "POST", data });
	},

	/**
	 * Make a PUT request
	 * @param endpoint API endpoint
	 * @param data Request body data
	 * @param options Request options
	 * @returns Response data
	 */ async put<T>(
		endpoint: string,
		data?: unknown,
		options: Omit<RequestOptions, "method" | "data"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PUT", data });
	},

	/**
	 * Make a DELETE request
	 * @param endpoint API endpoint
	 * @param options Request options
	 * @returns Response data
	 */
	async delete<T>(
		endpoint: string,
		options: Omit<RequestOptions, "method"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "DELETE" });
	},

	/**
	 * Make a PATCH request
	 * @param endpoint API endpoint
	 * @param data Request body data
	 * @param options Request options
	 * @returns Response data
	 */ async patch<T>(
		endpoint: string,
		data?: unknown,
		options: Omit<RequestOptions, "method" | "data"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PATCH", data });
	},
};
