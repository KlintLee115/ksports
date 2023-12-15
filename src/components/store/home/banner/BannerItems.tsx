import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, "/shirts/camilla-carvalho-Cgb4gMKRcMA-unsplash.jpg"],
        [3, "/shoes/emily-pottiger-Zx76sbAndc0-unsplash.jpg"],
        [8, "/shoes/yellow-shoe.jpg"]])

const BannerItems: JSX.Element[] = []

BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image fill={true} alt="image" src={`/products${value}`} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;