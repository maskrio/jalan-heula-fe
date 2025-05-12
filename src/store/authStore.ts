import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authService } from "@/service";
import { LoginCredentials, RegisterCredentials, User } from "@/types";
import { toast } from "@/hooks";
import { AppError } from "@/utils/errorUtils";

// Define the authentication state interface
interface AuthState {
	user: User["user"] | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;

	// Actions
	login: (credentials: LoginCredentials) => Promise<User | null>;
	register: (credentials: RegisterCredentials) => Promise<User | null>;
	logout: () => void;
	clearError: () => void;
	checkAuth: () => void;
}

// Create the auth store with Zustand
export const useAuthStore = create<AuthState>()(
	devtools(
		(set) => ({
			// Initial state
			user: null,
			token: null,
			isAuthenticated: false,
			loading: false,
			error: null,

			// Login action
			login: async (credentials: LoginCredentials) => {
				set({ loading: true, error: null });

				try {
					const response = await authService.login(credentials);

					set({
						user: response.user,
						token: response.jwt,
						isAuthenticated: true,
						loading: false,
						error: null,
					});

					// Show success toast
					toast({
						title: "Authentication Successful",
						description: `Welcome ${
							response.user.username ||
							response.user.email ||
							"back"
						}!`,
						variant: "default",
					});

					return response;
				} catch (error) {
					const appError = error as AppError;

					set({
						loading: false,
						error: appError.message || "Login failed",
					});

					// Show error toast
					toast({
						title: "Login Failed",
						description: appError.message || "Login failed",
						variant: "destructive",
					});

					return null;
				}
			},

			// Register action
			register: async (credentials: RegisterCredentials) => {
				set({ loading: true, error: null });

				try {
					const response = await authService.register(credentials);

					set({
						user: response.user,
						token: response.jwt,
						isAuthenticated: true,
						loading: false,
						error: null,
					});

					// Show success toast
					toast({
						title: "Registration Successful",
						description: `Welcome ${
							response.user.username ||
							response.user.email ||
							"to our platform"
						}!`,
						variant: "default",
					});

					return response;
				} catch (error) {
					const appError = error as AppError;

					set({
						loading: false,
						error: appError.message || "Registration failed",
					});

					// Show error toast
					toast({
						title: "Registration Failed",
						description: appError.message || "Registration failed",
						variant: "destructive",
					});

					return null;
				}
			},

			// Logout action
			logout: () => {
				authService.logout();

				set({
					user: null,
					token: null,
					isAuthenticated: false,
					loading: false,
					error: null,
				});

				// Show toast notification
				toast({
					title: "Logged Out",
					description: "You have been successfully logged out.",
					variant: "default",
				});
			},

			// Clear error action
			clearError: () => {
				set({ error: null });
			},

			// Check auth state action (for initialization)
			checkAuth: () => {
				if (authService.isAuthenticated()) {
					const user = authService.getCurrentUser();
					const token = authService.getToken();

					if (user && token) {
						set({
							user,
							token,
							isAuthenticated: true,
						});
					} else {
						// Invalid state, clean up
						authService.logout();
						set({ isAuthenticated: false });
					}
				}
			},
		}),
		{ name: "auth-store" }
	)
);
