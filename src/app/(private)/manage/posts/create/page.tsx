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

export default function CreatePage() {

    const [content, setContent] = useState("");
    const [contentLength, setContentLength] = useState(0);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setContentLength(value.length);
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">新規投稿</h1>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" type="text" placeholder="タイトルを入力してください" />
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
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数： {contentLength}
                </div>
                <Button type="submit">投稿</Button>
            </form>
        </div>
    )
}