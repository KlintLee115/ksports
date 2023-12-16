"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PRICE_SORT } from "../../../global/general";

export default function SortAndFilter({ itemsLength }: { itemsLength: number }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const currPathName = usePathname()
    const newSearchParams = new URLSearchParams(searchParams.toString());

    function addParam(key: string, value: string) {
        newSearchParams.set(key, value)
        router.push(`${currPathName}?${newSearchParams.toString()}`)
    }

    function removeParam(key: string) {
        newSearchParams.delete(key)
        router.push(`${currPathName}?${newSearchParams.toString()}`)
    }

    return <>
        <h3 className="hidden sm:block">{itemsLength} items</h3>

        <div className="flex flex-row gap-[10vw] items-baseline sm:flex sm:flex-col sm:gap-0">
            <div>
                <label style={{ fontWeight: "bold", fontSize: "1.2rem", display: "block", marginTop: "2vh" }}>Price </label>
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
                        min={0}
                        onChange={e => {
                            if (e.target.value.toString() === "") {
                                removeParam('min')
                            }
                            else if (e.target.valueAsNumber >= 0) {
                                addParam("min", e.target.value)
                            }
                        }
                        }
                        type="number" style={{ width: "5rem", marginLeft: "0.5rem", border: "1px solid black" }} />
                </div>
                <div style={{ display: "flex", marginTop: "1vh" }}>
                    <label>Max: </label>
                    <input
                        min={0}
                        onChange={e => {
                            if (e.target.value.toString() === "") {
                                removeParam('max')
                            }
                            else if (e.target.valueAsNumber >= 0) {
                                addParam("max", e.target.value)
                            }
                        }}
                        type="number" style={{ width: "5rem", marginLeft: "0.5rem", border: "1px solid black" }} />
                </div>
            </div>
        </div>
        <h3 className="sm:hidden">{itemsLength} items</h3>

    </>
}
