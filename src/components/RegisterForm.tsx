"use client";

import { useState } from "react";
import { useRegister } from "@/hooks";
import { PasswordInput } from "@/components/ui/password-visibility-toggle";

export default function RegisterForm() {
	const { register, isLoading, error } = useRegister();	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (formErrors[name]) {
			setFormErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const errors: Record<string, string> = {};

		if (!formData.username.trim()) {
			errors.username = "userName is required";
		}

		if (!formData.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Email is invalid";
		}

		if (!formData.password) {
			errors.password = "Password is required";
		} else if (formData.password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			await register({
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};


	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
			<div className="rounded-md shadow-sm -space-y-px">
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						autoComplete="username"
						required
						className={`appearance-none relative block w-full px-3 py-2 border ${
							formErrors.username
								? "border-destructive"
								: "border-border"
						} rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background text-foreground`}
						placeholder="John Doe"
						value={formData.username}
						onChange={handleChange}
					/>
					{formErrors.name && (
						<p className="mt-1 text-sm text-destructive">
							{formErrors.username}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Email Address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						className={`appearance-none relative block w-full px-3 py-2 border ${
							formErrors.email
								? "border-destructive"
								: "border-border"
						} rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background text-foreground`}
						placeholder="email@example.com"
						value={formData.email}
						onChange={handleChange}
					/>
					{formErrors.email && (
						<p className="mt-1 text-sm text-destructive">
							{formErrors.email}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Password
					</label>
					
					<PasswordInput
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						hasError={!!formErrors.password}
						errorMessage={formErrors.password}
						required
						autoComplete="current-password"
					/>
					
					{formErrors.password && (
						<p className="mt-1 text-sm text-destructive">
							{formErrors.password}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="confirmPassword"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						autoComplete="new-password"
						required
						className={`appearance-none relative block w-full px-3 py-2 border ${
							formErrors.confirmPassword
								? "border-destructive"
								: "border-border"
						} rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background text-foreground`}
						placeholder="••••••••"
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
					{formErrors.confirmPassword && (
						<p className="mt-1 text-sm text-destructive">
							{formErrors.confirmPassword}
						</p>
					)}
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={isLoading}
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
				>
					{isLoading ? (
						<svg
							className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					) : (
						"Sign up"
					)}
				</button>
			</div>

			{error && (
				<div className="rounded-md bg-destructive/10 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-destructive"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>x 
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-destructive">
								Registration failed
							</h3>
							<div className="mt-2 text-sm text-destructive">
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
