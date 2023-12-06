import Image from "next/image"

export default function RecommendedItem({ imageSrc, name, description }: { imageSrc: string, name: string, description: string }) {
    return (
        <div className="min-h-[11rem] relative inline-block ssm:min-w-[8rem] mr-4 md:mr-8 md:min-h-[13rem] sm:min-w-[11rem] lg:min-w-[16rem] xl:min-w-[20rem] lg:min-h-[15rem]">
            <h3 className="my-[3vh] mx-0">{description}</h3>
        <div className="relative w-[100%] min-h-[inherit]">
                <Image src={'/' + imageSrc} fill={true} objectFit="cover" alt={imageSrc} />
            </div>
            <h3 className="max-w-[85%] text-center" style={{ wordWrap: "break-word", margin: "0.5vh 0" }}>
                {name}
            </h3>
        </div>)
}