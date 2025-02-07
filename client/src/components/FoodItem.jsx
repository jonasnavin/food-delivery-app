import { useContext } from 'react'
import { FiPlus } from "react-icons/fi"
import { FaMinus, FaPlus } from "react-icons/fa"
import StoreContext from '../context/StoreContext'

const FoodItem = ({ item }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

    return (
        <div
            className={`w-[100%] m-auto rounded-[15px]
            shadow-[0px_0px_10px] shadow-gray-300 animate-[fadeIn_2s]`}
        >
            <div
                className={`relative`}
            >
                <img
                    className={`w-[100%] h-[200px] rounded-[15px_15px_0px_0px]`}
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                />
                {!cartItems[item._id] ? (
                    <div
                        onClick={() => addToCart(item._id)}
                        className={`w-[35px] flex items-center justify-center h-[35px] bg-white
                        absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%]`}
                    >
                        <FiPlus
                            className={`text-[18px]`}
                        />
                    </div>
                ) : (
                    <div
                        className={`absolute bottom-[15px] right-[15px] flex gap-[10px]
                           select-none items-centergap-[10px] p-[6px] rounded-[50px] bg-white`}
                    >
                        <div
                            onClick={() => removeFromCart(item._id)}
                            className={`w-[30px] h-[30px] flex items-center justify-center bg-red-100
                            cursor-pointer rounded-[50%]`}
                        >
                            <FaMinus
                                className={`text-[12px] text-red-600`}
                            />
                        </div>
                        <p>{cartItems[item._id]}</p>
                        <div
                            onClick={() => addToCart(item._id)}
                            className={`w-[30px] h-[30px] flex items-center justify-center bg-green-100
                            cursor-pointer rounded-[50%]`}
                        >
                            <FaPlus
                                className={`text-[12px] text-green-600`}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`p-[20px]`}
            >
                <div
                    className={`flex justify-between items-start mb-[10px]`}
                >
                    <p className={`text-[20px] font-[500]`}>{item.name}</p>
                    <p className={`text-red-500 text-[22px] font-[500]`}>&#8377; {item.price}</p>
                </div>
                <p
                    className={`text-gray-600 text-[12px]`}
                >
                    {item.description.substring(0, 100)}
                    {item.description.length > 80 ? "..." : ""}
                </p>
            </div>
        </div>
    )
}

export default FoodItem