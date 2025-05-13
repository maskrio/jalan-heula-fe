"use client";

import { useCallback } from "react";
import { Comment } from "@/repository/articleRepository";
import { useCommentStore } from "@/store";

/**
 * @deprecated Use useCommentStore from '@/store' instead
 */
export function useComments(
	articleId: number,
	initialComments: Comment[] = []
) {
	const {
		commentsByArticle,
		loading: isLoading,
		error,
		fetchComments,
		addComment,
		updateComment,
		deleteComment,
		articleTitles
	} = useCommentStore();

	// Get comments for this article
	const comments = commentsByArticle[articleId] || initialComments;

	// Wrapper functions to maintain the same API as before
	const fetchCommentsWrapper = useCallback(() => {
		// Use existing title if available
		const title = articleTitles[articleId];
		if (title) {
			fetchComments(articleId, title);
		} else {
			fetchComments(articleId);
		}
	}, [fetchComments, articleId, articleTitles]);

	const addCommentWrapper = useCallback(
		(content: string) => {
			return addComment(content, articleId);
		},
		[addComment, articleId]
	);

	const deleteCommentWrapper = useCallback(
		(documentId: string) => {
			return deleteComment(documentId, articleId);
		},
		[deleteComment, articleId]
	);

	return {
		comments,
		isLoading,
		error,
		fetchComments: fetchCommentsWrapper,
		addComment: addCommentWrapper,
		updateComment,
		deleteComment: deleteCommentWrapper
	};
}
