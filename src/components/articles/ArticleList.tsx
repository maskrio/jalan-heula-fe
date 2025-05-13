"use client";

import { useArticles } from "@/hooks";
import ArticleCard from "./ArticleCard";
import ArticleSkeletonCard from "./ArticleSkeletonCard";

export default function ArticleList() {
	const { articles, loading, error, hasMore, lastArticleElementRef } =
		useArticles(6); // Load 6 articles per page
			// Show loading skeletons when first loading
	if (loading && articles.length === 0) {
		return (
			<div>
				{Array.from({ length: 6 }).map((_, index) => (
					<ArticleSkeletonCard key={index} />
				))}
			</div>
		);
	}

	// Show error message
	if (error && articles.length === 0) {
		return (
			<div className="text-center p-8 bg-destructive/10 rounded-lg border border-destructive/20">
				<h3 className="text-lg font-semibold text-destructive mb-2">
					Error Loading Articles
				</h3>
				<p className="text-muted-foreground">{error}</p>
			</div>
		);
	}

	// Show empty state when no articles
	if (articles.length === 0) {
		return (
			<div className="text-center p-8 bg-muted rounded-lg">
				<h3 className="text-lg font-semibold text-foreground mb-2">
					No Articles Found
				</h3>
				<p className="text-muted-foreground">
					Please check back later for new content.
				</p>
			</div>
		);
	}
		return (
		<div>
			{articles.map((article, index) => {
				const isLast = articles.length === index + 1;
				return (
					<ArticleCard
						key={article.id}
						article={article}
						ref={isLast ? lastArticleElementRef : undefined}
					/>
				);
			})}
			
			{/* Loading more indicator */}
			{loading && articles.length > 0 && (
				<div className="flex justify-center p-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			)}

			{/* End of content message */}
			{!hasMore && articles.length > 0 && (
				<div className="text-center p-4">
					<p className="text-muted-foreground text-sm">
						No more articles to load
					</p>
				</div>
			)}
		</div>
	);
}
