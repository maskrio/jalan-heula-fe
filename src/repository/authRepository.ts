import { apiClient } from "@/utils/apiClient";
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";

/**
 * Repository for handling authentication-related API calls
 */
export const authRepository = {
	/**
	 * Register a new user
	 * @param credentials Registration credentials
	 * @returns User data with auth token
	 */
	async register(credentials: RegisterCredentials): Promise<User> {
		try {
			return await apiClient.post<User>(
				"/auth/local/register",
				credentials,
				{ contentType: "form-urlencoded" }
			);
		} catch (error) {
			console.error("Registration request failed:", error);
			throw error;
		}
	},

	/**
	 * Log in an existing user
	 * @param credentials Login credentials
	 * @returns User data with auth token
	 */
	async login(credentials: LoginCredentials): Promise<User> {
		try {
			return await apiClient.post<User>("/auth/local", credentials, {
				contentType: "form-urlencoded",
			});
		} catch (error) {
			console.error("Login request failed:", error);
			throw error;
		}
	},

	/**
	 * Get the current user profile
	 * @param token Authentication token
	 * @returns User profile data
	 */
	async getCurrentUser(token: string): Promise<User> {
		try {
			return await apiClient.get<User>("/users/me", { token });
		} catch (error) {
			console.error("Get current user request failed:", error);
			throw error;
		}
	},
};
