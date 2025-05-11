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
	data?: any;
	token?: string;
	contentType?: "json" | "form-urlencoded" | "multipart";
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
	 */
	async request<T>(
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
			// For multipart/form-data, don't set the Content-Type header
			// as the browser will set it with the correct boundary
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
			const response = await fetch(url.toString(), requestOptions);

			// Handle non-OK responses
			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw {
					status: response.status,
					statusText: response.statusText,
					response: { data: errorData },
				};
			}

			// Parse and return response data
			// Try to parse as JSON, fallback to text if not valid JSON
			const responseData = await response.json().catch(async () => {
				return await response.text();
			});

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
	 */
	async post<T>(
		endpoint: string,
		data?: any,
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
	 */
	async put<T>(
		endpoint: string,
		data?: any,
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
	 */
	async patch<T>(
		endpoint: string,
		data?: any,
		options: Omit<RequestOptions, "method" | "data"> = {}
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PATCH", data });
	},
};
