import Image from "next/image";

const BannerProductsInfo:
    Map<number, string> = new Map([
        [2, 'https://jqvuripaqkeox1hg.public.blob.vercel-storage.com/red-adidas-shoe'],
        [3, 'https://jqvuripaqkeox1hg.public.blob.vercel-storage.com/green-nike-shoe'],
        [8, 'https://jqvuripaqkeox1hg.public.blob.vercel-storage.com/blackadidasshoe']])

const BannerItems: JSX.Element[] = []

BannerProductsInfo.forEach(value => {
    BannerItems.push(<div className="flex items-center h-full w-[80%] mx-auto relative">
        <Image loading="eager" fill={true} alt="image" src={value} style={{objectFit:"contain"}}/>
    </div>)
})

export default BannerItems;