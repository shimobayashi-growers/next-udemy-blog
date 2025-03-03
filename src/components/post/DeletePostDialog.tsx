import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { deletePost } from "@/lib/actions/deletePost";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type DeletePostProps = {
    postId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeletePostDialog({ postId, isOpen, onOpenChange }: DeletePostProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const handleDelete = () => {
        startTransition(async () => {
            await deletePost(postId);
            router.refresh();
            onOpenChange(false);
        });
    };
    
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>記事の削除</AlertDialogTitle>
                    <AlertDialogDescription>
                        この記事を削除してよろしいですか？
                        <br />
                        この操作は元に戻すことはできません。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete} 
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isPending}
                    >
                        {isPending ? "削除中..." : "削除する"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
