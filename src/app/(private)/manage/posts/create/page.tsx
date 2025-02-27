'use client'

import { useState, useActionState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions/createPost";

export default function CreatePage() {

    const [content, setContent] = useState("");
    const [contentLength, setContentLength] = useState(0);
    const [preview, setPreview] = useState(false);

    const [state, formAction] = useActionState(createPost, {
        success: false,
        errors: {},
    });

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setContentLength(value.length);
    }

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
                    />
                    {state.errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.title.join(", ")}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="topImage">画像</Label>
                    <Input
                        id="topImage"
                        type="file"
                        accept="image/*"
                        name="topImage"
                    />
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
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    投稿する
                </Button>
            </form>
        </div>
    )
}