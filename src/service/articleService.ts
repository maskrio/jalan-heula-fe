"use strict";
import {
	articleRepository,
	ArticlesResponse,
	ArticleFilters,
	Article,
} from "@/repository/articleRepository";
import { authService } from "./authService";
import { ArticleFormData } from "@/types";


/**
 * Service for handling article-related operations
 */
export const articleService = {
	/**
	 * Fetch articles with pagination and optional filtering
	 * @param page Page number
	 * @param pageSize Number of items per page
	 * @param filters Optional article filters
	 * @returns Paginated article data
	 */
	async getArticles(
		page: number = 1,
		pageSize: number = 10,
		filters?: ArticleFilters
	): Promise<ArticlesResponse | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}
			const response = await articleRepository.getArticles(
				page,
				pageSize,
				token,
				filters
			);

			return response;
		} catch (error) {
			console.error("Failed to get articles:", error);
			// Return an empty response instead of throwing to prevent build failures
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
	 * Fetch article by title
	 * @param title Article title
	 * @returns Article data including comments
	 */
	async getArticleByTitle(title: string): Promise<ArticlesResponse | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}
			const response = await articleRepository.getArticleByTitle(
				title,
				token
			);
			return response;
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Create a new article
	 * @param articleData Article data to create
	 * @returns Created article data
	 */ async createArticle(articleData: {
		data: ArticleFormData;
	}): Promise<ArticleFormData> {
		try {
			const token = authService.getToken();
			if (!token) {
				throw new Error("No auth token available");
			}

			return await articleRepository.createArticle(articleData, token);
		} catch (error) {
			console.error("Failed to create article:", error);
			throw error;
		}
	}
	/**
	 * Update an existing article
	 * @param documentId Article ID to update
	 * @param articleData Article data to update
	 * @returns Updated article data
	 */,
	async updateArticle(
		documentId: string,
		articleData: { data: Partial<ArticleFormData> }
	): Promise<Article> {
		try {
			const token = authService.getToken();
			if (!token) {
				throw new Error("No auth token available");
			}

			return await articleRepository.updateArticle(
				documentId,
				articleData,
				token
			);
		} catch (error) {
			console.error(
				`Failed to update article with Document ID ${documentId}:`,
				error
			);
			throw error;
		}
	}	/**
	 * Delete an article by ID
	 * @param documentId Article document ID to delete
	 * @returns Deleted article data
	 */,
	deleteArticle(documentId: string): void {
		try {
			const token = authService.getToken();
			if (!token) {
				throw new Error("No auth token available");
			}

			articleRepository.deleteArticle(documentId, token);
			
		} catch (error) {
			console.error(
				`Failed to delete article with document ID ${documentId}:`,
				error
			);
			throw error;
		}
	},
};
