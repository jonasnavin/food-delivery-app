import fs from 'fs'
import foodModel from "../models/foodModel.js"

export const addFood = async (req, res) => {

    try {
        let image_filename = req.file.filename
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        })
        await food.save()
        res.json({ success: true, message: "Food added successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const listFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const removeFood = async (req, res) => {

    try {
        const food = await foodModel.findById(req.query.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.query.id)
        res.json({ success: true, message: "Food removed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}