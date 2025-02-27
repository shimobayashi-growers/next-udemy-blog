import { z } from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .min(3, { message: "タイトルは3文字以上で入力してください" })
        .max(100, { message: "タイトルは100文字以内で入力してください" }),
    content: z
        .string()
        .min(10, { message: "内容を10文字以上入力してください" })
        .max(10000, { message: "内容は10000文字以内で入力してください" }),
    topImage: z.instanceof(File).nullable().optional(),
});