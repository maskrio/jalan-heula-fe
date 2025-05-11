import { useState } from "react";
import { authService } from "@/service";
import { LoginCredentials } from "@/types";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export function useLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const { saveUser } = useAuth();
	const router = useRouter();

	const login = async (data: LoginCredentials) => {
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await authService.login(data);
			saveUser(response);
			setSuccess(true);

			router.push("/");

			return response;
		} catch (err: any) {
			const errorMessage =
				err?.response?.data?.message ||
				"Login failed. Please check your credentials and try again.";
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { login, isLoading, error, success };
}
