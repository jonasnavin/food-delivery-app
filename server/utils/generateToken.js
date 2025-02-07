import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/config.js"

export const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET)
}