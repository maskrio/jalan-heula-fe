import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { commentService } from "@/service";
import { articleService } from "@/service";
import { Comment } from "@/repository/articleRepository";
import { toast } from "@/hooks";

interface CommentState {
	commentsByArticle: Record<number, Comment[]>;
	articleTitles: Record<number, string>; // Map of article IDs to titles
	loading: boolean;
	error: string | null;

	// Actions
	fetchComments: (articleId: number, articleTitle?: string) => Promise<void>;
	addComment: (content: string, articleId: number) => Promise<boolean>;
	updateComment: (documentId: string, content: string) => Promise<boolean>;
	deleteComment: (documentId: string, articleId: number) => Promise<boolean>;
	clearComments: () => void;
	setArticleTitle: (articleId: number, title: string) => void;
}

export const useCommentStore = create<CommentState>()(
	devtools((set, get) => ({
		// Initial state
		commentsByArticle: {},
		articleTitles: {},
		loading: false,
		error: null,

		// Set article title
		setArticleTitle: (articleId: number, title: string) => {
			set((state) => ({
				articleTitles: {
					...state.articleTitles,
					[articleId]: title,
				},
			}));
		},
		// Fetch comments action
		fetchComments: async (articleId: number, articleTitle?: string) => {
			set({ loading: true, error: null });
			try {
				// Get the article title from store or use provided title
				const title = articleTitle || get().articleTitles[articleId];

				if (!title) {
					set({
						error: "No article title available to fetch comments",
					});
					return;
				}

				// Use article service to get article with comments
				const response = await articleService.getArticleByTitle(title);

				if (response && response.data && response.data.length > 0) {
					const article = response.data[0];
					const comments = article.comments || [];

					set((state) => ({
						commentsByArticle: {
							...state.commentsByArticle,
							[articleId]: comments,
						},
					}));
				}				return;
			} catch {
				set({ error: "Failed to load comments" });
				toast({
					title: "Error",
					description: "Failed to load comments",
					variant: "destructive",
				});
			} finally {
				set({ loading: false });
			}
		},

		// Add comment action
		addComment: async (content: string, articleId: number) => {
			set({ loading: true, error: null });
			try {
				const newComment = await commentService.createComment(
					content,
					articleId
				);
				if (newComment) {
					// Fetch updated comments from article service
					const title = get().articleTitles[articleId];
					if (title) {
						await get().fetchComments(articleId, title);
					}

					toast({
						title: "Comment Added",
						description: "Your comment has been added successfully",
					});
					return true;
				} else {
					set({ error: "Failed to add comment" });
					toast({
						title: "Error",
						description: "Failed to add comment. Please try again.",
						variant: "destructive",
					});					return false;
				}
			} catch (err) {
				console.error("Error adding comment:", err);
				set({ error: "Failed to add comment" });
				toast({
					title: "Error",
					description: "An unexpected error occurred",
					variant: "destructive",
				});
				return false;
			} finally {
				set({ loading: false });
			}
		},

		// Update comment action
		updateComment: async (documentId: string, content: string) => {
			set({ loading: true, error: null });
			try {
				const updatedComment = await commentService.updateComment(
					documentId,
					content
				);

				if (updatedComment) {
					// Find which article this comment belongs to
					const articleEntries = Object.entries(
						get().commentsByArticle
					);
					const articleEntry = articleEntries.find(([_, comments]) =>
						comments.some(
							(comment) => comment.documentId === documentId
						)
					);

					if (articleEntry) {
						const articleId = Number(articleEntry[0]);
						// Get article title and refresh comments
						const title = get().articleTitles[articleId];
						if (title) {
							await get().fetchComments(articleId, title);
						}
					}

					toast({
						title: "Comment Updated",
						description:
							"Your comment has been updated successfully",
					});
					return true;
				} else {
					set({ error: "Failed to update comment" });
					toast({
						title: "Error",
						description: "You are not the owner of this comment",
						variant: "destructive",
					});					return false;
				}
			} catch (err) {
				console.error("Error updating comment:", err);
				set({ error: "Failed to update comment" });
				toast({
					title: "Error",
					description: "An unexpected error occurred",
					variant: "destructive",
				});
				return false;
			} finally {
				set({ loading: false });
			}
		},

		// Delete comment action
		deleteComment: async (documentId: string, articleId: number) => {
			set({ loading: true, error: null });
			try {
				const success = await commentService.deleteComment(documentId);
				if (success) {
					// Get article title and refresh comments
					const title = get().articleTitles[articleId];
					if (title) {
						await get().fetchComments(articleId, title);
					}

					toast({
						title: "Comment Deleted",
						description:
							"Your comment has been deleted successfully",
					});
					return true;
				} else {
					set({ error: "Failed to delete comment" });
					toast({
						title: "Error",
						description: "You are not the owner of this comment",
						variant: "destructive",
					});					return false;
				}
			} catch (err) {
				console.error("Error deleting comment:", err);
				set({ error: "Failed to delete comment" });
				toast({
					title: "Error",
					description: "An unexpected error occurred",
					variant: "destructive",
				});
				return false;
			} finally {
				set({ loading: false });
			}
		},
		// Clear comments action
		clearComments: () => {
			set({ commentsByArticle: {}, articleTitles: {}, error: null });
		},
	}))
);
