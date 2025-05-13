"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useArticleStore } from "@/store";
import { useToast } from "@/hooks";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Article } from "@/repository/articleRepository";

interface ArticleActionsProps {
    article: Article;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function ArticleActions({ article, onEdit, onDelete }: ArticleActionsProps) {
    const { toast } = useToast();
    const { deleteArticle } = useArticleStore();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);    const handleDelete = async () => {
        if (!article.documentId) {
            toast({
                title: "Error",
                description: "Article Document ID is missing",
                variant: "destructive",
            });
            return;
        }

        setIsDeleting(true);
        
        try {
            // Call the store's deleteArticle action
            const success = await deleteArticle(article.documentId);
            
            if (success) {
                setIsDeleteDialogOpen(false);
                if (onDelete) onDelete();
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete the article. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Failed to delete article:", error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "An unexpected error occurred",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditClick = () => {
        if (onEdit) onEdit();
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEditClick} className="flex items-center gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        <span>Edit Article</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        onClick={() => setIsDeleteDialogOpen(true)} 
                        className="flex items-center gap-2 text-destructive cursor-pointer focus:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Article</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Confirm Delete
                        </DialogTitle>                        <DialogDescription>
                            Are you sure you want to delete the article &quot;{article.title}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsDeleteDialogOpen(false)}
                                className="px-4 py-2 rounded-md text-sm border border-border hover:bg-muted transition-colors"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-md text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-70"
                            >
                                {isDeleting ? "Deleting..." : "Delete Article"}
                            </button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
