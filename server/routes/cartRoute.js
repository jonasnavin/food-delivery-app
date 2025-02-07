import express from 'express'
import authMidddleware from '../middlewares/authMiddleware.js'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/get', authMidddleware, getCart)
cartRouter.post('/add', authMidddleware, addToCart)
cartRouter.post('/remove', authMidddleware, removeFromCart)

export default cartRouter