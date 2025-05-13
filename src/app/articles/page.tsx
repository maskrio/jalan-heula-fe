"use client";

import Navbar from "@/components/Navbar";
import {
	ArticleList,
	ArticleFilterBar,
	ArticleCreateButton,
} from "@/components/articles";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define props according to Next.js App Router expectations
interface ArticlesPageProps {
	params?: Promise<{ [key: string]: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ArticlesPage({
	params,
	searchParams,
}: ArticlesPageProps) {
	const { isAuthenticated, loading } = useAuth();
	const [resolvedParams, setResolvedParams] = useState<{
		[key: string]: string;
	} | null>(null);
	const [resolvedSearchParams, setResolvedSearchParams] = useState<{
		[key: string]: string | string[] | undefined;
	} | null>(null);

	useEffect(() => {
		(async () => {
			setResolvedParams(params ? await params : null);
			setResolvedSearchParams(searchParams ? await searchParams : null);
		})();
	}, [params, searchParams]);

	if (!resolvedParams && !resolvedSearchParams) {
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
				{/* Articles Hero Section */}
				<section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
								Explore Our Travel Articles
							</h1>
							<p className="text-lg text-muted-foreground mb-8">
								Discover amazing destinations, travel tips, and
								immersive experiences
							</p>
						</div>
					</div>
				</section>

				{/* Articles List Section */}
				<section className="py-12">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						{loading ? (
							<div className="flex justify-center items-center py-16">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
							</div>
						) : isAuthenticated ? (
							<>
								{/* Create Article Button */}
								<div className="mb-8 flex justify-end">
									<ArticleCreateButton
										onSuccess={() => {
											// Refresh the articles list after successful creation
											window.location.reload();
										}}
									/>
								</div>

								<ArticleFilterBar />
								<ArticleList />
							</>
						) : (
							<div className="text-center p-8 md:p-16 bg-muted/30 rounded-xl border border-border">
								<h2 className="text-2xl font-bold text-foreground mb-4">
									Sign In to Read Our Articles
								</h2>
								<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
									Please sign in to access our exclusive
									collection of travel articles, tips and
									experiences.
								</p>
								<div className="flex flex-col sm:flex-row justify-center gap-4">
									<Link
										href="/login"
										className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
									>
										Sign In
									</Link>
									<Link
										href="/register"
										className="px-6 py-3 bg-accent/10 text-accent-foreground hover:bg-accent/20 rounded-lg font-medium transition-colors"
									>
										Create Account
									</Link>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
