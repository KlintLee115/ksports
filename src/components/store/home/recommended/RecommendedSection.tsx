import RecommendedItem from './RecommendedItem';

const RecommendedProductsInfo:
    Map<number, { img: string, desc: string, name: string }> = new Map([
        [2, {
            img: "/shirts/camilla-carvalho-Cgb4gMKRcMA-unsplash.jpg",
            name:"lol",
            desc: "Price Drops"
        }],
        [3, {
            img: "/shoes/emily-pottiger-Zx76sbAndc0-unsplash.jpg",
            desc: "New Arrivals",
            name:"regege"
        }],
        [8, {
            img: "/shoes/yellow-shoe.jpg", desc: "Best Sellers", name:"rbrb"
        }]])

const RecommendedItems: JSX.Element[] = []

RecommendedProductsInfo.forEach(value => {
    RecommendedItems.push(<RecommendedItem key={value.img} imageSrc={`products${value.img}`}
    name={value.name} description={value.desc} />)
})

export default function RecommendedSection() {

    return (
        <div style={{ marginTop: "5vh", overflowX: "auto" }}>

            <div className="whitespace-nowrap text-center">

                <h1>Our recommendations</h1>

                {RecommendedItems}
            </div>
        </div>
    );
}