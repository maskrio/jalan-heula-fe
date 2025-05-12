"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
	return (
		<div>
			<Navbar />
			<div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-muted-foreground">
						Or{" "}
						<Link
							href="/register"
							className="font-medium text-primary hover:text-primary/90"
						>
							create a new account
						</Link>
					</p>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
