"use client";

import { useState, useCallback } from "react";
import { useFormValidation } from "./useFormValidation";
import { useArticleStore } from "@/store";
import { articleFilterSchema } from "@/utils/validation";
import { ArticleFilters } from "@/repository/articleRepository";

export function useArticleFilter() {
	const { setFilters } = useArticleStore();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Define types that match the validation schema
	type FilterFormValues = {
		searchTerm: string | undefined;
		category: string | null | undefined;
		sortBy: "latest" | "oldest" | "title_asc" | "title_desc";
	};

	const initialValues: FilterFormValues = {
		searchTerm: "",
		category: "",
		sortBy: "latest",
	};
	const {
		values,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setValues,
		resetForm,
	} = useFormValidation({
		initialValues,
		validationSchema: articleFilterSchema,
		onSubmit: async (values) => {
			setIsSubmitting(true);

			try {
				// Convert form values to API filter format
				const filters: ArticleFilters = {
					searchTerm: values.searchTerm || undefined,
					categoryName: values.category || undefined,
					sortBy: values.sortBy,
				};

				// Update global state with new filters
				setFilters(filters);
			} catch (error) {
				console.error("Error applying filters:", error);
			} finally {
				setIsSubmitting(false);
			}
		},
	}); // Handle sort change without requiring a form submit
	const handleCategoryChange = useCallback(
		(categoryValue: string) => {
			setValues({ category: categoryValue });

			// Only update if the category value actually changed
			if (categoryValue !== values.category) {
				// Auto-submit when category changes
				const filters: ArticleFilters = {
					searchTerm: values.searchTerm || undefined,
					categoryName: categoryValue || undefined,
					sortBy: values.sortBy,
				};

				setFilters(filters);
			}
		},
		[
			values.searchTerm,
			values.category,
			values.sortBy,
			setValues,
			setFilters,
		]
	);

	// Clear all filters
	const clearFilters = useCallback(() => {
		resetForm();
		setFilters({});
	}, [resetForm, setFilters]);

	return {
		values,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleCategoryChange,
		clearFilters,
	};
}
