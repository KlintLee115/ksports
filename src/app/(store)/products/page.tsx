"use client"

import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import SideNav from "@/components/store/SideNav/SideNav";
import DisplayItemsGrid from "@/components/store/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/products/SortAndFilter";
import { productsStorageType, getProducts } from "@/global/general";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect, Suspense, useRef } from "react";

interface ProductSearchParams {
    name: string | null;
    max: string | null;
    min: string | null;
    sortType: string | null;
    sideNav: string | null;
}

export default function ProductsPage() {
    const { name, max, min, sortType, sideNav } = useProductSearchParams();

    return <div style={{ display: 'flex', columnGap: "5vw", width: "90vw", margin: "0 auto" }}>
        <SideNav />
        <div>
            <ItemsSection name={name} max={max} min={min} sortType={sortType} sideNav={sideNav} />
        </div>
    </div>
}

const ItemsSection = React.memo<ProductSearchParams>(({ name, max, min, sortType, sideNav }) => {
    const [displayItems, setDisplayItems] = useState<productsStorageType>()
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

    useEffect(() => {

        const newName = name === null ? undefined : name
        const newMin = min === null ? undefined : parseInt(min) 
        const newMax = max === null? undefined: parseInt(max)
        const newPriceSort = sortType === null ? undefined : "LOW_TO_HIGH"

        // Filter keys that start with "subDir"
        // const subDirsKeys = Array.from(searchParams.keys()).filter(key => key.startsWith('subDir'));
        // const subDirsValues = subDirsKeys.map(key => searchParams.get(key)).filter(value => value !== null) as string[];

        // const subDirsResult = subDirsValues.length === 0 ? undefined : subDirsValues

        async function getDataAndSetProducts() {
            const data = await getProducts(undefined, newName, newMin, newMax, newPriceSort)
            setDisplayItems(data);
        }

        getDataAndSetProducts()
    }, [])


    return <div style={{ overflowX: "hidden", width: "100%" }} ref={mainSectionRef}>
        <div className='relative z-10 mx-6'>

            <Suspense fallback={<h1>Loading...</h1>}>
                <NavBar />
                <SearchBar />
            </Suspense>

            {displayItems ? (
                <div className="flex flex-col mt-[5vh] ssm:gap-[5vw] sm:flex-row">
                    <div><h3 style={{ marginTop: 0 }}>{displayItems?.size || 0} items
                    </h3>
                        <SortAndFilter />
                    </div>
                    <DisplayItemsGrid products={displayItems} />
                </div>
            )
                : <h3>No items to display</h3>}
        </div>
    </div>
}, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name &&
        prevProps.max === nextProps.max &&
        prevProps.min === nextProps.min &&
        prevProps.sortType === nextProps.sortType
})

function useProductSearchParams() {
    const searchParams = useSearchParams();
    return {
        name: searchParams.get('name'),
        max: searchParams.get('max'),
        min: searchParams.get('min'),
        sortType: searchParams.get('sortType'),
        sideNav: searchParams.get('sideNav')
    };
}
