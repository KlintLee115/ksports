"use client"

import { PRICE_SORT, useSortAndFilters } from "../../../global/general";

export default function SortAndFilter({ itemsLength }: { itemsLength: number }) {

    const { SortAndFilters, setSortAndFilters } = useSortAndFilters();

    let min: undefined | number = SortAndFilters.min
    let max: undefined | number = SortAndFilters.max
    let sortType: undefined | string = SortAndFilters.sortType

    return <div className="sticky top-[13vh] pb-[5vh] sm:mt-[15vh] sm:top-[15vh] h-fit sm:pb-0 z-10 bg-white w-fit
     max-w-fit mx-auto sm:mx-0">
        <h3 className="hidden sm:block">{itemsLength} items</h3>

        <div className="flex flex-row gap-[10vw] items-baseline sm:flex sm:flex-col sm:gap-0">
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
                                setSortAndFilters({ min:undefined })
                            }
                            else if (e.target.valueAsNumber >= 0) {
                                setSortAndFilters({min: e.target.valueAsNumber})
                            }
                        }
                        }
                        type="number" style={{ width: "5rem", marginLeft: "0.5rem", border: "1px solid black" }} />
                </div>
                <div className="flex mt-[1vh]">
                    <label>Max: </label>
                    <input
                    value={max}
                        min={0}
                        onChange={e => {
                            if (e.target.value.toString() === "") {
                                setSortAndFilters({ max:undefined })
                            }
                            else if (e.target.valueAsNumber >= 0) {
                                setSortAndFilters({max: e.target.valueAsNumber})
                            }
                        }}
                        type="number" style={{ width: "5rem", marginLeft: "0.5rem", border: "1px solid black" }} />
                </div>
            </div>
        </div>
        <h3 className="block sm:hidden">{itemsLength} items</h3>
    </div>
}
