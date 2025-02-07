import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import StoreContext from "../context/StoreContext"

const CartPage = () => {

  const {
    food_list,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    token } = useContext(StoreContext)

  const navigate = useNavigate()

  if (!token) {
    return (
      <p className={`text-gray-700 text-center mt-[100px]`}>
        Please login to view cart
      </p>
    )
  }

  else if (getTotalCartAmount() === 0) {
    return (
      <p className={`text-gray-700 text-center mt-[100px]`}>
        Your cart is empty
      </p>
    )
  }

  return (
    <div className={`mt-[100px]`}>
      <div>
        <div
          className={`grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]
          items-center text-gray-500 text-[max(1.2vw,_12px)]`}
        >
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className={`h-[1px] bg-gray-300 border-none`} />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div
                  className={`grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]
                  items-center text-gray-500 text-[max(1.2vw,_12px)]
                  my-[10px] text-black`}
                >
                  <img
                    className="w-[50px]"
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>&#8377; {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#8377; {item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className={`cursor-pointer`}
                  >
                    x
                  </p>
                </div>
                <hr className={`h-[1px] bg-gray-300 border-none`} />
              </div>
            )
          }
        })}
      </div>
      <div className={`mt-[80px] flex justify-between gap-[max(12vw,_20px)] max-md:flex-col-reverse`}>
        <div className={`flex-1 flex flex-col gap-[20px]`}>
          <h2 className={`text-2xl font-[700]`}>Cart Total</h2>
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
            onClick={() => navigate('/order')}
            className={`border-none text-white bg-red-500 w-[max(15vw,_200px)]
            py-[12px] mt-[15px] rounded-[15px] cursor-pointer`}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className={`flex-1`}>
          <div>
            <p className={`text-gray-700`}>
              If you have promo code enter here.
            </p>
            <div className={`mt-[10px] flex justify-between items-center bg-gray-200 rounded-[4px]`}>
              <input
                className={`bg-transparent border-none outline-none pl-[10px]`}
                type="text"
                placeholder="Promo Code"
              />
              <button
                className={`w-[max(10vw,_150px)] p-[12px_5px] bg-black
                bporder-none text-white rounded-[4px]`}
              >
                Sumbit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage