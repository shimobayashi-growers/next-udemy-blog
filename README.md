# Next.js のインストール

```
npx create-next-app@^15
```

# Prisma インストール

パスワードも扱うため暗号化の bcryptjs もインストール

```
npm install prisma@^6 @prisma/client@^6
npm install -D ts-node@^10
npm install bcryptjs@^2
npm install @types/bcryptjs@^2
```

## Prisma の設定

Prisma の初期化

```
npx prisma init
```

prisma/schema.prisma の設定
provider="sqlite"に変更

.env ファイル
postgresql はコメントアウト
DATABASE_URL="file:./dev.db"を追記

/lib/prisma.ts の初期設定
