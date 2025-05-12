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

	return {
		user,
		loading,
		isAuthenticated,
		logout,
	};
}
