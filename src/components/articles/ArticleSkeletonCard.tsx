"use client";

export default function ArticleSkeletonCard() {
	return (
		<div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
			{/* Image placeholder */}
			<div className="aspect-video bg-muted"></div>

			<div className="p-4 space-y-3">
				{/* Title placeholder */}
				<div className="h-6 bg-muted rounded w-3/4"></div>

				{/* Description placeholder */}
				<div className="space-y-2">
					<div className="h-4 bg-muted rounded"></div>
					<div className="h-4 bg-muted rounded w-5/6"></div>
					<div className="h-4 bg-muted rounded w-4/6"></div>
				</div>

				{/* Footer placeholder */}
				<div className="flex justify-between items-center pt-2">
					<div className="h-3 bg-muted rounded w-1/4"></div>
					<div className="h-3 bg-muted rounded w-1/4"></div>
				</div>
			</div>
		</div>
	);
}
