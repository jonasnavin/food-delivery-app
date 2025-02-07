import Stripe from "stripe"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import { CLIENT_URL, STRIPE_SECRET_KEY } from '../configs/config.js'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body

        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cart: {} })

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 40 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`

        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Payment completed" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Payment canceled" })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Errors" })
    }
}

export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}