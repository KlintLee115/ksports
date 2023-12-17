"use client"

import { PRICE_SORT, useSortAndFilters } from "../../../global/general";

export default function SortAndFilter({ itemsLength }: { itemsLength: number }) {

    const { SortAndFilters, setSortAndFilters } = useSortAndFilters();

    let min: undefined | number = SortAndFilters.min
    let max: undefined | number = SortAndFilters.max
    let sortType: undefined | string = SortAndFilters.sortType

    return <div className="h-fit sticky top-[13vh] py-[5vh] sm:py-0 z-10 sm:mt-[10vh] sm:top-[15vh] bg-white w-full sm:w-fit">

        <div className="w-4/5 mx-auto">
            <div className="flex flex-row justify-between gap-[10vw] sm:flex sm:flex-col sm:gap-0 items-baseline">
                <h3 className="hidden sm:block">{itemsLength} items</h3>
                <div>
                    <label style={{ fontWeight: "bold", fontSize: "1.2rem", display: "block", marginTop: "2vh" }}>Price </label>
                    <select onChange={e => setSortAndFilters({ sortType: e.target.value })}
                        value={sortType || PRICE_SORT.LOW_TO_HIGH.toString()}>
                        <option value={PRICE_SORT.LOW_TO_HIGH.toString()}>Low to high</option>
                        <option value={PRICE_SORT.HIGH_TO_LOW.toString()}>High to low</option>
                    </select>
                </div>

                <div className="sm:mt-[5vh]">
                    <label style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Price range </label>
                    <div style={{ display: "flex" }}>
                        <label>Min: </label>
                        <input
                            value={min}
                            min={0}
                            onChange={e => {
                                if (e.target.value.toString() === "") {
                                    setSortAndFilters({ min: undefined })
                                }
                                else if (e.target.valueAsNumber >= 0) {
                                    setSortAndFilters({ min: e.target.valueAsNumber })
                                }
                            }
                            }
                            type="number" style={{ width: "5rem", marginLeft: "auto", border: "1px solid black" }} />
                    </div>
                    <div className="flex mt-[1vh]">
                        <label>Max: </label>
                        <input
                            value={max}
                            min={0}
                            onChange={e => {
                                if (e.target.value.toString() === "") {
                                    setSortAndFilters({ max: undefined })
                                }
                                else if (e.target.valueAsNumber >= 0) {
                                    setSortAndFilters({ max: e.target.valueAsNumber })
                                }
                            }}
                            type="number" style={{ width: "5rem", marginLeft: "auto", border: "1px solid black" }} />
                    </div>
                </div>

            </div>
            <h1 className="block sm:hidden font-bold">{itemsLength} items</h1>
        </div>
    </div>
}
