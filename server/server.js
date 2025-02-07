import express from "express"
import cors from "cors"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import { connectDB } from "./db/connectDB.js"
import { PORT } from "./configs/config.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
    res.send("API Working")
})

connectDB()

app.listen(PORT || 5000, () => {
    console.log(`App is running in ${PORT}`)
})