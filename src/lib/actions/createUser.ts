'use server';

import { registerSchema } from "@/validations/user";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>;
}

// バリデーションエラーを処理する関数
function handleValidationError(error: any): ActionState{
    const { fieldErrors, formErrors } = error.flatten();
    // zodの私用でC0mpl3x!P@ssw0rd一致確認のエラーはformErrorsでわたってくる
    // それ以外のエラーはfieldErrorsでわたってくる
    if(formErrors.length > 0){
        return {
            success: false,
            errors: {
                ...fieldErrors,
                confirmPassword: formErrors,
            },
        };
    }
    return {
        success: false,
        errors: fieldErrors,
    };
}

// カスタムエラーを処理する関数
function handleError(customErrors: Record<string, string[]>): ActionState{
    return {
        success: false,
        errors: customErrors,
    };
}

export async function createUser(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {

    // フォームからわたってきた情報を取得
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map(field=>[
            field,
            formData.get(field) as string
        ])
     ) as Record<string, string>;

    // バリデーション
    const validatedResult = registerSchema.safeParse(rawFormData);
    if(!validatedResult.success){
        return handleValidationError(validatedResult.error);
    }

    // DBにメールアドレスが存在しているか確認
    const existingUser = await prisma.user.findUnique({
        where: {
            email: rawFormData.email,
        },
    });

    if(existingUser){
        return handleError({email: ["メールアドレスが既に存在しています"]});
    }

    // DBに登録
    const hashedPassword = await bcrypt.hash(rawFormData.password, 12);

    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword,
        },
    });

    // dashboardにリダイレクト

    await signIn("credentials", {
        ...Object.fromEntries(formData),
        redirect: false,
    })

    redirect("/dashboard");
}