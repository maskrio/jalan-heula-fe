import { useState, useEffect } from "react";
import { Comment } from "@/repository/articleRepository";
import { useAuth } from "@/hooks";
import { useCommentStore } from "@/store";
import { CommentCard } from "./CommentCard";

interface CommentsSectionProps {
	articleId: number;
	initialComments?: Comment[];
}

export function CommentsSection({
	articleId,
	initialComments = [],
}: CommentsSectionProps) {
	const { getCurrentUser, isAuthenticated: _isAuthenticated } = useAuth();
	const currentUser = getCurrentUser();
	const {
		commentsByArticle,
		loading: isLoading,
		error,
		fetchComments,
		addComment,
		updateComment,
		deleteComment,
	} = useCommentStore();
	const comments = commentsByArticle[articleId] || initialComments;
	const [editingCommentId, setEditingCommentId] = useState<number | null>(null);	useEffect(() => {
		if (initialComments.length === 0) {
			// The article title should be stored in the store already
			fetchComments(articleId);
		}
	}, [articleId, initialComments.length, fetchComments]);

	const handleUpdateComment = async (commentId: number, documentId: string, content: string) => {
		const success = await updateComment(documentId, content);
		if (success) {
			setEditingCommentId(null);
		}
		return success;
	}

	const handleDeleteComment = async (documentId: string) => {
		await deleteComment(documentId, articleId);
	}
	return (
		<div className="mt-12 pt-8 border-t border-border">
			<h2 className="text-2xl font-semibold mb-6">Comments</h2>			{/* Add comment form */}
			<div className="mb-8">
				<CommentCard
					articleId={articleId}
					onCommentSubmit={(content) => addComment(content, articleId)}
					currentUser={currentUser}
				/>
			</div>

			{/* Comments list */}
			{isLoading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
				</div>
			) : error ? (
				<div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-center">
					<p className="text-destructive">{error}</p>					<button
						className="mt-2 text-sm text-primary hover:underline"
						onClick={() => {
							// The article title should be stored in the store already
							fetchComments(articleId);
						}}
					>
						Try again
					</button>
				</div>
			) : comments.length > 0 ? (
				<div className="space-y-4">
					{comments.map((comment) => (
						editingCommentId === comment.id ? (
							<CommentCard
								key={comment.id}
								articleId={articleId}
								initialContent={comment.content}
								isEdit={true}
								comment={comment}
								onCommentSubmit={(content) => handleUpdateComment(comment.id, comment.documentId || "", content)}
								onCancel={() => setEditingCommentId(null)}
								currentUser={currentUser}
							/>
						) : (
							<CommentCard
								key={comment.id}
								articleId={articleId}
								comment={comment}
								onCancel={() => setEditingCommentId(comment.id)}
								onDelete={comment.documentId ? () => handleDeleteComment(comment.documentId || "") : undefined}
								currentUser={currentUser}
								onCommentSubmit={() => Promise.resolve(false)}
							/>
						)
					))}
				</div>
			) : (
				<p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg border border-border">					No comments yet. Be the first to comment!
				</p>
			)}
		</div>
	);
}
