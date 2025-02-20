import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// PrismaClientのインスタンスを作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 開発環境でのみ仕様
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma