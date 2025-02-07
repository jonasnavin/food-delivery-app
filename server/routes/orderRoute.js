import express from "express"
import authMidddleware from "../middlewares/authMiddleware.js"
import {
    listOrders,
    placeOrder,
    updateStatus,
    userOrders,
    verifyOrder
} from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMidddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/user-orders", authMidddleware, userOrders)
orderRouter.get("/list-orders", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter