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

## prisma/schema.prisma

データベース内のテーブルの列や属性を定義

@id PK
@default デフォルト値
@unique 重複不可
? 必須ではない
[] 1 対 n を表す
@upudatedAt 更新日時
@relation リレーション
fields:[id] どのモデルのどの列を使うか
references:[id] 参照先のどの列と紐づけるか
onDelete: Cascade リレーション先が削除された場合一緒に削除される

## マイグレーションとシード実行

マイグレーションからシード実行と DB リセットまで

```
npx prisma migrate dev --name init
npx prisma db seed
npx prisma studio
npx prisma migrate reset
```

エラーがでたとき ↓

すべてのマイグレーションファイルを削除

```
rm -rf prisma/migrations
```

dev.db ファイルも削除

```
rm prisma/dev.db
```

新しいマイグレーションファイルを作成

```
npx prisma migrate dev --name init
```

# shadcn/ui のインストール

```
npx shadcn@^2 init

default
Neutral
Yes
--force
```

パーツをまとめてインストール

```
npx shadcn@^2 add navigation-menu button input label alert dropdown-menu alert-dialog
```
