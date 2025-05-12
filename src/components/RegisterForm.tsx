"use client";

import { useRegister, useFormValidation } from "@/hooks";
import { PasswordInput } from "@/components/ui/password-visibility-toggle";
import { registerSchema } from "@/utils/validation";

export default function RegisterForm() {
	const { register, isLoading, error } = useRegister();

	const initialValues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
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
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			try {
				await register({
					username: values.username,
					email: values.email,
					password: values.password,
				});
			} catch (error) {
				console.error("Registration failed:", error);
			}
		},
	});

	return (
		<div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
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
						className={`appearance-none block w-full px-3 py-2 border ${
							errors.username
								? "border-destructive"
								: "border-border"
						} rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background text-foreground`}
						placeholder="John Doe"
						value={values.username}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.username && (
						<p className="mt-1 text-sm text-destructive">
							{errors.username}
						</p>
					)}
				</div>

				<div>
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
						className={`appearance-none block w-full px-3 py-2 border ${
							errors.email
								? "border-destructive"
								: "border-border"
						} rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background text-foreground`}
						placeholder="email@example.com"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-destructive">
							{errors.email}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Password
					</label>

					<PasswordInput
						id="password"
						name="password"
						value={values.password}
						onChange={handleChange}
						hasError={!!errors.password}
						errorMessage={errors.password}
						required
						autoComplete="new-password"
					/>
				</div>

				<div>
					<label
						htmlFor="confirmPassword"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Confirm Password
					</label>
					<PasswordInput
						id="confirmPassword"
						name="confirmPassword"
						value={values.confirmPassword}
						onChange={handleChange}
						hasError={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword}
						required
						autoComplete="new-password"
					/>
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
							"Sign up"
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
								Registration failed
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
