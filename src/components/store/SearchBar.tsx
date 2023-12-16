"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname()

    return <div className="flex sticky top-0 z-[1] px-[1rem] py-[0.5rem]"
        style={{
            borderRadius: "1rem",
            backgroundColor: "#F3F5F5"
        }}>
        <label>
            <img width={300} height={400} alt="search-icon" style={{ width: "1.5rem", aspectRatio: "1/1", height: "100%" }}
                src="/icons/search.png" /></label>
        <input
            onChange={(e) => {
                const newSearchParams = new URLSearchParams(searchParams.toString());

                if (e.target.value === "") {
                    newSearchParams.delete('name')
                }
                else {
                    newSearchParams.set("name", e.target.value)
                }
                router.push(`${pathName}?${newSearchParams.toString()}`)
            }}
            style={{
                marginLeft: "1rem", fontSize: "1.1rem",
                outline: "none",
                border: "none",
                width: "100%",
                backgroundColor: "#F3F5F5"
            }} type="text" placeholder='Search for a product or a sport' />
    </div>
}