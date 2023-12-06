import React from "react";
import ProductsLoadingCircle from "../../ProductsLoadingCircle";
import { productsStorageType } from "../../../global/general";
import { useCookies } from "react-cookie";
import Image from 'next/image'

function ProductsDisplayGrid({ products }: { products: productsStorageType }) {

    const [cookies, setCookie] = useCookies(['cart']);
    const cart = cookies.cart as { [key: string]: { itemName: string, imageSrc: string, quantity: number, price: number } }

    if (products) {

        return <div id="displayItemsGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ gridRowGap: "12vh", gridColumnGap: "7%" }}>

            {Array.from(products.keys()).map(id => {

                const { itemName, price, imageSrc, authorLink, authorName, imageCredit } = products.get(id)!!;
                const { quantity = 0 } = (cart && cart[id]) || {}

                return (
                    <div key={id} className="sm:w-auto sm:flex sm:flex-col sm:justify-end mx-auto">
                        <div className="relative w-[100%] min-h-[30vh]">
                            <Image fill={true} objectFit="fill" alt="product" style={{ margin: "0 auto" }} src={`/products${imageSrc}`} />
                        </div>
                        <h4 style={{ margin: "2vh 0" }}>{itemName}</h4>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h5 style={{ margin: 0 }}>${price}</h5>

                            <div style={{
                                display: "flex", width: "35%",
                                justifyContent: "space-evenly", alignItems: "center"
                            }}>

                                <h3 style={{ margin: 0, cursor: "pointer" }} className="actionButton" onClick={() => setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity - 1, price: price } })}>-</h3>
                                <input style={{ width: "50%" }} type="number" onChange={(e) => setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: e.target.valueAsNumber, price: price } })} value={quantity}></input>
                                <h3 style={{ margin: 0, cursor: "pointer" }} className="actionButton" onClick={() => setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity + 1, price: price } })}>+</h3>
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h6 style={{ margin: 0 }}>Image by: <a href={authorLink} style={{ textDecoration: "none", color: "rgb(0, 0, 238)" }}>{authorName}</a></h6>
                            <a href={imageCredit} style={{ fontSize: "0.67em", fontWeight: "bold", textDecoration: "none", color: "rgb(0, 0, 238)" }}>Image source</a>
                        </div>
                    </div>
                )

            })}

        </div>
    }
    else return <ProductsLoadingCircle />
}

export default ProductsDisplayGrid