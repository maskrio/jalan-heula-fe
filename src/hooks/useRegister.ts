import { useState } from "react";
import { authService } from "@/service";
import { RegisterCredentials } from "@/types";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export function useRegister() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const { saveUser } = useAuth();
	const router = useRouter();

	const register = async (data: RegisterCredentials) => {
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await authService.register(data);
			saveUser(response);
			setSuccess(true);

			router.push("/");

			return response;
		} catch (err: any) {
			const errorMessage =
				err?.response?.data?.message ||
				"Registration failed. Please try again.";
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { register, isLoading, error, success };
}
