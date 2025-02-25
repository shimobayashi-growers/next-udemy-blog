import { object, string } from 'zod';

export const registerSchema = object({
    name: string().min(1, { message: '名前は必須です' }),
    email:
        string({
            required_error: 'メールアドレスは必須です',
        })
        .min(1, { message: 'メールアドレスは必須です' })
        .email({ message: '有効なメールアドレスを入力してください' }),
    password:
        string({
            required_error: 'パスワードは必須です',
        })
        .min(1, { message: 'パスワードは必須です' })
        .min(8, { message: 'パスワードは8文字以上で入力してください' })
        .max(32, { message: 'パスワードは32文字以内で入力してください' }),
    confirmPassword:
        string({
            required_error: '確認用パスワードは必須です',
        })
        .min(1, { message: '確認用パスワードは必須です' }),
        }).refine((data) => data.password === data.confirmPassword, {
            message: 'パスワードが一致しません',
            path: ['confirmPassword'],
});