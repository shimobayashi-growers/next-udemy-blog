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

# カード型の日付フォーマット

```
npm install date-fns@^4
npx shadcn@^2 add card
```

# Auth.js のインストール

https://authjs.dev/

学ぶのはこちらから

https://nextjs.org/learn/dashboard-app/adding-authentication

```
npm install next-auth@beta
// シークレットキー生成
npx auth secret
```

.env.local に AUTH_SECRET が発行されるが.env に統合

## zod インストール

```
npm install zod@^3
```

# CRUD

データ操作の一連の方法（Create,Read,Update,Delete）

| HTTP メソッド | URI               | 画面・機能 | CRUD   |
| ------------- | ----------------- | ---------- | ------ |
| GET           | /dashboard /posts | 一覧画面   | Read   |
| GET           | /posts/create     | 作成画面   |        |
| POST          | /posts            | 保存       | Create |
| GET           | /posts/[id]       | 詳細画面   | Read   |
| GET           | /posts/[id]/edit  | 編集画面   | Read   |
| PUT/PATCH     | /posts/[id]       | 更新       | Update |
| DELETE        | /posts/[id]       | 削除       | Delete |

# Markdown 関連ライブラリインストール

```
npm install react-markdown@^9
npm install remark-gfm@^4
npm install rehype-highlight@^7
npm install react-textarea-autosize@^8
npm install @tailwindcss/typography@^0
```

### react-markdown

Markdown を React コンポーネントとして表示

### remark-gfm

GithubFlavoredMarkdown 対応
（Markdown の拡張機能）

### rehype-highlight

コードハイライト表示

### react-textarea-autosize

textarea 自動調整

### tailwindcss/typography

tailwindCSS 公式プラグイン
Markdown をきれいにスタイリングするクラスを提供

# 画像保存処理

1. ブラウザの File オブジェクト（arrayBuffer 形式）
2. ファイルのデータ変換（保存するため）
   File.arrayBuffer() で arrayBuffer を取得
   Buffer.from(arrayBuffer) で Node.js の Buffer に変換
3. Node.js 側で保存
   writeFile でバイナリデータ（Buffer）をファイルに書き込む

（解説）

- arrayBuffer
  - ブラウザや Node.js でも使えるデータ構造
- Buffer
  - Node.js 独自クラス
  - fs などからデータを読み込むときに使う
- writeFile
  - fs の関数、ファイル保存

# 表示非表示

```
npx shadcn@^2 add radio-group
```

# デプロイ先

## Supabase（BaaS)

postgreSQL(DB)
Storage の設定

API は「Session pooler」を選択
.env のファイルデータを更新

### マイグレーション

prisma/migrations フォルダに sqlite の記載が残っている場合は削除
/next-udemy-blog/prisma/migrations

```
// マイグレーション（テーブル作成）
npx prisma migrate dev --name init
// シード実行（ダミーデータ）
npx prisma db seed
// prisma クライアント再作成
npx prisma generate
```

### ストレージの設定

接続設定

```
npm install @supabase/supabase-js
```

Storage->CONIGURATION->Policies
３つすべて設定

- udemy_next_blog_bucket

Allow access to JPG images in a public folder to anonymous users
Allowed operation: SELECT / INSERT / UPDATE / DELETE

- Other policies under storage.objects

Enable read access to everyone
Allowed operation: ALL

※supabase の認証機能を使うなら他になる

- Policies under storage.buckets

Enable read access to everyone
Allowed operation: ALL

## Vercel（PaaS）

Next.js プロジェクトのアップロード先
import git repository

Build Command を変更

```
npx prisma generate && npm run build
```

Environment Variables も.env から転記する

Deploy して完了
