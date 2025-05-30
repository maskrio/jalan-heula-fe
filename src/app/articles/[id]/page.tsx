"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { Article } from "@/repository/articleRepository";
import { articleService } from "@/service";
import { ArticleActions, ArticleEditDialog, CommentsSection } from "@/components/articles";
import { useCommentStore } from "@/store";

// Define props according to Next.js App Router expectations
interface ArticleDetailPageProps {
  params?: Promise<{ id: string }>;

  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ArticleDetailPage({
	params,
	searchParams
}: ArticleDetailPageProps) {	const router = useRouter();
	const { isAuthenticated, loading: authLoading, getCurrentUser } = useAuth();
	const { fetchComments, clearComments, setArticleTitle } = useCommentStore();
	const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
	const [_, setResolvedSearchParams] = useState<{ [key: string]: string | string[] | undefined } | null>(null);
	const [article, setArticle] = useState<Article | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const articleIdRef = useRef<string | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);	useEffect(() => {
		(async () => {
			const paramsResolved = params ? await params : null;
			setResolvedParams(paramsResolved);
			setResolvedSearchParams(searchParams ? await searchParams : null);
			articleIdRef.current = paramsResolved ? paramsResolved.id : null;
		})();

		// Cleanup function to clear comments from the store when unmounting
		return () => {
			clearComments();
		};
	}, [params, searchParams, clearComments]);
	useEffect(() => {
		if (!resolvedParams) return;
		if (!authLoading && !isAuthenticated) {
			router.push("/login");
			return;
		}
		const fetchArticle = async () => {
			try {
				setLoading(true);
				const decodedTitle = decodeURIComponent(articleIdRef.current || "");
				const response = await articleService.getArticleByTitle(decodedTitle);				if (response && response.data && response.data.length > 0) {
					setArticle(response.data[0]);
					setError(null);
					
					// Store article title and prefetch comments if article has an ID
					if (response.data[0].id && response.data[0].title) {
						setArticleTitle(response.data[0].id, decodedTitle);
						fetchComments(response.data[0].id, decodedTitle);
					}
				} else {
					setArticle(null);
					setError("Article not found");
				}
			} catch (err) {
				console.error("Error fetching article:", err);
				setArticle(null);
				setError("Failed to load article. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchArticle();
	}, [isAuthenticated, authLoading, router, resolvedParams, isEditDialogOpen, fetchComments, setArticleTitle]);

	// Wait for params to resolve
	if (!resolvedParams) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex justify-center items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			</>
		);
	}

	if (authLoading || loading) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex justify-center items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex justify-center items-center p-4">
					<div className="max-w-xl w-full bg-destructive/10 p-6 rounded-lg border border-destructive/20 text-center">
						<h2 className="text-xl font-semibold text-destructive mb-2">
							Error Loading Article
						</h2>
						<p className="text-muted-foreground mb-4">{error}</p>
						<Link
							href="/articles"
							className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
						>
							Back to Articles
						</Link>
					</div>
				</div>
			</>
		);
	}

	if (!article) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex justify-center items-center p-4">
					<div className="max-w-xl w-full bg-muted p-6 rounded-lg text-center">
						<h2 className="text-xl font-semibold mb-2">
							Article Not Found
						</h2>
						<p className="text-muted-foreground mb-4">
							The article you&#39;re looking for could not be found.
						</p>
						<Link
							href="/articles"
							className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
						>
							Back to Articles
						</Link>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<main className="min-h-screen py-8">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						{/* Breadcrumb */}
						<nav className="mb-6 text-sm">
							<ol className="flex space-x-2">
								<li>
									<Link
										href="/"
										className="text-muted-foreground hover:text-foreground"
									>
										Home
									</Link>
								</li>
								<li className="text-muted-foreground">/</li>
								<li>
									<Link
										href="/articles"
										className="text-muted-foreground hover:text-foreground"
									>
										Articles
									</Link>
								</li>
								<li className="text-muted-foreground">/</li>{" "}
								<li className="text-foreground font-medium truncate">
									{article.title}
								</li>
							</ol>
						</nav>						{/* Article Header */}
						<div className="mb-8 relative">
							{/* Article Actions (Edit/Delete) */}
							{(() => {
								const currentUser = getCurrentUser();
								const isAuthor = currentUser && article.user && currentUser.id === article.user.id;
								const canEdit = isAuthenticated && isAuthor;
								
								return canEdit && (
									<div className="absolute top-0 right-0">										<ArticleActions 
											article={article} 
											onEdit={() => setIsEditDialogOpen(true)}
											onDelete={() => {
												// Navigate back to articles page after successful deletion
												router.push("/articles");
												// Show success notification
												router.refresh();
											}}
										/>
									</div>
								);
							})()}
							
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{article.title}
							</h1>

							<div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
								<span>
									{new Date(
										article.publishedAt ||
											article.createdAt ||
											new Date().toISOString()
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>

								{article.category && (
									<span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
										{article.category.name}
									</span>
								)}
							</div>
						</div>

						{/* Featured Image */}
						<div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-8">
							{article.cover_image_url ? (
								<Image
									src={article.cover_image_url}
									alt={article.title || "Article image"}
									fill
									className="object-cover"
									priority
								/>
							) : (
								<div className="w-full h-full bg-muted flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-20 w-20 text-muted-foreground/40"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1}
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							)}
						</div>						{/* Article Content */}
						<div className="prose prose-lg dark:prose-invert max-w-none">
							<p className="text-lg text-muted-foreground mb-6">
								{article.description}
							</p>

							{/* Comments Section */}
							<CommentsSection
								articleId={article.id}
								initialComments={article.comments || []}
							/>							{/* Navigation */}
							<div className="mt-12 pt-8 border-t border-border flex justify-between">
								<Link
									href="/articles"
									className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
								>
									← Back to Articles
								</Link>

								{/* In a real app, add next/prev article links here */}
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Edit Dialog */}
			{article && (
				<ArticleEditDialog
					isOpen={isEditDialogOpen}
					onOpenChange={setIsEditDialogOpen}
					article={article}					onSuccess={() => {
						// Refresh the article data
						const fetchArticle = async () => {
							try {
								const decodedTitle = decodeURIComponent(articleIdRef.current || "");
								const response = await articleService.getArticleByTitle(decodedTitle);
								if (response?.data && response.data.length > 0) {
									setArticle(response.data[0]);
									
									// Update the article title in the comment store if it changed
									if (response.data[0].id && response.data[0].title) {
										setArticleTitle(response.data[0].id, decodedTitle);
										// Refresh comments with new title
										fetchComments(response.data[0].id, decodedTitle);
									}
								}
							} catch (err) {
								console.error("Failed to refresh article:", err);
							}
						};
						fetchArticle();
					}}
				/>
			)}
		</>
	);
}
