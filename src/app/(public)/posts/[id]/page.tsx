import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";

type Params = {
    params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
    const { id } = await params;
    const post = await getPost(id);

    // 記事が存在しない場合は404を返す
    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
            {post.topImage && (
                    <div className="relative w-full h-64 lg:h-96">
                        <Image
                            src={post.topImage}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="rounded-t-md object-cover"
                            priority
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                            {post.author.name}
                        </p>
                        <time className="text-sm text-gray-500">
                            {
                                format(new Date(post.createdAt), 
                                'yyyy年MM月dd日',
                                {locale: ja,}
                                )
                            }
                        </time>
                    </div>
                    <CardTitle className="text-3xl font-bold">
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]} // マークダウンのプラグイン
                            rehypePlugins={[rehypeHighlight]} // シンタックスハイライトのプラグイン
                            skipHtml={false} // HTMLを許可
                            unwrapDisallowed={true} // Markdownの改行を許可
                        >{post.content}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}