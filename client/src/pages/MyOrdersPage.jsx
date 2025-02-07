import { useContext, useEffect, useState } from "react"
import StoreContext from "../context/StoreContext"
import axios from "axios"
import { assets } from "../assets/assets"

const MyOrdersPage = () => {

    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)

    const ordersUrl = `${url}/api/order/user-orders`

    const fetchOrders = async () => {
        try {
            const response = await axios.post(ordersUrl, {}, { headers: { token } })
            setData(response.data.data.reverse())
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    if (data.length === 0) {
        return (
            <p className={`text-gray-700 text-center mt-[100px]`}>
                No orders have been placed
            </p>
        )
    }

    return (
        <div
            className={`my-[50px]`}
        >
            <h2 className={`text-2xl font-bold`}>My Orders</h2>
            <div
                className={`flex flex-col gap-[20px] mt-[30px]`}
            >
                {data.map((order, index) => {
                    return (
                        <div
                            className={`grid grid-cols-[.5fr_2fr_1fr_1fr_2fr_1fr]
                            items-center gap-[30px] text-[14px] p-[10px_20px] text-gray-700
                            border border-red-700 max-md:grid-cols-[1fr_2fr_1fr]
                            max-md:row-gap-[5px] text-[12px]`}
                            key={index}>
                            <img
                                className={`w-[50px]`}
                                src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>&#8377; {order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span
                                    className={
                                        order.status === "Food Processing" ? "text-red-600"
                                            : order.status === "Out for delivery" ? "text-yellow-600"
                                                : "text-green-600"
                                    }
                                >&#x25cf;</span>
                                <b className={`font-[500] text-gray-900`}> {order.status}</b>
                            </p>
                            <button
                                onClick={fetchOrders}
                                className={`py-[12px] rounded-[4px] bg-red-100 cursor-pointer
                                text-gray-900 max-md:text-[10px]`}
                            >Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrdersPage