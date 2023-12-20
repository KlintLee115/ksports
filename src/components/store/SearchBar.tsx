"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchBar() {

    const searchParams = useSearchParams();
    const router = useRouter();

    return <div className="sticky py-[3vh] top-0 right-0 z-[20] bg-white">
        <div className="flex py-[2vh] bg-[#F3F5F5] rounded-xl">
            <label>
                <img width={300} height={400} alt="search-icon" className="ml-[2vw]
             w-[1.5rem] aspect-square h-full"
                    src="/icons/search.png" /></label>
            <input
                value={searchParams.get('name') ?? ''}
                className="w-full outline-none ml-4 text-lg border-none"
                onChange={(e) => {
                    const newName = e.target.value

                    router.push(newName === "" ? '/#displayItems' : `/?name=${newName}#displayItems`)
                }}
                style={{backgroundColor: "#F3F5F5"}} type="text" placeholder='Search for a product or a sport' />
        </div>
    </div>
}