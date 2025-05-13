"use client";

export default function ArticleSkeletonCard() {
	return (
		<div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-card rounded-xl shadow-sm border border-border p-8 animate-pulse mb-4">
			{/* Image placeholder - shows at top on mobile, right on desktop */}
			<div className="w-full md:w-56 flex-shrink-0 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted mb-6 md:mb-0 md:order-last"></div>
			
			{/* Text content */}
			<div className="flex-1 min-w-0">
				{/* Category and author placeholder */}
				<div className="mb-3 flex items-center gap-2">
					<div className="h-5 bg-primary/10 rounded w-16"></div>
					<div className="h-4 bg-muted rounded w-24"></div>
				</div>
				
				{/* Title placeholder */}
				<div className="h-8 bg-muted rounded w-3/4 mb-3"></div>
				
				{/* Description placeholder */}
				<div className="space-y-2 mb-5">
					<div className="h-4 bg-muted rounded"></div>
					<div className="h-4 bg-muted rounded w-5/6"></div>
					<div className="h-4 bg-muted rounded w-4/6"></div>
				</div>

				{/* Footer placeholder with separator */}
				<div className="border-t border-border/50 pt-4 mt-4">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-1.5">
							<div className="h-4 w-4 bg-muted rounded-full"></div>
							<div className="h-3 bg-muted rounded w-20"></div>
						</div>
						<div className="flex items-center gap-1.5">
							<div className="h-4 w-4 bg-muted rounded-full"></div>
							<div className="h-3 bg-muted rounded w-16"></div>
						</div>
						<div className="flex items-center gap-1.5">
							<div className="h-4 w-4 bg-muted rounded-full"></div>
							<div className="h-3 bg-muted rounded w-24"></div>
						</div>
					</div>				</div>
			</div>
		</div>
	);
}
