"use client"

import OtherHeader from '@/components/OtherHeader'
import { checkout, checkoutItemStructure } from "@/global/general";
import { useCookies } from "react-cookie"
import { CookieSetOptions } from "universal-cookie"
import Image from 'next/image'

export default function CheckoutPage() {

    return <>
        <OtherHeader />
        <CheckoutItemsDisplay />
    </>
}

function CheckoutItemsDisplay() {

    const [cookies, setCookie] = useCookies(['cart']);

    const cart = cookies.cart as { [key: string]: { itemName: string, imageSrc: string, quantity: number, price: string } }

    const itemsForCheckout: checkoutItemStructure[] = cart ? Object.values(cart).map(item => {
        const productName = item.itemName;
        const priceInCent = parseInt(item.price) * 100;
        const amount = item.quantity!!;

        // Assuming default currency is USD, modify as needed
        const currency = 'USD';

        // Create the price_data structure
        const price_data = {
            currency: currency,
            product_data: {
                name: productName,
            },
            unit_amount: priceInCent,
        };

        // Return the item structure
        return {
            price_data: price_data,
            quantity: amount,
        };
    }) : []

    return (cart ? Object.keys(cart).length > 0 ?
        <div style={{ margin: "8vh 4vw" }}>
            {Object.keys(cart).map(idStr => {

                const id = parseInt(idStr)

                return CheckoutItemCard({ id, cookies, setCookie })

            })}
            <button onClick={async () => {
                const url = await checkout(itemsForCheckout)
                window.location.href = url;
            }} style={{ marginLeft: "auto", marginTop: "3vh", display: "block", backgroundColor: "green", color: "white", fontSize: "1.2rem", padding: "1vh 4vw" }}>Checkout</button>
        </div >
        :
        <h3 style={{ textAlign: "center" }}>Nothing in cart now</h3>
        :
        <h3 style={{ textAlign: "center" }}>Nothing in cart now</h3>

    )
}

function CheckoutItemCard({ id, cookies, setCookie }: {
    id: number, cookies: {
        cart?: any;
    }, setCookie: (name: "cart", value: any, options?: CookieSetOptions | undefined) => void
}) {

    const cart = cookies.cart
    const { imageSrc, itemName, price, quantity } = cart[id]

    return <div key={id} style={{
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2vw",
        border: "1px solid black", borderRadius: "0.5rem", padding: "2vh 10vw", marginBottom: "2vh"
    }}>
        <Image width={175} height={200} src={`products${imageSrc}`} alt="Product image" />

        <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <p style={{ fontSize: "2rem", margin: 0 }}>{itemName}</p>
                <p style={{ fontSize: "1.5rem" }}>${price}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button onClick={() => {
                    const { [id]: removedItem, ...restOfCart } = cart

                    setCookie('cart', restOfCart)

                }}
                    style={{ backgroundColor: "red", lineHeight: "6vh", margin: "0", textAlign: "center", padding: "0 20px" }}>Remove</button>

                <div id="checkout-item-card" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <h2 id="decrement" style={{ width: "30px", cursor: "pointer" }} onClick={() => { setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity - 1, price: price } }) }}>-</h2>
                    <h2 style={{ width: "30px" }}>{quantity}</h2>
                    <h2 id="increment" style={{ width: "30px", cursor: "pointer" }} onClick={() => { setCookie('cart', { ...cart, [id]: { itemName: itemName, imageSrc: imageSrc, quantity: quantity + 1, price: price } }) }}>+</h2>
                </div>
            </div>
        </div>
    </div >
}
