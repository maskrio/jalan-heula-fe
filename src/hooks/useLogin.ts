import { useState } from "react";
import { authService } from "@/service";
import { LoginCredentials } from "@/types";
import { useRouter } from "next/navigation";
import { AppError } from "@/utils/errorUtils";

export function useLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const login = async (data: LoginCredentials) => {
		setIsLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const response = await authService.login(data);
			setSuccess(true);

			router.push("/");

			return response;
		} catch (err: unknown) {
			if (
				err &&
				typeof err === "object" &&
				"type" in err &&
				"message" in err
			) {
				const appError = err as AppError;
				setError(appError.message);
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError(
					"Login failed. Please check your credentials and try again."
				);
			}

			return null;
		} finally {
			setIsLoading(false);
		}
	};

	return { login, isLoading, error, success };
}
