"use client";

import { Article } from "@/repository/articleRepository";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import ArticleActions from "./ArticleActions";
import ArticleEditDialog from "./ArticleEditDialog";
import { useAuth } from "@/hooks";

interface ArticleCardProps {
	article: Article;
	ref?: React.Ref<HTMLDivElement>;
}

const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
	({ article }, ref) => {
		const { isAuthenticated, getCurrentUser } = useAuth();
		const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
		const commentCount = article.comments ? article.comments.length : 0;
		const author = article.user?.username || "Unknown";
		const category = article.category?.name;
		const date = new Date(
			article.publishedAt || article.createdAt || new Date().toISOString()
		);
		
		const currentUser = getCurrentUser();
		const isAuthor = currentUser && article.user && currentUser.id === article.user.id;
		const canEdit = isAuthenticated && isAuthor;

		return (
			<>
				<div className="relative pb-4">
					{canEdit && (
						<div className="absolute top-4 right-4 z-10">
							<ArticleActions 
								article={article} 
								onEdit={() => setIsEditDialogOpen(true)}
							/>
						</div>
					)}
					<Link href={`/articles/${encodeURIComponent(article.title || "")}`} passHref className="block">
						<div
							ref={ref}
							className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-card rounded-xl shadow-sm border border-border p-8 group hover:shadow-md transition-all duration-300 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
							tabIndex={0}
							role="link"
						>							{/* Image - Will display at the top on mobile, to the right on desktop */}
							{article.cover_image_url && (
								<div className="w-full md:w-56 flex-shrink-0 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted mb-6 md:mb-0 md:order-last group-hover:shadow-md transition-all duration-300">
									<Image
										src={article.cover_image_url}
										alt={article.title || "Article thumbnail"}
										width={224}
										height={168}
										className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
							)}
							
							{/* Text content */}
							<div className="flex-1 min-w-0">
								<div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground font-medium">
									{category && (
										<span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-2 text-xs font-semibold">
											{category}
										</span>
									)}
									<span className="inline-block">by {author}</span>
								</div>
								<h2 className="text-2xl font-bold text-foreground font-modern mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
									{article.title || "Untitled Article"}
								</h2>
								<p className="text-base text-muted-foreground mb-5 line-clamp-3 font-modern">
									{article.description || "No description available"}
								</p>
								<div className="flex items-center gap-6 text-xs text-muted-foreground mt-4 border-t pt-4 border-border/50">
									<span className="flex items-center gap-1.5">
										<svg
											width="16"
											height="16"
											fill="none"
											viewBox="0 0 24 24"
											className="inline-block"
										>
											<path
												d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{date.toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
									<span className="flex items-center gap-1.5">
										<svg
											width="16"
											height="16"
											fill="none"
											viewBox="0 0 24 24"
											className="inline-block"
										>
											<path
												d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M12 7v5l3 3"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{Math.ceil((article.description?.length || 0) / 500) || 3} min read
									</span>
									<span className="flex items-center gap-1.5">
										<svg
											width="16"
											height="16"
											fill="none"
											viewBox="0 0 24 24"
											className="inline-block"
										>
											<path
												d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{commentCount} {commentCount === 1 ? 'comment' : 'comments'}
									</span>
								</div>
							</div>
						</div>
					</Link>
				</div>

				{/* Edit Dialog */}
				{isEditDialogOpen && (
					<ArticleEditDialog
						isOpen={isEditDialogOpen}
						onOpenChange={setIsEditDialogOpen}
						article={article}
					/>
				)}
			</>
		);
	}
);

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
