"use client"

import ProductsLoadingCircle from "@/components/ProductsLoadingCircle";
import NavBar from "@/components/store/NavBar";
import SearchBar from "@/components/store/SearchBar";
import DisplayItemsGrid from "@/components/store/products/DisplayItemsGrid";
import SortAndFilter from "@/components/store/products/SortAndFilter";
import { productsStorageType, getProducts } from "@/global/general";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";

export default function ProductsPage() {

    return <Suspense fallback={<h1>Loading...</h1>}>
        <ItemsSection />
    </Suspense>
}

function ItemsSection() {
    const [displayItems, setDisplayItems] = useState<productsStorageType>()
    
    const mainSectionRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
  
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

    useEffect(() => {
        const productName = searchParams.get("name") || undefined
        const minPrice = searchParams.get("min") || undefined
        const maxPrice = searchParams.get("max") || undefined
        const priceSort = searchParams.get("sortType") || undefined

        async function getDataAndSetProducts() {
            const data = await getProducts(undefined, productName, minPrice ? parseInt(minPrice) : undefined, maxPrice ? parseInt(maxPrice) : undefined, priceSort)
            setDisplayItems(data);
        }

        getDataAndSetProducts()
    }, [searchParams])


    return <div className='relative z-10 overflow-x-hidden w-[90vw] mx-auto' ref={mainSectionRef}>

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
}