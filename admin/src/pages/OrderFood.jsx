import { useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { useEffect } from "react"
import { assets } from "../assets/assets"

const OrderFood = ({ url }) => {

  const getFoodUrl = `${url}/api/order/list-orders`
  const orderStatusUrl = `${url}/api/order/status`

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(getFoodUrl)
      if (response.data.success) {
        setOrders(response.data.data)
      }
      else {
        toast.error("Error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(orderStatusUrl, { orderId, status: event.target.value })
      if (response.data.success) {
        await fetchOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div
      className={`w-[70%] mx-auto py-[50px]`}
    >
      <h3 className={`font-bold text-xl`}>Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className={`grid grid-cols-[.5fr_2fr_1fr_1fr_1fr] items-start gap-[30px]
            border border-red-700 p-[20px] my-[30px] text-[14px] text-gray-600
            max-md:text-[12px] max-md:grid-cols-[.7fr_2fr_1fr] max-md:p-[15px_8px]`}
            key={index}>
            <img className={`max-md:w-[40px]`} src={assets.parcel_icon} alt="" />
            <div>
              <p className={`font-[600]`}>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} ${item.quantity}`
                  }
                  else {
                    return `${item.name} ${item.quantity}, `
                  }
                })}
              </p>
              <p className={`font-[600] mt-[30px] mb-[5px]`}>{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div className={`mb-[10px]`}>
                <p>{`${order.address.street}, `}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>&#8377; {order.amount}</p>
            <select
              value={order.status}
              onChange={event => statusHandler(event, order._id)}
              className={`bg-red-50 border border-red-700 p-[10px]
              outline-none max-md:p-[5px] max-md:text-[12px] cursor-pointer`}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderFood