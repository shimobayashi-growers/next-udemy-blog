import { prisma } from "@/lib/prisma";

export async function getPosts() {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return posts;
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
}