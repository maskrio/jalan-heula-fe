import { useState } from "react";
import { LoginCredentials } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
	const { login: storeLogin, loading, error } = useAuthStore();
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const login = async (data: LoginCredentials) => {
		setSuccess(false);
		
		try {
			const response = await storeLogin(data);
			
			if (response) {
				setSuccess(true);
				router.push("/");
			}
			
			return response;
		} catch (err) {
			console.error("Login failed:", err);
			return null;
		}
	};

	return { login, isLoading: loading, error, success };
}
