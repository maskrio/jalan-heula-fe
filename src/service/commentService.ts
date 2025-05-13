"use strict";
import { Comment } from "@/repository/articleRepository";
import {
	commentRepository,
	CreateCommentData,
	UpdateCommentData,
} from "@/repository/commentRepository";
import { authService } from "./authService";

/**
 * Service for handling comment-related operations
 */
export const commentService = {
	/**
	 * Fetch all comments for an article
	 * @param articleId Article ID to fetch comments for
	 * @returns Comments for the article or null if error
	 */
	async getCommentsByArticle(articleId: number) {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}

			const response = await commentRepository.getCommentsByArticle(
				articleId,
				token
			);
			return response;
		} catch (error) {
			console.error("Failed to get comments:", error);
			return {
				data: [],
				meta: {
					pagination: {
						page: 1,
						pageSize: 10,
						pageCount: 0,
						total: 0,
					},
				},
			};
		}
	},

	/**
	 * Create a new comment
	 * @param content Comment content
	 * @param articleId Article ID to comment on
	 * @returns Created comment data or null if error
	 */
	async createComment(
		content: string,
		articleId: number
	): Promise<Comment | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}

			const data: CreateCommentData = {
				data: {
					content,
					article: articleId,
				},
			};

			return await commentRepository.createComment(data, token);
		} catch (error) {
			console.error("Failed to create comment:", error);
			return null;
		}
	},

	/**
	 * Update a comment
	 * @param documentId Comment document ID
	 * @param content New comment content
	 * @returns Updated comment data or null if error
	 */
	async updateComment(
		documentId: string,
		content: string
	): Promise<Comment | null> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return null;
			}

			const data: UpdateCommentData = {
				data: {
					content,
				},
			};

			return await commentRepository.updateComment(
				documentId,
				data,
				token
			);
		} catch (error) {
			console.error("Failed to update comment:", error);
			return null;
		}
	},

	/**
	 * Delete a comment
	 * @param documentId Comment document ID to delete
	 * @returns Success status
	 */
	async deleteComment(documentId: string): Promise<boolean> {
		try {
			const token = authService.getToken();
			if (!token) {
				console.error("No auth token available");
				return false;
			}

			return await commentRepository.deleteComment(documentId, token);
		} catch (error) {
			console.error("Failed to delete comment:", error);
			return false;
		}
	},
};
