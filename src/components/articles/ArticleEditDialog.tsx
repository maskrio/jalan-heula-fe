"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { uploadService } from "@/service";
import { useToast } from "@/hooks";
import { useArticleStore } from "@/store";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { articleCreateSchema } from "@/utils/validation/article";
import { ArticleFormData } from "@/types";
import { Article } from "@/repository/articleRepository";

interface ArticleEditDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	article: Article;
	onSuccess?: () => void;
}

const categories = [
	{ id: 109, name: "Beach" },
	{ id: 110, name: "Mountain" },
	{ id: 111, name: "City" },
	{ id: 112, name: "Village" },
	{ id: 113, name: "Forest" },
];

export default function ArticleEditDialog({
	isOpen,
	onOpenChange,
	article,
	onSuccess,
}: ArticleEditDialogProps) {
	const { toast } = useToast();
	const { isAuthenticated } = useAuth();
	const { updateArticle } = useArticleStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<ArticleFormData>({
		title: article.title || "",
		description: article.description || "",
		cover_image_url: article.cover_image_url || "",
		category: article.category?.id || Number(categories[0].id),
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof ArticleFormData, string>>
	>({});
	const [uploadingImage, setUploadingImage] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Update form data when article changes
	useEffect(() => {
		if (article) {
			setFormData({
				title: article.title || "",
				description: article.description || "",
				cover_image_url: article.cover_image_url || "",
				category: article.category?.id || Number(categories[0].id),
			});
		}
	}, [article]);
	const validateForm = async () => {
		try {
			await articleCreateSchema.validate(formData, { abortEarly: false });
			setErrors({});
			return true;
		} catch (err) {
			if (err instanceof Error && "inner" in err) {
				type ValidationError = Error & { inner: { path?: string; message: string }[] };
				const validationError = err as ValidationError;
				const newErrors: Partial<
					Record<keyof ArticleFormData, string>
				> = {};
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
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = await validateForm();
		if (!isValid) return;

		if (!isAuthenticated) {
			toast({
				title: "Authentication Required",
				description: "Please sign in to update articles",
				variant: "destructive",
			});
			return;
		}
		if (!article.documentId) {
			toast({
				title: "Error",
				description: "Article Document ID is missing",
				variant: "destructive",
			});
			return;
		}
		setIsSubmitting(true);
		try {
			// Use article store with proper request structure
			const result = await updateArticle(article.documentId, {
				title: formData.title,
				description: formData.description,
				cover_image_url: formData.cover_image_url,
				category: formData.category,
			});
			
			if (result) {
				toast({
					title: "Success!",
					description: "Article updated successfully",
				});

				// Close dialog
				onOpenChange(false);

				if (onSuccess) onSuccess();
			} else {
				throw new Error("Failed to update article: No response from server");
			}
		} catch (error) {
			console.error("Failed to update article:", error);
			toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Failed to update article. Please try again.",
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
						Edit Article
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
										</div>									) : formData.cover_image_url ? (
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
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>
						{/* Submit button */}
						<div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
							>
								{isSubmitting
									? "Updating..."
									: "Update Article"}
							</button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
