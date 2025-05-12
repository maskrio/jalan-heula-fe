"use client";

import { Article } from "@/repository/articleRepository";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
	article: Article;
	ref?: React.RefObject<HTMLDivElement> | ((node: HTMLDivElement) => void);
}

export default function ArticleCard({ article, ref }: ArticleCardProps) {
	// Safely handle potential null or undefined article
	if (!article) {
		return null;
	}

	const attributes = article;	// Helper function to get category name regardless of data structure
	const getCategoryName = () => {
		// Check if we have a category object with name property (new structure)
		if (attributes?.category?.name) {
			return attributes.category.name;
		}
		return null;
	};

	const categoryName = getCategoryName();

	return (
		<div
			ref={ref as React.Ref<HTMLDivElement>}
			className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
		>
			<div className="aspect-video relative overflow-hidden">
				{attributes && attributes.cover_image_url ? (
					<Image
						src={attributes.cover_image_url}
						alt={attributes.title || "Article image"}
						fill
						className="object-cover transition-transform hover:scale-105 duration-300"
					/>
				) : (
					<div className="w-full h-full bg-muted/50 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 text-muted-foreground/60"
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
				{categoryName && (
					<div className="absolute top-2 right-2">
						<span className="inline-block bg-primary/80 text-primary-foreground text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
							{categoryName}
						</span>
					</div>
				)}{" "}
			</div>{" "}
			<div className="p-4">
				<h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
					{attributes.title || "Untitled Article"}
				</h3>
				<p className="text-muted-foreground text-sm line-clamp-3 mb-4">
					{attributes.description || "No description available"}
				</p>{" "}
				<div className="flex justify-between items-center">
					<span className="text-xs text-muted-foreground">
						{attributes.publishedAt || attributes.createdAt
							? new Date(
									attributes.publishedAt ||
										attributes.createdAt ||
										new Date().toISOString()
							  ).toLocaleDateString()
							: "Date unavailable"}{" "}
					</span>
					<Link
						href={`/articles/${encodeURIComponent(
							article.title || ""
						)}`}
						className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
					>
						Read more →
					</Link>
				</div>
			</div>
		</div>
	);
}
