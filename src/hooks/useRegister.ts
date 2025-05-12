import { useState } from "react";
import { RegisterCredentials } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useRegister() {
	const { register: storeRegister, loading, error } = useAuthStore();
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const register = async (data: RegisterCredentials) => {
		setSuccess(false);
		
		try {
			const response = await storeRegister(data);
			
			if (response) {
				setSuccess(true);
				router.push("/");
			}
			
			return response;
		} catch (err) {
			console.error("Registration failed:", err);
			return null;
		}
	};

	return { register, isLoading: loading, error, success };
}
