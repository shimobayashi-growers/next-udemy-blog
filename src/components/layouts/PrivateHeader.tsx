import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { auth } from "@/auth";
import Setting from "./Setting";

export default async function PrivateHeader() {

    // セッション取得
    const session = await auth();

    // ログインしていない場合はエラー
    if (!session?.user?.email) throw new Error("不正なリクエストです");

    return (
        <header className="border-b bg-blue-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink className="font-bold text-xl">
                                    管理ページ
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Setting session={session} />
            </div>
        </header>
    )
}