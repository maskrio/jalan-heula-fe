import { useState, useEffect } from "react";
import { authService } from "@/service";
import { User } from "@/types";

export function useAuth() {
	const [user, setUser] = useState<User["user"] | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loadUser = async () => {
			try {
				if (authService.isAuthenticated()) {
					const currentUser = authService.getCurrentUser();
					if (currentUser) {
						setUser(currentUser);
					}
				}
			} catch (error) {
				console.error("Error loading user:", error);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, []);

	const saveUser = (userData: User) => {
		authService.saveUserData(userData);
		setUser(userData.user);
	};
	const logout = () => {
		authService.logout();
		setUser(null);
	};

	return {
		user,
		loading,
		isAuthenticated: !!user,
		saveUser,
		logout,
	};
}
