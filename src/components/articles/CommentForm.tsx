import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { useToast } from "@/hooks";

interface CommentFormProps {
	articleId: number;
	onCommentSubmit: (content: string) => Promise<boolean>;
	initialContent?: string;
	isEdit?: boolean;
	onCancel?: () => void;
}

export function CommentForm({
	articleId: _articleId, // Prefixed with underscore to indicate it's intentionally unused
	onCommentSubmit,
	initialContent = "",
	isEdit = false,
	onCancel,
}: CommentFormProps) {
	const [content, setContent] = useState(initialContent);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const { isAuthenticated } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!content.trim()) {
			toast({
				title: "Error",
				description: "Comment cannot be empty",
				variant: "destructive",
			});
			return;
		}

		if (!isAuthenticated) {
			toast({
				title: "Authentication Required",
				description: "You need to be logged in to comment",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const success = await onCommentSubmit(content);

			if (success) {
				if (!isEdit) {
					setContent(""); // Clear the form only for new comments
				}
				toast({
					title: isEdit ? "Comment Updated" : "Comment Added",
					description: isEdit
						? "Your comment has been updated successfully"
						: "Your comment has been added successfully",
				});
			} else {
				toast({
					title: "Error",
					description: isEdit
						? "Failed to update comment. Please try again."
						: "Failed to add comment. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Comment submission error:", error);
			toast({
				title: "Error",
				description: "An unexpected error occurred",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 bg-white">
			<div className="space-y-2">
				<label htmlFor="comment" className="text-sm font-medium">
					{isEdit ? "Edit your comment" : "Leave a comment"}
				</label>
				<textarea
					id="comment"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full min-h-[100px] p-3 border border-input rounded-md  text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Write your comment here..."
					disabled={isSubmitting || !isAuthenticated}
				/>
				{!isAuthenticated && (
					<p className="text-xs text-muted-foreground">
						You need to be logged in to comment
					</p>
				)}
			</div>
			<div className="flex gap-2 justify-end">
				{isEdit && onCancel && (
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					disabled={isSubmitting || !isAuthenticated}
				>
					{isSubmitting ? (
						<>
							<span className="animate-spin mr-2">⟳</span>
							{isEdit ? "Updating..." : "Posting..."}
						</>
					) : isEdit ? (
						"Update Comment"
					) : (
						"Post Comment"
					)}
				</Button>
			</div>
		</form>
	);
}
