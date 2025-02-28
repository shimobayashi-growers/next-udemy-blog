'use client'

import { useState, useActionState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions/createPost";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


// 型の指定をする
type EditPostFormProps = {
    post: {
        id: string;
        title: string;
        content: string;
        topImage: string | null;
        published: boolean;
    }
}

export default function EditPostForm({ post }: EditPostFormProps) {

    const [content, setContent] = useState(post.content);
    const [contentLength, setContentLength] = useState(0);
    const [preview, setPreview] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [published, setPublished] = useState(post.published);
    const [imagePreview, setImagePreview] = useState(post.topImage);

    const [state, formAction] = useActionState(createPost, {
        success: false,
        errors: {},
    });

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setContentLength(value.length);
    }

    // 画像のプレビューを表示する
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }

    // 画像のプレビューを破棄する
    // ブラウザのメモリーを節約するため
    useEffect(() => {
        if (imagePreview && imagePreview !== post.topImage) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview, post.topImage]);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">新規投稿</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input 
                        id="title" 
                        name="title"
                        type="text" 
                        placeholder="タイトルを入力してください" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.title.join(", ")}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input
                        id="topImage"
                        type="file"
                        accept="image/*"
                        name="topImage"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <Image
                                 src={imagePreview}
                                 alt={post.title}
                                 width={0}
                                 height={0}
                                 sizes="200px"
                                 className="w-[200px]"
                                 priority
                            />
                        </div>
                    )}
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.topImage.join(", ")}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="content">内容</Label>
                    <TextareaAutosize
                        id="content"
                        name="content"
                        className="w-full border p-2"
                        placeholder="Markdownで内容を入力してください" 
                        minRows={8}
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                {state.errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                        {state.errors.content.join(", ")}
                    </p>
                )}
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数： {contentLength}
                </div>
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPreview(!preview)}
                    >
                        {preview ? "プレビューを閉じる" : "プレビューを表示"}
                    </Button>
                </div>
                {preview && (
                    <div className="p-4 border bg-gray-50 prose max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]} // マークダウンのプラグイン
                            rehypePlugins={[rehypeHighlight]} // シンタックスハイライトのプラグイン
                            skipHtml={false} // HTMLを許可
                            unwrapDisallowed={true} // Markdownの改行を許可
                        >{content}
                        </ReactMarkdown>
                    </div>
                )}

                <RadioGroup value={published.toString()} name="published" onValueChange={(value) => setPublished(value === "true")}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="published-one" />
                        <Label htmlFor="published-one">公開</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="published-two" />
                        <Label htmlFor="published-two">非表示</Label>
                    </div>
                </RadioGroup>

                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    投稿する
                </Button>
                <input type="hidden" name="Postid" value={post.id} />
                <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
            </form>
        </div>
    )
}