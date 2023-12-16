"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchBar({ isEnterClicked }: { isEnterClicked?: boolean }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname()
    const inputElement = useRef<HTMLInputElement>(null)

    if (isEnterClicked) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        const name = inputElement.current?.value

        if (name) {
            newSearchParams.set('name', name)

            router.push(`/products?${newSearchParams.toString()}`)
        }
    }

    return <div className="sticky py-[3vh] top-0 right-0 z-[20] bg-white">
        <div className="flex py-[2vh] bg-[#F3F5F5] rounded-xl">
            <label>
                <img width={300} height={400} alt="search-icon" className="ml-[2vw]
             w-[1.5rem] aspect-square h-full"
                    src="/icons/search.png" /></label>
            <input
                ref={inputElement}
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
    </div>
}