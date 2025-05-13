import { useState } from "react";
import { Comment } from "@/repository/articleRepository";
import { Button } from "@/components/ui/button";
import { useAuth, useToast } from "@/hooks";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UserDetails } from "@/types/auth";

interface CommentCardProps {
	articleId: number;
	onCommentSubmit: (content: string) => Promise<boolean>;
	initialContent?: string;
	isEdit?: boolean;
	onCancel?: () => void;
	comment?: Comment;
	onDelete?: () => Promise<void>;
	currentUser?: UserDetails | null;
}

export function CommentCard({
	articleId: _articleId, // Prefixed with underscore to indicate it's intentionally unused
	onCommentSubmit,
	initialContent = "",
	isEdit = false,
	onCancel,
	comment,
	onDelete,
	currentUser,
}: CommentCardProps) {
	const [content, setContent] = useState(initialContent);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { toast } = useToast();
	const { isAuthenticated } = useAuth();

	// Calculate if this is an existing comment or new comment form
	const isExistingComment = Boolean(comment);

	// Format date for display
	const formattedDate = comment?.createdAt
		? new Date(comment.createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "";
	// Check if current user is author (in a real app would check user ID)
	const isAuthor = isAuthenticated && currentUser?.id !== undefined;

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

		try {			const success = await onCommentSubmit(content);

			if (success) {
				if (!isEdit) {
					setContent(""); // Clear the form only for new comments
				}
				// Toast is now handled in the store
			} else {
				// Error toast is handled in the store
			}		} catch (error) {
			console.error("Comment submission error:", error);
			// Error toast is handled in the store
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!onDelete) return;

		setIsDeleting(true);
		try {
			await onDelete();
		} finally {
			setIsDeleting(false);
		}
	};

	// For an existing comment that's not being edited
	if (isExistingComment && !isEdit) {
		return (
			<Card className="mb-4 bg-card border border-border">				<CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-center">
					<div className="flex items-center">
						<div>
							<p className="text-sm font-medium">User</p>
							<p className="text-xs text-muted-foreground">
								{formattedDate}
							</p>
						</div>
					</div>

					{isAuthor && (
						<div className="flex gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 px-2 text-xs"
								onClick={() => onCancel && onCancel()}
							>
								Edit
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 px-2 text-xs text-destructive hover:text-destructive"
								onClick={handleDelete}
								disabled={isDeleting}
							>
								{isDeleting ? "Deleting..." : "Delete"}
							</Button>
						</div>
					)}
				</CardHeader>

				<CardContent className="pb-3 px-4">
					<p className="text-sm">{comment?.content}</p>
				</CardContent>
			</Card>
		);
	}

	// For comment form (new or edit)
	return (
		<Card
			className={`mb-4 ${
				isExistingComment
					? "bg-blue-50/30 dark:bg-blue-950/10"
					: "bg-card"
			} border border-border`}
		>
			<form onSubmit={handleSubmit}>				<CardHeader className="pb-2 pt-4 px-4">
					<div className="flex items-center">
						<p className="text-sm font-medium">
							{isEdit ? "Edit Comment" : "Add a Comment"}
						</p>
					</div>
				</CardHeader>

				<CardContent className="pb-3 px-4">
					<Textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="min-h-[100px] resize-none focus-visible:ring-1 focus-visible:ring-primary"
						placeholder="Write your comment here..."
						disabled={isSubmitting || !isAuthenticated}
					/>
					{!isAuthenticated && (
						<p className="text-xs text-muted-foreground mt-2">
							You need to be logged in to comment
						</p>
					)}
				</CardContent>

				<CardFooter className="px-4 pb-4 flex justify-end gap-2">
					{isEdit && onCancel && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={onCancel}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
					)}
					<Button
						type="submit"
						size="sm"
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
				</CardFooter>
			</form>
		</Card>
	);
}
