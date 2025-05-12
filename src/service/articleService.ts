"use strict";
import {
	articleRepository,
	ArticleResponse,
	ArticleFilters,
} from "@/repository/articleRepository";
import { authService } from "./authService";

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
	): Promise<ArticleResponse | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}			const response = await articleRepository.getArticles(
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
						total: 0
					}
				}
			};
		}
	},


	/**
	 * Fetch article by title
	 * @param title Article title
	 * @returns Article data including comments
	 */
	async getArticleByTitle(title: string): Promise<ArticleResponse | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}			const response = await articleRepository.getArticleByTitle(title, token);
			return response;
		} catch (error) {
			throw error
		}
	},
};
