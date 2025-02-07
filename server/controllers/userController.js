import bcrypt from "bcrypt"
import validator from "validator"
import userModel from "../models/userModel.js"
import { createToken } from "../utils/generateToken.js"

export const logInUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.json({ success: false, message: "Invalid password" })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Login failed" })
    }
}

export const signUpUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please provide a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()
        const token = createToken(newUser._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Sign up failed" })
    }
}