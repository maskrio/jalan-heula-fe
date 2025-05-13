import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { articleService } from "@/service";
import {
	Article,
	ArticleResponse,
	ArticleFilters,
} from "@/repository/articleRepository";
import { toast } from "@/hooks";
import { AppError } from "@/utils/errorUtils";
import { ArticleFormData } from "@/types";

interface ArticleState {
	articles: Article[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	page: number;
	filters: ArticleFilters;
	// Actions
	fetchArticles: (
		pageSize?: number,
		filters?: ArticleFilters
	) => Promise<ArticleResponse | null>;
	loadMoreArticles: () => Promise<ArticleResponse | null>;
	resetArticles: () => void;
	setFilters: (filters: ArticleFilters) => void;
	updateArticle: (documentId: string, data: ArticleFormData) => Promise<Article | null>;
	deleteArticle: (documentId: string) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>()(
	devtools(
		(set, get) => ({
			// Initial state
			articles: [],
			loading: false,
			error: null,
			hasMore: true,
			page: 1,
			filters: {},

			// Set filters action
			setFilters: (filters: ArticleFilters) => {
				set({ filters });
				// Reset pagination when filters change
				const { fetchArticles } = get();
				fetchArticles(6, filters);
			},

			// Fetch articles action (reset and load first page)
			fetchArticles: async (pageSize = 6, filters?: ArticleFilters) => {
				set({ loading: true, error: null });

				// Use provided filters or existing ones
				const currentFilters = filters || get().filters;

				try {
					const response = await articleService.getArticles(
						1,
						pageSize,
						currentFilters
					);

					if (response) {
						set({
							articles: response.data,
							page: 1,
							hasMore:
								response.meta.pagination.page <
								response.meta.pagination.pageCount,
							loading: false,
							error: null,
							// If filters were provided, update them in the store
							...(filters ? { filters } : {}),
						});
					} else {
						set({
							articles: [],
							loading: false,
							hasMore: false,
							error: "Unable to fetch articles",
						});
					}

					return response;
				} catch (error) {
					const appError = error as AppError;
					const errorMessage =
						appError.message || "Failed to fetch articles";

					set({
						loading: false,
						error: errorMessage,
					});

					toast({
						title: "Error Loading Articles",
						description: errorMessage,
						variant: "destructive",
					});

					return null;
				}
			},

			// Load more articles action (for infinite scroll)
			loadMoreArticles: async () => {
				const { page, loading, hasMore, filters } = get();

				if (loading || !hasMore) return null;

				set({ loading: true, error: null });

				try {
					const nextPage = page + 1;
					const response = await articleService.getArticles(
						nextPage,
						6,
						filters
					);

					if (response) {
						set({
							articles: [...get().articles, ...response.data],
							page: nextPage,
							hasMore:
								response.meta.pagination.page <
								response.meta.pagination.pageCount,
							loading: false,
							error: null,
						});
					} else {
						set({
							loading: false,
							hasMore: false,
						});
					}

					return response;
				} catch (error) {
					const appError = error as AppError;
					const errorMessage =
						appError.message || "Failed to load more articles";

					set({
						loading: false,
						error: errorMessage,
					});

					toast({
						title: "Error",
						description: errorMessage,
						variant: "destructive",
					});

					return null;
				}
			},			// Reset articles state
			resetArticles: () => {
				set({
					articles: [],
					loading: false,
					error: null,
					hasMore: true,
					page: 1,
					filters: {},
				});
			},			// Update an article
			updateArticle: async (documentId: string, data: ArticleFormData) => {
				set({ loading: true, error: null });
				
				try {
					const updatedArticle = await articleService.updateArticle(documentId, {
						data: data,
					});
					
					if (updatedArticle) {
						// Update the article in the local store
						const updatedArticles = get().articles.map(article => 
							article.documentId === documentId ? { ...article, ...updatedArticle } : article
						);
						
						set({
							articles: updatedArticles,
							loading: false,
							error: null,
						});
						
						toast({
							title: "Success!",
							description: "Article updated successfully",
						});
						
						return updatedArticle;
					}
					
					return null;
				} catch (error) {
					const appError = error as AppError;
					const errorMessage = appError.message || "Failed to update article";
					
					set({
						loading: false,
						error: errorMessage,
					});
					
					toast({
						title: "Error",
						description: errorMessage,
						variant: "destructive",
					});
					
					return null;
				}
			},
					// Delete an article
			deleteArticle: async (documentId: string) => {
				set({ loading: true, error: null });
				
				try {
					
					// Remove the article from the local store
					const filteredArticles = get().articles.filter(
						article => article.documentId !== documentId
					);
					
					set({
						articles: filteredArticles,
						loading: false,
						error: null,
					});
					
					toast({
						title: "Success!",
						description: "Article deleted successfully",
					});
					
					return true;
					
				} catch (error) {
					console.error("Error deleting article:", error);
					const appError = error as AppError;
					const errorMessage = appError.message || "Failed to delete article";
					
					set({
						loading: false,
						error: errorMessage,
					});
					
					toast({
						title: "Error",
						description: errorMessage,
						variant: "destructive",
					});
					
					return false;
				}
			},
		}),
		{ name: "article-store" }
	)
);
