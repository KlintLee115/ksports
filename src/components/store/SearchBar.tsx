"use client"

import { useSortAndFilters } from "@/global/general";

export default function SearchBar() {

    const {SortAndFilters, setSortAndFilters } = useSortAndFilters()

    return <div className="sticky py-[3vh] top-0 right-0 z-[20] bg-white">
        <div className="flex py-[2vh] bg-[#F3F5F5] rounded-xl">
            <label>
                <img width={300} height={400} alt="search-icon" className="ml-[2vw]
             w-[1.5rem] aspect-square h-full"
                    src="/icons/search.png" /></label>
            <input
                value={SortAndFilters.name}
                onChange={(e) => {
                    const newName = e.target.value 
                    setSortAndFilters({name: newName === "" ? undefined :newName})
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