"use client";

import { useArticleFilter } from "@/hooks";
import { useArticleStore, useCategoryStore } from "@/store";
import { useEffect, useState } from "react";

export default function ArticleFilterBar() {
	const [expanded, setExpanded] = useState(false);
	const { articles } = useArticleStore();
	const { categories, fetchCategories } = useCategoryStore();
	const {
		values,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleCategoryChange,
		clearFilters,
	} = useArticleFilter();
	
	// Fetch categories when component mounts
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<div className="bg-card border border-border rounded-lg p-4 mb-8">
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
				<div className="flex items-center gap-2">
					<h3 className="text-lg font-semibold">Filter Articles</h3>
					{articles.length > 0 && (
						<span className="text-sm text-muted-foreground">
							({articles.length} results)
						</span>
					)}
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setExpanded(!expanded)}
						className="text-sm font-medium px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
					>
						{expanded ? "Hide Filters" : "Show Filters"}
					</button>
				</div>
			</div>

			{expanded && (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Search input */}
						<div>
							<label
								htmlFor="searchTerm"
								className="block text-sm font-medium text-foreground mb-1"
							>
								Search
							</label>
							<input
								type="text"
								id="searchTerm"
								name="searchTerm"
								placeholder="Search by title..."
								value={values.searchTerm}
								onChange={handleChange}
								onBlur={handleBlur}
								className={`w-full rounded-md border ${
									errors.searchTerm
										? "border-destructive"
										: "border-border"
								} bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary`}
							/>
							{errors.searchTerm && (
								<p className="mt-1 text-xs text-destructive">
									{errors.searchTerm}
								</p>
							)}
						</div>

						{/* Category filter */}
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium text-foreground mb-1"
							>
								Category
							</label>
							<select
								id="category"
								name="category"
								value={values.category || ""}
								onChange={(e) => {
									const value = e.target.value;
									// Empty string represents "All Categories"
									handleCategoryChange(value);
								}}								className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
							>
								<option value="">All Categories</option>
								{categories.map((category) => (
									<option
										key={`category-${category.id}`}
										value={category.name}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="flex justify-end space-x-3 pt-2">
						<button
							type="button"
							onClick={clearFilters}
							className="px-3 py-1.5 rounded-md text-sm border border-border hover:bg-muted transition-colors"
						>
							Clear Filters
						</button>

						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70"
						>
							{isSubmitting ? (
								<>
									<span className="animate-spin mr-2">
										&#8635;
									</span>
									Applying...
								</>
							) : (
								"Apply Filters"
							)}
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
