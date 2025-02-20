import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
    // クリーンアップ
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()

    // 暗号化
    const hashedPassword = await bcrypt.hash("password123", 12)

    // ダミー画像URL
    const dummyImages = [
        "https://picsum.photos/seed/post1/600/400",
        "https://picsum.photos/seed/post2/600/400",
    ]

    // ユーザ作成
    const user = await prisma.user.create({
        data: {
            email: "test@example.com",
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: "テスト投稿1",
                        content: "テスト投稿1です",
                        topImage: dummyImages[0],
                        published: true,
                    },
                    {
                        title: "テスト投稿2",
                        content: "テスト投稿2です",
                        topImage: dummyImages[1],
                        published: true,
                    }
                ]
            },
        },
    })
    console.log({user})
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })