"use strict";
import { apiClient } from "@/utils";
import { categorizeError } from "@/utils/errorUtils";
import { Comment } from "@/repository/articleRepository";

export interface CommentResponse {
  data: Comment;
  meta: Record<string, unknown>;
}

export interface CommentsResponse {
  data: Comment[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CreateCommentData {
  data: {
    content: string;
    article: number;
  };
}

export interface UpdateCommentData {
  data: {
    content: string;
  };
}

/**
 * Repository for handling comment-related API calls
 */
export const commentRepository = {
  /**
   * Fetch all comments for an article
   * @param articleId Article ID to fetch comments for
   * @param token Auth token
   * @returns Comments data
   */
  async getCommentsByArticle(articleId: number, token: string): Promise<CommentsResponse> {
    try {
      return await apiClient.get<CommentsResponse>("/comments", {
        token,
        params: {
          "filters[article][id][$eq]": articleId.toString(),
          "sort": "createdAt:desc",
          "pagination[pageSize]": "100"
        },
      });
    } catch (error) {
      console.error("Fetch comments request failed:", error);
      throw categorizeError(error);
    }
  },

  /**
   * Create a new comment
   * @param data Comment data to create
   * @param token Auth token
   * @returns Created comment
   */
  async createComment(data: CreateCommentData, token: string): Promise<Comment> {
    try {
      const response = await apiClient.post<CommentResponse>(
        "/comments",
        data,
        { token }
      );
      return response.data;
    } catch (error) {
      console.error("Create comment request failed:", error);
      throw categorizeError(error);
    }
  },

  /**
   * Update a comment
   * @param documentId Comment document ID to update
   * @param data Comment data to update
   * @param token Auth token
   * @returns Updated comment
   */
  async updateComment(documentId: string, data: UpdateCommentData, token: string): Promise<Comment> {
    try {
      const response = await apiClient.put<CommentResponse>(
        `/comments/${documentId}`,
        data,
        { token }
      );
      return response.data;
    } catch (error) {
      console.error("Update comment request failed:", error);
      throw categorizeError(error);
    }
  },

  /**
   * Delete a comment
   * @param documentId Comment document ID to delete
   * @param token Auth token
   * @returns Success status
   */
  async deleteComment(documentId: string, token: string): Promise<boolean> {
    try {
      await apiClient.delete(`/comments/${documentId}`, { token });
      return true;
    } catch (error) {
      console.error("Delete comment request failed:", error);
      throw categorizeError(error);
    }
  },
};
