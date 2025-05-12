import { authRepository } from "@/repository";
import { RegisterCredentials, LoginCredentials, User } from "@/types";
import Cookies from "js-cookie";
import { toast } from "@/hooks";
import { AppError } from "@/utils/errorUtils";

// Simple client-side authentication service
export const authService = {
	/**
	 * Save user data and tokens from API response
	 * @param userData User data with token from API
	 */ saveUserData(userData: User): void {
		if (userData.jwt) {
			localStorage.setItem("auth_token", userData.jwt);
			localStorage.setItem("user_data", JSON.stringify(userData));
			Cookies.set("auth_token", userData.jwt, {
				expires: 7, // 7 days
				path: "/",
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
			});

			toast({
				title: "Authentication Successful",
				description: `Welcome ${
					userData.user.username || userData.user.email || "back"
				}!`,
				variant: "default",
			});
		}
	},
	/**
	 * Register a new user
	 * @param credentials User registration data
	 * @returns User data with token
	 */ async register(credentials: RegisterCredentials): Promise<User> {
		try {
			const response = await authRepository.register(credentials);
			this.saveUserData(response);
			return response;
		} catch (error) {
			const appError = error as AppError;
			toast({
				title: "Registration Failed",
				description: appError.message,
				variant: "destructive",
			});

			throw error;
		}
	},
	/**
	 * Log in an existing user
	 * @param credentials User login credentials
	 * @returns User data with token
	 */ async login(credentials: LoginCredentials): Promise<User> {
		try {
			const response = await authRepository.login(credentials);
			this.saveUserData(response);
			return response;
		} catch (error) {
			const appError = error as AppError;
			toast({
				title: "Login Failed",
				description: appError.message,
				variant: "destructive",
			});

			throw error;
		}
	},
	/**
	 * Log out the current user
	 */ logout(): void {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_data");

		Cookies.remove("auth_token", { path: "/" });

		// Show success toast for logout
		toast({
			title: "Logged Out",
			description: "You have been successfully logged out.",
			variant: "default",
		});
	},

	/**
	 * Get the current authentication token
	 * @returns The authentication token or null if not authenticated
	 */
	getToken(): string | null {
		const cookieToken = Cookies.get("auth_token");
		if (cookieToken) return cookieToken;

		return localStorage.getItem("auth_token");
	},

	/**
	 * Check if the user is currently authenticated
	 * @returns Boolean indicating if the user is authenticated
	 */
	isAuthenticated(): boolean {
		return !!this.getToken();
	},

	/**
	 * Get the current user data
	 * @returns User data or null if not logged in
	 */ getCurrentUser(): User["user"] | null {
		const userData = localStorage.getItem("user_data");
		if (userData) {
			try {
				const parsed = JSON.parse(userData);
				return parsed.user;
			} catch (e) {
				console.error("Error parsing user data:", e);

				toast({
					title: "Session Error",
					description:
						"Your session data is corrupted. Please log in again.",
					variant: "destructive",
				});

				// Clean up corrupted data
				this.logout();
				return null;
			}
		}
		return null;
	},
};
