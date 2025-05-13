import { useState } from "react";
import { Comment } from "@/repository/articleRepository";
import { CommentForm } from "./CommentForm";
import { Button } from "@/components/ui/button";
import { useAuth, useComments } from "@/hooks";

interface CommentItemProps {
	comment: Comment;
	articleId: number;
	onCommentUpdated: () => void;
	currentUserId?: number;
}

export function CommentItem({
	comment,
	articleId,
	onCommentUpdated,
	currentUserId,
}: CommentItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { isAuthenticated } = useAuth();
	const { updateComment, deleteComment } = useComments(articleId);

	// Check if the current user is the author of the comment
	// In a real app, each comment would have a user field to check against
	const isAuthor = isAuthenticated && currentUserId !== undefined;

	const handleUpdateComment = async (content: string) => {
		if (!comment.documentId) return false;

		const success = await updateComment(comment.documentId, content);

		if (success) {
			setIsEditing(false);
			onCommentUpdated();
		}

		return success;
	};

	const handleDeleteComment = async () => {
		if (!comment.documentId) return;

		setIsDeleting(true);

		const success = await deleteComment(comment.documentId);

		if (success) {
			onCommentUpdated();
		}

		setIsDeleting(false);
	};

	if (isEditing) {
		return (
			<div className="bg-muted/40 p-4 rounded-lg">
				<CommentForm
					articleId={articleId}
					onCommentSubmit={handleUpdateComment}
					initialContent={comment.content}
					isEdit={true}
					onCancel={() => setIsEditing(false)}
				/>
			</div>
		);
	}

	return (
		<div className="bg-muted/40 p-4 rounded-lg">
			<p className="mb-2">{comment.content}</p>
			<div className="flex justify-between items-center">
				<div className="text-xs text-muted-foreground">
					{new Date(comment.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</div>

				{isAuthor && (
					<div className="flex gap-2">
						<Button
							variant="ghost"
							size="sm"
							className="text-xs h-7 px-2"
							onClick={() => setIsEditing(true)}
						>
							Edit
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="text-xs h-7 px-2 text-destructive hover:text-destructive"
							onClick={handleDeleteComment}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
