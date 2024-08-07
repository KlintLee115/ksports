import { fetchData, productsStorageType, productsType } from "@/helpers/general";
import RelatedWordsOptions from "@/components/home/Options/RelatedWordsOptions";
import CartIcon from "@/components/home/CartIcon";
import MainContent from "@/components/home/MainContent";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
}

interface SearchParams {
    sortType?: string
    limit?: string
    contains?: string
    keywords?: string
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {

    const { sortType, limit, contains, keywords } = searchParams

    const queryParams = new URLSearchParams();

    if (sortType) queryParams.set('sort', sortType)
    if (limit) queryParams.set('limit', limit)
    if (contains) queryParams.set('contains', contains)
    if (keywords) queryParams.set('keywords', keywords)

    const queryString = queryParams.toString()

    const products = await fetchData(`Products${queryString ? '?' + queryString : ''}`)

    const displayItems: productsStorageType = new Map();
    (products as (productsType & { id: number })[]).forEach(
        product => {

            displayItems.set(product.id, {
                description: product.description,
                authorLink: product.authorLink,
                authorName: product.authorName,
                imageCredit: product.imageCredit,
                imageSrc: product.imageSrc,
                itemName: product.itemName,
                price: product.price,
                quantity: 0
            });
        }
    );

    return (
        <div className="max-w-container mx-auto px-4 relative">
            <CartIcon />
            <h1 className="text-4xl font-bold my-6">Shop now</h1>
            <RelatedWordsOptions searchParams={searchParams} />

            {
                !isNaN(displayItems.size) ? <>
                    <h3 className="font-semibold text-xl mb-4">{displayItems?.size} items</h3>
                    <MainContent displayItems={displayItems} />
                </>
                    : <h3>Loading</h3>
            }


        </div>
    );
};
