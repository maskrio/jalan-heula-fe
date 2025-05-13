"use client";

import { useState } from "react";
import { useToast } from "@/hooks";
import { Plus, Loader2 } from "lucide-react";
import type { Category } from "@/repository/categoryRepository";
import { useCategoryStore } from "@/store";

interface CreateCategoryProps {
	onCategoryCreated?: (category: Category) => void;
}

export default function CreateCategory({
	onCategoryCreated,
}: CreateCategoryProps) {
	const { toast } = useToast();
	const [newCategoryName, setNewCategoryName] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const createCategory = useCategoryStore(state => state.createCategory);	const handleCreateCategory = async () => {
		if (!newCategoryName.trim()) {
			toast({
				title: "Error",
				description: "Category name cannot be empty",
				variant: "destructive",
			});
			return;
		}

		setIsCreating(true);

		try {
			const newCategory = await createCategory(newCategoryName);

			if (newCategory) {
				toast({
					title: "Success",
					description: `Category "${newCategoryName}" created successfully`,
				});

				// Reset the input
				setNewCategoryName("");

				// Call the callback if provided
				if (onCategoryCreated) {
					onCategoryCreated(newCategory);
				}
			} else {
				throw new Error("Failed to create category");
			}
		} catch (error) {
			console.error("Error creating category:", error);

			toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Failed to create category",
				variant: "destructive",
			});
		} finally {
			setIsCreating(false);
		}
	};
	return (
		<div className="flex items-center gap-2 mt-2">
			{" "}
			<input
				type="text"
				value={newCategoryName}
				onChange={(e) => setNewCategoryName(e.target.value)}
				onKeyDown={(e) => {
					if (
						e.key === "Enter" &&
						newCategoryName.trim() &&
						!isCreating
					) {
						e.preventDefault();
						handleCreateCategory();
					}
				}}
				className="flex-1 px-3 py-1 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="Enter new category name"
				disabled={isCreating}
			/>
			<button
				type="button"
				onClick={handleCreateCategory}
				disabled={isCreating || !newCategoryName.trim()}
				className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			>
				{isCreating ? (
					<Loader2 className="h-3 w-3 animate-spin" />
				) : (
					<Plus className="h-3 w-3" />
				)}
				Add
			</button>
		</div>
	);
}
