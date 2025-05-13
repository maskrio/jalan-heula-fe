"use client";

import { useState, useEffect } from "react";
import { useCategoryStore } from "@/store";
import { useToast } from "@/hooks";
import { Pencil, Trash2, X, Check, Loader2, Plus, AlertTriangle } from "lucide-react";
import type { Category } from "@/repository/categoryRepository";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function CategoryManagement() {
	const { toast } = useToast();
	const {
		categories,
		isLoading,
		fetchCategories,
		createCategory,
		updateCategory,
		deleteCategory,
	} = useCategoryStore();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editName, setEditName] = useState("");
	const [newCategoryName, setNewCategoryName] = useState("");
	const [isCreating, setIsCreating] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
	const [processedItems, setProcessedItems] = useState<
		Record<string, boolean>
	>({});

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);
	const handleEdit = (category: Category) => {
		setEditingId(category.documentId);
		setEditName(category.name);
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditName("");
	};

	const handleUpdate = async (documentId: string) => {
		if (!editName.trim()) {
			toast({
				title: "Error",
				description: "Category name cannot be empty",
				variant: "destructive",
			});
			return;
		}

		setProcessedItems((prev) => ({ ...prev, [documentId]: true }));

		try {
			const result = await updateCategory(documentId, editName);
			if (result) {
				toast({
					title: "Success",
					description: "Category updated successfully",
				});
				setEditingId(null);
			} else {
				throw new Error("Failed to update category");
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Failed to update category",
				variant: "destructive",
			});
		} finally {
			setProcessedItems((prev) => ({ ...prev, [documentId]: false }));
		}
	};

	const handleDelete = async (documentId: string) => {
        setProcessedItems((prev) => ({ ...prev, [documentId]: true }));

		try {
			const result = await deleteCategory(documentId);
			if (result) {
				toast({
					title: "Success",
					description: "Category deleted successfully",
				});
			} else {
				throw new Error("Failed to delete category");
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Failed to delete category",
				variant: "destructive",
			});
		} finally {
            setShowDeleteDialog(false);
            setCategoryToDelete(null);
			setProcessedItems((prev) => ({ ...prev, [documentId]: false }));
		}
	};

    const confirmDelete = (documentId: string) => {
        setCategoryToDelete(documentId);
        setShowDeleteDialog(true);
    };

	const handleCreateCategory = async () => {
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
				setNewCategoryName("");
			} else {
				throw new Error("Failed to create category");
			}
		} catch (error) {
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
		<div className="bg-card border border-border rounded-lg p-6 my-6">
			<h2 className="text-xl font-bold mb-6">Category Management</h2>

			{/* Create new category */}
			<div className="mb-6">
				<h3 className="text-md font-semibold mb-2">
					Create New Category
				</h3>
				<div className="flex items-center gap-2">
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
						className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
						placeholder="Enter new category name"
						disabled={isCreating}
					/>
					<button
						type="button"
						onClick={handleCreateCategory}
						disabled={isCreating || !newCategoryName.trim()}
						className="inline-flex items-center gap-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
					>
						{isCreating ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Plus className="h-4 w-4" />
						)}
						Add
					</button>
				</div>
			</div>

			{/* Category list */}
			<div>
				<h3 className="text-md font-semibold mb-2">All Categories</h3>

				{isLoading ? (
					<div className="flex justify-center p-6">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</div>
				) : categories.length === 0 ? (
					<p className="text-center py-6 text-muted-foreground">
						No categories found
					</p>
				) : (
					<div className="border border-border rounded-md overflow-hidden">
						<table className="w-full">
							<thead className="bg-muted">
								<tr>
									<th className="px-4 py-3 text-left text-sm font-medium">
										Name
									</th>
									<th className="px-4 py-3 text-right text-sm font-medium">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{categories.map((category) => (
									<tr
										key={category.documentId}
										className="bg-card hover:bg-muted/30"
									>
										<td className="px-4 py-3 text-sm">
											{editingId === category.documentId ? (
												<input
													type="text"
													value={editName}
													onChange={(e) =>
														setEditName(
															e.target.value
														)
													}
													onKeyDown={(e) => {
														if (
															e.key === "Enter" &&
															editName.trim()
														) {
															handleUpdate(
																category.documentId
															);
														} else if (
															e.key === "Escape"
														) {
															handleCancelEdit();
														}
													}}
													className="w-full px-2 py-1 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
													autoFocus
												/>
											) : (
												category.name
											)}
										</td>
										<td className="px-4 py-3 text-sm text-right space-x-1">
											{editingId === category.documentId ? (
												<>
													<button
														onClick={() =>
															handleUpdate(
																category.documentId
															)
														}
														disabled={
															processedItems[
																category.documentId
															] ||
															!editName.trim()
														}
														className="inline-flex items-center p-1 text-green-600 hover:text-green-800 focus:outline-none disabled:opacity-50"
														title="Save"
													>
														{processedItems[
															category.documentId
														] ? (
															<Loader2 className="h-4 w-4 animate-spin" />
														) : (
															<Check className="h-4 w-4" />
														)}
													</button>
													<button
														onClick={
															handleCancelEdit
														}
														disabled={
															processedItems[
																category.documentId
															]
														}
														className="inline-flex items-center p-1 text-muted-foreground hover:text-foreground focus:outline-none disabled:opacity-50"
														title="Cancel"
													>
														<X className="h-4 w-4" />
													</button>
												</>
											) : (
												<>
													<button
														onClick={() =>
															handleEdit(category)
														}
														disabled={
															processedItems[
																category.documentId
															] ||
															editingId !== null
														}
														className="inline-flex items-center p-1 text-blue-600 hover:text-blue-800 focus:outline-none disabled:opacity-50"
														title="Edit"
													>
														<Pencil className="h-4 w-4" />
													</button>
													<button
														onClick={() =>
															confirmDelete(
																category.documentId
															)
														}
														disabled={
															processedItems[
																category.documentId
															] ||
															editingId !== null
														}
														className="inline-flex items-center p-1 text-red-600 hover:text-red-800 focus:outline-none disabled:opacity-50"
														title="Delete"
													>
														{processedItems[
															category.documentId
														] ? (
															<Loader2 className="h-4 w-4 animate-spin" />
														) : (
															<Trash2 className="h-4 w-4" />
														)}
													</button>
												</>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Delete confirmation dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-red-600 flex items-center">
							<AlertTriangle className="w-5 h-5 mr-2" />
							Confirm Deletion
						</DialogTitle>
					</DialogHeader>
					<DialogDescription className="py-4">
						Are you sure you want to delete this category? Articles with
						this category may be affected.
					</DialogDescription>
					<DialogFooter>
						<button
							onClick={() => setShowDeleteDialog(false)}
							className="px-4 py-2 text-sm rounded-md border border-border bg-background hover:bg-muted focus:outline-none"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								if (categoryToDelete) {
									handleDelete(categoryToDelete);
								}
							}}
							disabled={processedItems[categoryToDelete || ""]}
							className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50"
						>
							{processedItems[categoryToDelete || ""] ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 inline animate-spin" />
									Deleting...
								</>
							) : (
								"Delete"
							)}
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
