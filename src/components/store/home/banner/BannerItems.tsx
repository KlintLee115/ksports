import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, '/products/Adidas-all-court-basketball.jpg'],
        [3, '/products/Adidas-grey-deerupt.jpg'],
        [8, '/products/grailify-ju4-jsQ8jmk-unsplash.jpg']])

const BannerItems: JSX.Element[] = []

BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image fill={true} alt="image" src={value} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;