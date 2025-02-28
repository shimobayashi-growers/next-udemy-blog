'use server'

import { postSchema } from "@/validations/post";
import { saveImage } from "@/utils/image";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>;
}

export async function updatePost(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {

    // フォームからわたってきた情報を取得
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const topImageInput = formData.get("topImage");
    const topImage = topImageInput instanceof File ? topImageInput : null; // 画像が選択されていない場合はnull
    const postId = formData.get("postId") as string;
    const published = formData.get("published") === "true";
    const oldImageUrl = formData.get("oldImageUrl") as string;

    // バリデーション
    const validatedResult = postSchema.safeParse({
        title,
        content,
        topImage,
    });

    if(!validatedResult.success){
        return {
            success: false,
            errors: validatedResult.error.flatten().fieldErrors,
        };
    }

    // 画像保存
    // 古い画像も確認して作成
    let imageUrl = oldImageUrl;
    if(topImage instanceof File && topImage.size > 0 && topImage.name !== "undefined"){
        const newImageUrl = await saveImage(topImage);
        if(!newImageUrl){
            return {
                success: false,
                errors: {
                    image: ["画像を保存できませんでした"],
                }
            }
        }
        imageUrl = newImageUrl;
    }

    // データベースに保存

    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            title,
            content,
            topImage: imageUrl,
            published,
        }
    });

    redirect("/dashboard");
}