"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  PRICE_SORT,
  SortType,
  useSortAndFilters,
} from "../../../../helpers/general";

export default function SortAndFilter({
  itemsLength,
}: {
  itemsLength: number;
}) {
  const { SortAndFilters, setSortAndFilters } = useSortAndFilters();

  const [filters, setFilters] = useState<{
    min?: number;
    max?: number;
    sortType: SortType;
  }>({
    min: SortAndFilters.min,
    max: SortAndFilters.max,
    sortType: SortAndFilters.sortType,
  });

  const [debouncedFilters, setDebouncedFilters] = useState<{
    min?: number;
    max?: number;
    sortType: SortType;
  }>(SortAndFilters);

  // Update debouncedFilters state on user input
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setFilters((filters) => ({
      ...filters,
      sortType: e.target.value as SortType,
    }));

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.toString() === "")
      setFilters((filters) => ({ ...filters, min: undefined }));
    else if (e.target.valueAsNumber > 0)
      setFilters((filters) => ({ ...filters, min: e.target.valueAsNumber }));
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.toString() === "")
      setFilters((filters) => ({ ...filters, max: undefined }));
    else if (e.target.valueAsNumber > 0)
      setFilters((filters) => ({ ...filters, max: e.target.valueAsNumber }));
  };

  // Apply debouncing effect
  useEffect(() => {
    const handler = setTimeout(
      () =>
        setDebouncedFilters({
          min: filters.min,
          max: filters.max,
          sortType: filters.sortType,
        }),
      250
    );

    return () => clearTimeout(handler);
  }, [filters.min, filters.max, filters.sortType]);

  useEffect(() => setSortAndFilters(debouncedFilters), [debouncedFilters]);

  return (
    <div className="h-fit sticky top-[13vh] mx-auto py-[5vh] sm:py-0 z-10 sm:mt-[10vh] sm:top-[15vh] bg-white w-fit">
      <div className="flex flex-row justify-between gap-[10vw] sm:flex sm:flex-col sm:gap-0 items-baseline">
        <h3 className="hidden sm:block">{itemsLength} items</h3>
        <div>
          <label
            className="font-bold block mt-[2vh]"
            style={{ fontSize: "1.2rem" }}
          >
            Price{" "}
          </label>
          <select onChange={handleSortChange} value={filters.sortType}>
            <option value={PRICE_SORT[0]}>Low to high</option>
            <option value={PRICE_SORT[1]}>High to low</option>
          </select>
        </div>

        <div className="sm:mt-[5vh]">
          <label style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Price range{" "}
          </label>
          <div className="flex">
            <label>Min: </label>
            <input
              className="w-[5rem] ml-auto border border-black border-solid"
              value={filters.min ?? ""}
              min={0}
              onChange={handleMinChange}
              type="number"
            />
          </div>
          <div className="flex mt-[1vh]">
            <label>Max: </label>
            <input
              value={filters.max ?? ""}
              min={0}
              onChange={handleMaxChange}
              type="number"
              className="w-[5rem] ml-auto border border-black border-solid"
            />
          </div>
        </div>
      </div>
      <h1 className="block sm:hidden font-bold">{itemsLength} items</h1>
    </div>
  );
}
