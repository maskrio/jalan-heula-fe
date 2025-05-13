import { create } from "zustand";
import { categoryService } from "@/service";
import type { Category } from "@/repository/categoryRepository";

interface CategoryState {
	categories: Category[];
	isLoading: boolean;
	error: string | null;
	fetchCategories: () => Promise<void>;
	createCategory: (name: string) => Promise<Category | null>;
	updateCategory: (documentId: string, name: string) => Promise<Category | null>;
	deleteCategory: (documentId: string) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
	categories: [],
	isLoading: false,
	error: null,

	fetchCategories: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await categoryService.getCategories();
			if (response && response.data) {
				set({ categories: response.data });
				return;
			}
			set({ error: "Failed to fetch categories" });
		} catch (error) {
			console.error("Error fetching categories:", error);
			set({
				error:
					error instanceof Error
						? error.message
						: "Failed to fetch categories",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	createCategory: async (name: string) => {
		set({ isLoading: true, error: null });
		try {
			const newCategory = await categoryService.createCategory(name);
			if (newCategory) {
				// Add the new category to the existing list
				set((state) => ({
					categories: [...state.categories, newCategory],
				}));
				return newCategory;
			}
			set({ error: "Failed to create category" });
			return null;
		} catch (error) {
			console.error("Error creating category:", error);
			set({
				error:
					error instanceof Error
						? error.message
						: "Failed to create category",
			});
			return null;
		} finally {
			set({ isLoading: false });
		}
	},
	updateCategory: async (documentId: string, name: string) => {
		set({ isLoading: true, error: null });
		try {
			const updatedCategory = await categoryService.updateCategory(documentId, name);
			if (updatedCategory) {
				// Update the category in the list
				set((state) => ({
					categories: state.categories.map((category) =>
						category.documentId === documentId ? updatedCategory : category
					),
				}));
				return updatedCategory;
			}
			set({ error: "Failed to update category" });
			return null;
		} catch (error) {
			console.error("Error updating category:", error);
			set({
				error:
					error instanceof Error
						? error.message
						: "Failed to update category",
			});
			return null;
		} finally {
			set({ isLoading: false });
		}
	},
	deleteCategory: async (documentId: string) => {
		set({ isLoading: true, error: null });
		try {
			const success = await categoryService.deleteCategory(documentId);
			if (success) {
				// Remove the category from the list
				set((state) => ({
					categories: state.categories.filter(
						(category) => category.documentId !== documentId
					),
				}));
				return true;
			}
			set({ error: "Failed to delete category" });
			return false;
		} catch (error) {
			console.error("Error deleting category:", error);
			set({
				error:
					error instanceof Error
						? error.message
						: "Failed to delete category",
			});
			return false;
		} finally {
			set({ isLoading: false });
		}
	},
}));
