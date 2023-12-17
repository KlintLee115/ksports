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
import React from "react";
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

    const name = searchParams.get('name')
    const newName = name ?? undefined
    const sideNav = searchParams.get('sideNav');
    const mainSectionRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const handleMainSectionClick = () => {
        if (sideNav === 'true') {
            router.push(pathname);
        }
    };

    useEffect(() => {
        const mainSection = mainSectionRef.current;

        if (mainSection) {

            mainSection.addEventListener('click', handleMainSectionClick)

            return () => mainSection.removeEventListener('click', handleMainSectionClick)
        }
    }, [sideNav])

    return <div style={{ width: "90vw", margin: "0 auto" }}>
        <SideNav />
        <div ref={mainSectionRef} className={sideNav === "true" ? "blur-[3px]" : "blur-0"}>
            <NavBar />
            <SearchBar />
            <Banner />
            <ItemsSection name={newName} max={max} min={min} sortType={sortType} sideNav={sideNav} />
            <Footer />
        </div>

    </div>
}

const ItemsSection = React.memo<ProductSearchParams>(({ name, max, min, sortType }) => {

    const [displayItems, setDisplayItems] = useState<productsStorageType>()

    useEffect(() => {

        async function getDataAndSetProducts() {
            const data = await getProducts(undefined, name, min, max, sortType)
            setDisplayItems(data);
        }

        getDataAndSetProducts()
    }, [name, min, max, sortType])


    return displayItems ? (
        <div className=" flex flex-col mt-[5vh] ssm:gap-[5vw]
         sm:flex-row" id="displayItems">
            <SortAndFilter itemsLength={displayItems.size} />
            <DisplayItemsGrid products={displayItems} />
        </div>
    )
        : <h3 className="text-center my-[5vh]">No items to display</h3>
}, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name &&
        prevProps.max === nextProps.max &&
        prevProps.min === nextProps.min &&
        prevProps.sortType === nextProps.sortType
})