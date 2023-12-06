"use client"

import OtherHeader from "@/components/OtherHeader";
import { fetchPurchasedItems } from "@/global/general";
import { CSSProperties, useRef, useState } from "react";

type purchasedItemsFormat = {
    price_data: {
        currency: string
        product_data: {
            name: string
        }
        unit_amount: number
    }, quantity: number
}

const styles: { [key: string]: CSSProperties } = {
    inputs: {
        border: "1px solid grey",
        borderRadius: "5px",
        width: "100%",
        lineHeight: "7vh",
        outline: "none",
        marginBottom: "2vh",
    },
};

export default function TrackMyOrderPage() {
    const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
    const form = useRef<HTMLFormElement>(null);

    const getPurchasedItems = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const orderNumber = form.current?.elements.namedItem("number") as HTMLInputElement;
            const items = await fetchPurchasedItems(orderNumber.value);
            setPurchasedItems([])

            if (items) {
                const productsInJSON = JSON.parse(items["metadata"]["checkoutProducts"])
                setPurchasedItems(prev => prev.concat(productsInJSON))
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <OtherHeader />
            <div style={{ margin: "8vh 4vw" }}>
                <form ref={form} onSubmit={getPurchasedItems}>
                    <h1 style={{ textAlign: "center" }}>Track Order Status</h1>
                    <input name="number" type="text" style={styles.inputs} placeholder="   Order Number" />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "2vh",
                            backgroundColor: "blue",
                            color: "white",
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        Track
                    </button>
                </form>

                {purchasedItems.length > 0 ?
                    purchasedItems.map((item: purchasedItemsFormat, index) => {
                        return (
                            <div key={index} style={{ display: "flex", justifyContent:"space-evenly", alignItems:"center", borderRadius:"1rem", border: "1px solid black", margin: "2vh 0" }}>
                                <h1 style={{fontSize:"2.5rem"}}>{item.price_data.product_data.name}</h1>
                                <div>
                                    <h3>Price: {item.price_data.unit_amount / 100}</h3>
                                    <h4>Quantity: {item.quantity}</h4>
                                </div>
                            </div>)
                    })
                    :
                    <h3>No data</h3>
                }
            </div>
        </>
    );
}