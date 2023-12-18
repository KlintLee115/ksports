"use client"

import Footer from "@/components/Footer";
import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import SideNav from "@/components/store/SideNav/SideNav";
import Banner from "@/components/store/home/banner/Banner";
import DisplayItemsGrid from "@/components/store/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/products/SortAndFilter";
import { productsStorageType, getProducts, useSortAndFilters } from "@/global/general";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { useState, useEffect, useRef } from "react";

interface ProductSearchParams {
    name: string | undefined;
    max: number | undefined;
    min: number | undefined;
    sortType: string | undefined;
    sideNav: string | null;
}

export default function ProductsPage() {
    const { SortAndFilters } = useSortAndFilters();
    const searchParams = useSearchParams();

    const { max, min, sortType } = SortAndFilters

    const name = searchParams.get('name') ?? undefined
    const sideNav = searchParams.get('sideNav');
    const mainSectionRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const handleMainSectionClick = () => sideNav === 'true' && router.push(pathname)

    useEffect(() => {
        const mainSection = mainSectionRef.current;

        if (mainSection) {

            mainSection.addEventListener('click', handleMainSectionClick)

            return () => mainSection.removeEventListener('click', handleMainSectionClick)
        }
    }, [sideNav])

    return <div style={{ width: "90vw", margin: "0 auto" }}>
        <SideNav />
        <div ref={mainSectionRef} className={sideNav === "true" ? "blur-[3px]" : "relative blur-0 h-max"}>
            <NavBar />
            <SearchBar />
            <Banner />
            <ItemsSection name={name} max={max} min={min} sortType={sortType} sideNav={sideNav} />
            <Footer />
        </div>

    </div>
}

const ItemsSection = memo<ProductSearchParams>(({ name, max, min, sortType }) => {

    const [displayItems, setDisplayItems] = useState<productsStorageType | null>(null)

    useEffect(() => void (async () => setDisplayItems(await getProducts(undefined, name, min, max, sortType)))(), [])

    return displayItems !== null? (
        <div className="flex flex-col ssm:gap-[5vw]
         sm:flex-row" id="displayItems">
            <SortAndFilter itemsLength={displayItems.size} />
            <DisplayItemsGrid products={displayItems} />
        </div>
    )
        : <h1 className="my-[10vh] text-center">Loading Items</h1>
}, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name &&
        prevProps.max === nextProps.max &&
        prevProps.min === nextProps.min &&
        prevProps.sortType === nextProps.sortType;
});