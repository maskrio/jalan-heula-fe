"use strict";
import {
	categoryRepository,
	CategoriesResponse,
	CreateCategoryData,
	Category,
} from "@/repository/categoryRepository";
import { authService } from "./authService";

/**
 * Service for handling category-related operations
 */
export const categoryService = {
	/**
	 * Fetch all categories
	 * @returns Categories data
	 */
	async getCategories(): Promise<CategoriesResponse | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}
			const response = await categoryRepository.getCategories(token);
			return response;
		} catch (error) {
			console.error("Failed to get categories:", error);
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
	 * Create a new category
	 * @param name Category name
	 * @returns Created category data or null if error
	 */
	async createCategory(name: string): Promise<Category | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}

			const data: CreateCategoryData = {
				data: {
					name,
				},
			};

			return await categoryRepository.createCategory(data, token);
		} catch (error) {
			console.error("Failed to create category:", error);
			return null;
		}
	},
	/**
	 * Update a category
	 * @param documentId Category document ID
	 * @param name New category name
	 * @returns Updated category data or null if error
	 */
	async updateCategory(documentId: string, name: string): Promise<Category | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}

			const data: CreateCategoryData = {
				data: {
					name,
				},
			};

			return await categoryRepository.updateCategory(documentId, data, token);
		} catch (error) {
			console.error("Failed to update category:", error);
			return null;
		}
	},
	/**
	 * Delete a category
	 * @param documentId Category document ID to delete
	 * @returns Success status
	 */
	async deleteCategory(documentId: string): Promise<boolean> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return false;
			}

			return await categoryRepository.deleteCategory(documentId, token);
		} catch (error) {
			console.error("Failed to delete category:", error);
			return false;
		}
	},
};
