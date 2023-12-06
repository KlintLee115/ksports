import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PRICE_SORT } from "../../../global/general";

export default function SortAndFilter() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const currPathName = usePathname()

    function addParam(key: string, value: string) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set(key, value)
        const newSearchString = newSearchParams.toString()
        router.push(`${currPathName}?${newSearchString}`)
    }

    return <div className="flex flex-row gap-[10vw] sm:flex sm:flex-col sm:gap-0" style={{width:"fit-content"}}>
        <div>
            <label style={{ fontWeight: "bold", fontSize: "1.2rem", display: "block", marginTop:"2vh" }}>Price </label>
            <select onChange={e => addParam("sortType", e.target.value)}
                value={searchParams.get("sortType") || PRICE_SORT.LOW_TO_HIGH.toString()}>
                <option value={PRICE_SORT.LOW_TO_HIGH.toString()}>Low to high</option>
                <option value={PRICE_SORT.HIGH_TO_LOW.toString()}>High to low</option>
            </select>
        </div>

        <div className="sm:mt-[5vh]">
            <label style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Price range </label>
            <div style={{ display: "flex" }}>
                <label>Min: </label>
                <input
                    onChange={e => addParam("min", e.target.value)}
                    type="number" style={{ width: "5rem", marginLeft: "0.5rem" }} />
            </div>
            <div style={{ display: "flex", marginTop: "1vh" }}>
                <label>Max: </label>
                <input onChange={e => addParam("max", e.target.value)}
                    type="number" style={{ width: "5rem", marginLeft: "0.5rem" }} />
            </div>
        </div>
    </div>
}
