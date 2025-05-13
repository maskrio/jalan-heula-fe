"use strict";
import { apiClient } from "@/utils";
import { categorizeError } from "@/utils/errorUtils";
import { UserDetails } from "@/types";

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
};

export interface ArticleResponse {
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
	 */	async getArticles(
		page: number = 1,
		pageSize: number = 10,
		token: string,
		filters?: ArticleFilters
	): Promise<ArticleResponse> {
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
				}			}
			return await apiClient.get<ArticleResponse>("/articles", {
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
						total: 0
					}
				}
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
	): Promise<ArticleResponse> {
		try {
			const params: Record<string, string> = {
				populate: "*",
				"filters[title][$eqi]": title,
			};			return await apiClient.get<ArticleResponse>("/articles", {
				params,
				token,
			});
		} catch (error) {
			throw categorizeError(error);
		}
	},
};
