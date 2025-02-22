'use client'
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const router = useRouter()

    // デバウンス
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
        
    }, [search])

    // debaouncedSearchが変更されたら、searchPostsを呼び出す
    useEffect(() => {
        if (debouncedSearch.trim()) {
            router.push(`/?search=${debouncedSearch.trim()}`)
        } else {
            router.push("/")
        }
    }, [debouncedSearch, router])


    return (
        <>
        <Input
            placeholder="Search..."
            className="w-[200px] lg:w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        </>
    )
}