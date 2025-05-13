"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { articleService, uploadService } from "@/service";
import { useToast } from "@/hooks";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { ArticleFormData } from "@/types";
import { articleCreateSchema } from "@/utils/validation/article";
import CreateCategory from "./CreateCategory";
import { useCategoryStore } from "@/store";

interface ArticleCreateDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

export default function ArticleCreateDialog({
	isOpen,
	onOpenChange,
	onSuccess,
}: ArticleCreateDialogProps) {
	const { toast } = useToast();
	const { isAuthenticated } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { categories, isLoading, fetchCategories } = useCategoryStore();
	const [formData, setFormData] = useState<ArticleFormData>({
		title: "",
		description: "",
		cover_image_url: "",
		category: 109,
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof ArticleFormData, string>>
	>({});
	const [uploadingImage, setUploadingImage] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Fetch categories when dialog opens
	useEffect(() => {
		if (isOpen) {
			fetchCategories();
		}
	}, [isOpen, fetchCategories]);

	// Update form when categories are loaded
	useEffect(() => {
		if (categories.length > 0) {
			setFormData((prevData) => ({
				...prevData,
				category: Number(categories[0].id),
			}));
		}	}, [categories]);

	const validateForm = async () => {
		try {
			await articleCreateSchema.validate(formData, { abortEarly: false });
			setErrors({});
			return true;
		} catch (err) {
			if (err instanceof Error && "inner" in err) {
				type ValidationError = Error & {
					inner: { path?: string; message: string }[];
				};
				const validationError = err as ValidationError;
				const newErrors: Partial<Record<keyof ArticleFormData, string>> = {};
				validationError.inner.forEach((e) => {
					if (e.path) {
						newErrors[e.path as keyof ArticleFormData] = e.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "category" ? parseInt(value) : value,
		});
	};

	const handleImageUpload = async (file: File) => {
		if (!file) return;

		setUploadingImage(true);

		try {
			// Use the upload service
			const imageUrl = await uploadService.uploadFile(file);

			// Update the form data with the returned URL
			setFormData((prev) => ({
				...prev,
				cover_image_url: imageUrl,
			}));

			toast({
				title: "Success",
				description: "Image uploaded successfully",
			});
		} catch (error) {
			console.error("Upload error:", error);
			toast({
				title: "Error",
				description: "Failed to upload image. Please try again.",
				variant: "destructive",
			});
		} finally {
			setUploadingImage(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleImageUpload(file);
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			cover_image_url: "",
			category: categories.length > 0 ? Number(categories[0].id) : 0,
		});
		setErrors({});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = await validateForm();
		if (!isValid) return;

		if (!isAuthenticated) {
			toast({
				title: "Authentication Required",
				description: "Please sign in to create articles",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			// Use article service with proper request structure
			await articleService.createArticle({
				data: {
					title: formData.title,
					description: formData.description,
					cover_image_url: formData.cover_image_url,
					category: formData.category,
				},
			});

			toast({
				title: "Success!",
				description: "Article created successfully",
			});

			// Reset form and close dialog
			resetForm();
			onOpenChange(false);

			if (onSuccess) onSuccess();
		} catch (error) {
			console.error("Failed to create article:", error);
			toast({
				title: "Error",
				description:
					typeof error === "string"
						? error
						: "Failed to create article. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold font-modern">
						Create New Article
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="mt-4">
					<div className="space-y-6">
						{/* Title field */}
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium mb-1"
							>
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className={`w-full rounded-md border ${
									errors.title
										? "border-destructive"
										: "border-border"
								} bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
								placeholder="Enter article title"
							/>
							{errors.title && (
								<p className="mt-1 text-sm text-destructive">
									{errors.title}
								</p>
							)}
						</div>
						{/* Description field */}
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium mb-1"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								rows={4}
								className={`w-full rounded-md border ${
									errors.description
										? "border-destructive"
										: "border-border"
								} bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
								placeholder="Enter article description"
							/>
							{errors.description && (
								<p className="mt-1 text-sm text-destructive">
									{errors.description}
								</p>
							)}
						</div>
						{/* Cover Image Upload field */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Cover Image
							</label>
							<div className="space-y-2">
								<input
									type="file"
									ref={fileInputRef}
									accept="image/*"
									className="hidden"
									onChange={handleFileChange}
								/>

								<div
									className={`border ${
										errors.cover_image_url
											? "border-destructive"
											: "border-border"
									} border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/30 transition-colors`}
									onClick={triggerFileInput}
								>
									{uploadingImage ? (
										<div className="flex flex-col items-center py-3">
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
											<p className="text-sm text-muted-foreground">
												Uploading image...
											</p>
										</div>
									) : formData.cover_image_url ? (
										<div className="relative">
											<Image
												src={formData.cover_image_url}
												alt="Cover preview"
												width={400}
												height={200}
												className="h-48 mx-auto object-contain"
											/>
											<button
												type="button"
												onClick={(e) => {
													e.stopPropagation();
													setFormData({
														...formData,
														cover_image_url: "",
													});
												}}
												className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
											>
												<X size={16} />
											</button>
										</div>
									) : (
										<div className="flex flex-col items-center py-3">
											<Upload className="h-6 w-6 text-muted-foreground mb-2" />
											<p className="text-sm text-muted-foreground">
												Click to upload cover image
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												PNG, JPG up to 10MB
											</p>
										</div>
									)}
								</div>

								{errors.cover_image_url && (
									<p className="mt-1 text-sm text-destructive">
										{errors.cover_image_url}
									</p>
								)}
							</div>
						</div>
						{/* Category field */}
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium mb-1"
							>
								Category
							</label>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
									<span className="text-sm text-muted-foreground">
										Loading categories...
									</span>
								</div>
							) : (
								<select
									id="category"
									name="category"
									value={formData.category}
									onChange={(e) => {
										// Ensure the category is converted to a number
										setFormData({
											...formData,
											category: Number(e.target.value),
										});
									}}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							)}

							{/* Add option to create a new category */}
							{!isLoading && (
								<div className="mt-2">
									<p className="text-xs text-muted-foreground mb-1">
										Can't find your category? Create a new one:
									</p>
									<CreateCategory										onCategoryCreated={(newCategory) => {
											// Select the new category
											setFormData((prev) => ({
												...prev,
												category: Number(newCategory.id),
											}));
										}}
									/>
								</div>
							)}
						</div>
						{/* Submit button */}
						<div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
							>
								{isSubmitting ? "Creating..." : "Create Article"}
							</button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
