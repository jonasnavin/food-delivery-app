import { createContext, useEffect, useState } from "react"
import axios from "axios"

const StoreContext = createContext(null)

export const StoreProvider = (props) => {

    const url = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://cravehub-backend.onrender.com"

    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const [showLogin, setShowLogin] = useState(false)

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(food => food._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } })
        setCartItems(response.data.cart)
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list-foods`)
            setFoodList(response.data.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
        console.log("Hello World")
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        loadCartData,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url, token, setToken,
        showLogin, setShowLogin
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext