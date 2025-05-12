"use strict";
import { useEffect, useRef, useCallback } from "react";
import { useArticleStore } from "@/store";
import { useAuth } from "./useAuth";

export function useArticles(pageSize: number = 10) {
	const {
		articles,
		loading,
		error,
		hasMore,
		fetchArticles,
		loadMoreArticles,
		resetArticles,
	} = useArticleStore();

	const { isAuthenticated } = useAuth();

	// Initial fetch when authenticated
	useEffect(() => {
		if (isAuthenticated) {
			fetchArticles(pageSize);
		} else {
			resetArticles();
		}
	}, [isAuthenticated, pageSize, fetchArticles, resetArticles]);

	// Create an intersection observer for infinite scrolling
	const observer = useRef<IntersectionObserver | null>(null);
	const lastArticleElementRef = useCallback(
		(node: HTMLElement | null) => {
			if (loading) return;

			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						loadMoreArticles();
					}
				},
				{ threshold: 0.5 }
			);

			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore, loadMoreArticles]
	);

	return {
		articles,
		loading,
		error,
		hasMore,
		loadMore: loadMoreArticles,
		lastArticleElementRef,
	};
}
