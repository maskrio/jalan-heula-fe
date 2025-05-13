"use client";

import { useState } from "react";
import { useAuth } from "@/hooks";
import { Plus } from "lucide-react";
import ArticleCreateDialog from "./ArticleCreateDialog";

export default function ArticleCreateButton({
	onSuccess,
}: {
	onSuccess?: () => void;
}) {
	const { isAuthenticated } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	if (!isAuthenticated) {
		return null; // Don't render the button if user is not authenticated
	}

	return (
		<div>
			<button 
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
			>
				<Plus size={18} />
				Create New Article
			</button>

			<ArticleCreateDialog 
				isOpen={isOpen} 
				onOpenChange={setIsOpen}
				onSuccess={onSuccess}
			/>
		</div>
	);
}
