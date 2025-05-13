"use strict";
import { apiClient } from "@/utils";
import { categorizeError } from "@/utils/errorUtils";
import { ArticleFormData, UserDetails } from "@/types";

// Define the article types based on the actual API response
export interface Comment {
	id: number;
	documentId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string | null;
}

export interface Category {
	id: number;
	documentId: string;
	name: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string | null;
}

export interface Article {
	id: number;
	documentId?: string;
	title?: string;
	description?: string;
	cover_image_url?: string | null;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	locale?: string | null;
	comments?: Comment[];
	category?: Category;
	user?: UserDetails;
}

export interface ArticlesResponse {
	data: Article[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface ArticleResponse {
	data: Article;
	meta: Record<string, unknown>;
}

// Filter options interface
export interface ArticleFilters {
	searchTerm?: string;
	categoryName?: string;
	sortBy?: "latest" | "oldest" | "title_asc" | "title_desc";
}

/**
 * Repository for handling article-related API calls
 */
export const articleRepository = {
	/**
	 * Fetch articles with pagination and optional filtering
	 * @param page Current page number
	 * @param pageSize Number of items per page
	 * @param token Auth token
	 * @param filters Optional filter criteria
	 * @returns Paginated article data
	 */ async getArticles(
		page: number = 1,
		pageSize: number = 10,
		token: string,
		filters?: ArticleFilters
	): Promise<ArticlesResponse> {
		try {
			const params: Record<string, string> = {
				"pagination[page]": page.toString(),
				"pagination[pageSize]": pageSize.toString(),
				populate: "*",
			};

			// Add search filter if provided
			if (filters?.searchTerm) {
				params["filters[title][$containsi]"] = filters.searchTerm;
			}

			// Add category filter if provided
			if (filters?.categoryName) {
				params["filters[category][name][$eqi]"] = filters.categoryName;
			}

			// Add sorting if provided
			if (filters?.sortBy) {
				switch (filters.sortBy) {
					case "latest":
						params["sort[0]"] = "publishedAt:desc";
						break;
					case "oldest":
						params["sort[0]"] = "publishedAt:asc";
						break;
					case "title_asc":
						params["sort[0]"] = "title:asc";
						break;
					case "title_desc":
						params["sort[0]"] = "title:desc";
						break;
				}
			}
			return await apiClient.get<ArticlesResponse>("/articles", {
				params,
				token,
			});
		} catch (error) {
			console.error("Fetch articles request failed:", error);
			// Return a fallback empty response to prevent build failures
			return {
				data: [],
				meta: {
					pagination: {
						page: 1,
						pageSize: 10,
						pageCount: 0,
						total: 0,
					},
				},
			};
		}
	},

	/**
	 * Fetch article details by title
	 * @param title Article title
	 * @param token Auth token
	 * @returns Article details with comments
	 */
	async getArticleByTitle(
		title: string,
		token: string
	): Promise<ArticlesResponse> {
		try {
			const params: Record<string, string> = {
				populate: "*",
				"filters[title][$eqi]": title,
			};
			return await apiClient.get<ArticlesResponse>("/articles", {
				params,
				token,
			});
		} catch (error) {
			throw categorizeError(error);
		}
	},
	/**
	 * Create a new article
	 * @param data Article data to create
	 * @param token Auth token
	 * @returns Created article
	 */ async createArticle(
		data: { data: ArticleFormData },
		token: string
	): Promise<ArticleFormData> {
		try {
			const response = await apiClient.post<{ data: ArticleFormData }>(
				"/articles",
				data,
				{ token }
			);
			return response.data;
		} catch (error) {
			throw categorizeError(error);
		}
	}
	/**
	 * Update an existing article
	 * @param documentId Article Document ID to update
	 * @param data Article data to update
	 * @param token Auth token
	 * @returns Updated article
	 */,
	async updateArticle(
		documentId: string,
		data: { data: Partial<ArticleFormData> },
		token: string
	): Promise<Article> {
		try {
			// The API returns { data: {...articleData} }
			const response = await apiClient.put<ArticleResponse>(
				`/articles/${documentId}`,
				data,
				{ token }
			);
			// We need to extract the article from the response.data
			return response.data;
		} catch (error) {
			throw categorizeError(error);
		}
	},
	/**
	 * Delete an article by documentID
	 * @param documentId Article documentID to delete
	 * @param token Auth token
	 * @returns Deleted article data
	 */
	deleteArticle(documentId: string, token: string): void {
		try {
			apiClient.delete<ArticleResponse>(
				`/articles/${documentId}`,
				{ token }
			);
		} catch (error) {
			throw categorizeError(error);
		}
	},
};
