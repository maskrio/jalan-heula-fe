"use client";

import Navbar from "@/components/Navbar";
import { CategoryManagement } from "@/components/articles";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageCategoriesPage() {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	// Check if user is authenticated and has necessary permissions
	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, loading, router]);

	if (loading) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex justify-center items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			</>
		);
	}

	return (
		<div>
			<Navbar />
			<main className="min-h-screen font-modern">
				{/* Page Header */}
				<section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								Category Management
							</h1>
							<p className="text-md text-muted-foreground">
								Create, edit, and manage categories for your
								travel articles
							</p>
						</div>
					</div>
				</section>

				{/* Category Management Section */}
				<section className="py-6 md:py-8">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<CategoryManagement />
					</div>
				</section>
			</main>
		</div>
	);
}
