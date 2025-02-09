import { useContext, useState } from "react"
import StoreContext from "../context/StoreContext"
import axios from "axios"

const PlaceOrderPage = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const placeOrderUrl = `${url}/api/order/place`

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const orderItems = []
    food_list.map(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40
    }
    console.log(orderData)
    try {
      const response = await axios.post(placeOrderUrl, orderData, { headers: { token: token } })
      console.log(response.data)
      const { session_url } = response.data
      console.log(session_url)
      window.location.replace(session_url)
    } catch (error) {
      console.log(error)
      alert("Error")
    }
  }

  const inputStyles = `mb-[15px] w-[100%] p-[10px] border-[1px]border-gray-300 rounded-[4px] outline-red-500`
  const inputDivStyles = `flex gap-[10px] max-sm:flex-col`

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-start max-md:flex-col max-md:items-center justify-between gap-[50px] mt-[100px]`}
    >
      <div
        className={`w-[100%] max-w-[max(30%,_500px)]`}
      >
        <h2
          className={`text-[30px] font-[600] mb-[50px]`}
        >
          Delivery Information
        </h2>
        <div className={inputDivStyles}>
          <input
            required
            className={inputStyles}
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            required
            className={inputStyles}
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className={inputDivStyles}>
          <input
            required
            className={inputStyles}
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <input
            required
            className={inputStyles}
            value={data.phone}
            onChange={onChangeHandler}
            type="text"
            name="phone"
            placeholder="Phone" />
        </div>
        <div className={inputDivStyles}>
          <input
            required
            className={inputStyles}
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            name="street"
            placeholder="Street" />
        </div>
        <div className={inputDivStyles}>
          <input
            required
            className={inputStyles}
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            name="city"
            placeholder="City" />
          <input
            required
            className={inputStyles}
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            name="state"
            placeholder="State" />
        </div>
        <div className={inputDivStyles}>
          <input
            required
            className={inputStyles}
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            name="country"
            placeholder="Country" />
          <input
            required
            className={inputStyles}
            value={data.zipCode}
            onChange={onChangeHandler}
            type="text"
            name="zipCode"
            placeholder="Zip Code"
          />
        </div>
      </div>
      <div
        className={`w-[100%] max-w-[max(40%,_500px)]`}
      >
        <div className={`flex-1 flex flex-col gap-[20px]`}>
          <h2 className={`text-[30px] font-[600]`}>Cart Total</h2>
          <div>
            <div className={`flex justify-between text-gray-500`}>
              <p>Subtotal</p>
              <p>&#8377; {getTotalCartAmount()}</p>
            </div>
            <hr className={`my-[10px] h-[1px] bg-gray-300 border-none`} />
            <div className={`flex justify-between text-gray-500`}>
              <p>Delivery Fee</p>
              <p>&#8377; {getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr className={`my-[10px] h-[1px] bg-gray-300 border-none`} />
            <div className={`flex justify-between text-gray-500`}>
              <p>Total</p>
              <p>&#8377; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
          </div>
          <button
            type="submit"
            className={`border-none text-white bg-red-500 w-[max(15vw,_200px)]
            py-[12px] mt-[15px] rounded-[15px] cursor-pointer`}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrderPage