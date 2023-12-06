"use client"

import { useState } from "react"
import ProductsLoadingCircle from "../../../ProductsLoadingCircle"
import BannerItems from "./BannerItems"

export default function Banner() {

    const [transformX, setTransformX] = useState(0);

    const handleLeftClick = () => transformX !== 0 && setTransformX(transformX + 100);
    const handleRightClick = () => transformX !== -200 && setTransformX(transformX - 100);

    return BannerItems.length > 0 ? (
        <div className="relative overflow-hidden whitespace-nowrap h-[25vh] mt-[2vh] sm:h-[35vh] md:h-[45vh]">
            {BannerItems.map((item, id) => {
                return <div id="item-wrapper" key={id}
                 className="inline-block h-full w-full my-0 mx-auto transition-transform duration-500 ease-in-out transform"
                    style={{ transform: `translateX(${transformX}%)` }}>

                    {item}
                    <div className="items-center flex absolute top-0 left-0 h-full w-[15%]">
                        <h4 onClick={handleLeftClick} style={{ display: transformX !== 0 ? "block" : "none", fontSize: "10rem", cursor: transformX !== 0 ? "pointer" : "default" }}>&#8249;</h4>
                    </div>
                    <div className="items-center flex absolute top-0 right-0 h-full w-[15%]">
                        <h4 onClick={handleRightClick} style={{ display: transformX !== -200 ? "block" : "none", fontSize: "10rem", cursor: transformX !== -200 ? "pointer" : "default" }}>&#8250;</h4>
                    </div>
                </div>
            }
            )}
        </div>) : <ProductsLoadingCircle />
}