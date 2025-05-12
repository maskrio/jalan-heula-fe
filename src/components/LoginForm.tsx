"use client";

import { useLogin, useFormValidation } from "@/hooks";
import { PasswordInput } from "@/components/ui/password-visibility-toggle";
import { loginSchema } from "@/utils/validation";
import Link from "next/link";

export default function LoginForm() {
	const { login, isLoading, error } = useLogin();

	const initialValues = {
		identifier: "",
		password: "",
	};

	const {
		values,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
	} = useFormValidation({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: async (values) => {
			try {
				await login({
					identifier: values.identifier,
					password: values.password,
				});
			} catch (error) {
				console.error("Login failed:", error);
			}
		},
	});

	return (
		<div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="identifier"
						className="block text-sm font-medium text-foreground"
					>
						Email or Username
					</label>
					<div className="mt-1">
						<input
							id="identifier"
							name="identifier"
							type="text"
							autoComplete="username"
							required
							className={`appearance-none block w-full px-3 py-2 border ${
								errors.identifier
									? "border-destructive"
									: "border-border"
							} rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground`}
							value={values.identifier}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.identifier && (
							<p className="mt-1 text-sm text-destructive">
								{errors.identifier}
							</p>
						)}
					</div>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-foreground"
					>
						Password
					</label>
					<div className="mt-1">
						<PasswordInput
							id="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							hasError={!!errors.password}
							errorMessage={errors.password}
							required
							autoComplete="current-password"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-background"
						/>
						<label
							htmlFor="remember-me"
							className="ml-2 block text-sm text-foreground"
						>
							Remember me
						</label>
					</div>

					<div className="text-sm">
						<Link
							href="/forgot-password"
							className="font-medium text-primary hover:text-primary/90"
						>
							Forgot your password?
						</Link>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={isLoading || isSubmitting}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{isLoading || isSubmitting ? (
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
							"Sign in"
						)}
					</button>
				</div>
			</form>

			{error && (
				<div className="mt-4 rounded-md bg-destructive/10 p-4">
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
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-destructive">
								Login failed
							</h3>
							<div className="mt-2 text-sm text-destructive">
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
