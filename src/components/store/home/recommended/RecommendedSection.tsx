import RecommendedItem from './RecommendedItem';
import { getProducts } from '../../../../global/general';

const RecommendProductsIds: number[] = [2, 3, 8]
const RecommendedProductsDescriptions: string[] = ["Price Drops", "New Arrivals", "Best Sellers"]

export default async function RecommendedSection() {

    const recommendedItems = await getProducts(RecommendProductsIds)

    return (
        <div style={{ marginTop: "5vh", overflowX: "auto" }}>

            <div className="whitespace-nowrap text-center">

                <h1>Our recommendations</h1>

                {Array.from(recommendedItems.keys()).map((id, idx) => {

                    return <RecommendedItem key={id} imageSrc={`products${recommendedItems.get(id)!!.imageSrc}`}
                        name={recommendedItems.get(id)!!.itemName} description={RecommendedProductsDescriptions[idx]} />
                })}
            </div>
        </div>
    );
}