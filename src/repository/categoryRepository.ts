"use strict";
import { apiClient } from "@/utils";
import { categorizeError } from "@/utils/errorUtils";

// Define the category types based on the API response
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

export interface CategoriesResponse {
	data: Category[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface CategoryResponse {
	data: Category;
	meta: Record<string, unknown>;
}

export interface CreateCategoryData {
	data: {
		name: string;
		description?: string | null;
	};
}

/**
 * Repository for handling category-related API calls
 */
export const categoryRepository = {
	/**
	 * Fetch all categories
	 * @param token Auth token
	 * @returns Categories data
	 */
	async getCategories(token: string): Promise<CategoriesResponse> {
		try {
			return await apiClient.get<CategoriesResponse>("/categories", {
				token,
				params: {
					"pagination[pageSize]": "100", // Get up to 100 categories
				},
			});
		} catch (error) {
			console.error("Fetch categories request failed:", error);
			throw categorizeError(error);
		}
	},

	/**
	 * Create a new category
	 * @param data Category data to create
	 * @param token Auth token
	 * @returns Created category
	 */
	async createCategory(data: CreateCategoryData, token: string): Promise<Category> {
		try {
			const response = await apiClient.post<CategoryResponse>(
				"/categories",
				data,
				{ token }
			);
			return response.data;
		} catch (error) {
			console.error("Create category request failed:", error);
			throw categorizeError(error);
		}
	},
	/**
	 * Update a category
	 * @param documentId Category document ID to update
	 * @param data Category data to update
	 * @param token Auth token
	 * @returns Updated category
	 */
	async updateCategory(documentId: string, data: CreateCategoryData, token: string): Promise<Category> {
		try {
			const response = await apiClient.put<CategoryResponse>(
				`/categories/${documentId}`,
				data,
				{ token }
			);
			return response.data;
		} catch (error) {
			console.error("Update category request failed:", error);
			throw categorizeError(error);
		}
	},
	/**
	 * Delete a category
	 * @param documentId Category document ID to delete
	 * @param token Auth token
	 * @returns Success status
	 */
	async deleteCategory(documentId: string, token: string): Promise<boolean> {
		try {
			await apiClient.delete(`/categories/${documentId}`, { token });
			return true;
		} catch (error) {
			console.error("Delete category request failed:", error);
			throw categorizeError(error);
		}
	},
};
