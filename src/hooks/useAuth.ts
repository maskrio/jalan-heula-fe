import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
	const { 
		user,
		loading,
		isAuthenticated,
		logout,
		checkAuth
	} = useAuthStore();

	// Check authentication status on load
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	/**
	 * Get the current authenticated user
	 * @returns The current user or null if not authenticated
	 */
	const getCurrentUser = () => {
		return user;
	};

	return {
		user,
		loading,
		isAuthenticated,
		logout,
		getCurrentUser,
	};
}
