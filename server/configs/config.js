import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const PORT = process.env.PORT
export const CLIENT_URL = process.env.CLIENT_URL