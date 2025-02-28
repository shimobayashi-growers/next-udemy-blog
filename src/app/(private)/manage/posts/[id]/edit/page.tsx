import { auth } from "@/auth";
import { getOwnPost } from "@/lib/ownPost";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
type Params = {
    params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Params){
    const session = await auth();
    const userId = session?.user?.id;

    if(!session?.user?.email || !userId){
        throw new Error("ユーザー情報がありません");
    }

    const { id } = await params;
    const post = await getOwnPost(userId, id);

    // 記事が存在しない場合は404を返す
    if (!post) {
        notFound();
    }

    return (
        <EditPostForm post={post} />
    )
}