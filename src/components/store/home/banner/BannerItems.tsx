import { VERCEL_BLOB_URL } from "@/global/general";
import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, `${VERCEL_BLOB_URL}/sara-kurfess-_VfvnjbKFu4-unsplash.jpg`],
        [3, `${VERCEL_BLOB_URL}/White%20Adidas%20shoe`],
        [8, `${VERCEL_BLOB_URL}/eddie-palmore-white-adidas-shoes.jpg`]])

const BannerItems: JSX.Element[] = []

BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image fill={true} alt="image" src={value} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;