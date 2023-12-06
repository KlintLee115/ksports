import OtherHeader from "@/components/OtherHeader";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default () => {
    return <div style={{textAlign:"center"}}>
        <OtherHeader />
        <Suspense fallback={<h1>Loading...</h1>}>
        <DisplayOrderID/></Suspense>
        <h1>Payment Success</h1>
        <h3>Your order ID allows you to keep track of your order at <a href="/trackmyorder">Track your order</a></h3>
    </div>
}

function DisplayOrderID() {
    
    const searchParams = useSearchParams();

    const orderID = searchParams.get("orderNumber");

    return <h3>Order ID: {orderID}</h3>
}