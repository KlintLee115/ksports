"use client"

import ProductsLoadingCircle from "@/components/ProductsLoadingCircle";
import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import SideNav from "@/components/store/SideNav/SideNav";
import DisplayItemsGrid from "@/components/store/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/products/SortAndFilter";
import { productsStorageType, getProducts } from "@/global/general";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";

export default function ProductsPage() {
    const router = useRouter()
    const mainSectionRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleMainSectionClick = () => {
        if (searchParams.get('sideNav') === 'true') {
            router.push(pathname);
        }
    };

    useEffect(() => {
        const mainSection = mainSectionRef.current;

        if (mainSection) {

            mainSection.addEventListener('click', handleMainSectionClick)

            return () => mainSection.removeEventListener('click', handleMainSectionClick)
        }
    }, [searchParams.get('sideNav')])

    function ItemsSection() {
        const [displayItems, setDisplayItems] = useState<productsStorageType>()
        const searchParams = useSearchParams();

        useEffect(() => {
            const productName = searchParams.get("name") || undefined
            const minPrice = searchParams.get("min") || undefined
            const maxPrice = searchParams.get("max") || undefined
            const priceSort = searchParams.get("sortType") || undefined

            // Filter keys that start with "subDir"
            // const subDirsKeys = Array.from(searchParams.keys()).filter(key => key.startsWith('subDir'));
            // const subDirsValues = subDirsKeys.map(key => searchParams.get(key)).filter(value => value !== null) as string[];

            // const subDirsResult = subDirsValues.length === 0 ? undefined : subDirsValues

            async function getDataAndSetProducts() {
                const data = await getProducts(undefined, productName, minPrice ? parseInt(minPrice) : undefined, maxPrice ? parseInt(maxPrice) : undefined, priceSort)
                setDisplayItems(data);
            }

            getDataAndSetProducts()
        }, [searchParams.get('name'), searchParams.get("max"), searchParams.get("min"),
        searchParams.get("sortType")  ])


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
                    : <ProductsLoadingCircle />}
            </div>
        </div>
    }

    return <div style={{ display: 'flex', columnGap: "5vw", width: "90vw", margin: "0 auto" }}>
        <SideNav />
        <Suspense fallback={<h1>Loading...</h1>}>
            <ItemsSection />
        </Suspense>
    </div>
}