import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../configs/config.js'

const authMidddleware = async (req, res, next) => {
    const {token} = req.headers
    if(!token) {
        return res.json({success: false, message: "Authentication failed"})
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        req.body.userId = decodedToken.id
        next()
    } catch (error) {
        console.log(error)
        res.json({succes: false, message: "Error"})
    }
}

export default authMidddleware