import userModel from "../models/userModel.js"

export const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = userData.cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData })
        res.json({ success: true, message: "Added to cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = userData.cart
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData })
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = userData.cart
        res.json({ success: true, cart: cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}