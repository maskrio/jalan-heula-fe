"use client";

import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen flex flex-col">
				<div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div className="text-center">
							<h2 className="mt-6 text-3xl font-bold text-foreground">
								Create your account
							</h2>
							<p className="mt-2 text-sm text-muted-foreground">
								Already have an account?{" "}
								<Link
									href="/login"
									className="font-medium text-primary hover:text-primary/90"
								>
									Sign in
								</Link>
							</p>
						</div>

						<RegisterForm />

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-border"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-background text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 flex w-min-full gap-3">
								<button
									type="button"
									className="inline-flex justify-center items-center w-full px-4 py-2 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-muted/20"
								>
									<svg
										className="h-5 w-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
