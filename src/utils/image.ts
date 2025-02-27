import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null>{
    // ファイルのバッファを取得
    const buffer = Buffer.from(await file.arrayBuffer());

    // ファイル名を生成
    const fileName = `${Date.now()}_${file.name}`;
    
    // 保存先のディレクトリを作成
    const uploadDir = path.join(process.cwd(), "public/images");

    // ファイルを保存
    try {
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        return `/images/${fileName}`;
    } catch (error) {
        console.error("画像保存エラー", error);
        return null;
    }
}