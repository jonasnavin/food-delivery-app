import express from "express"
import multer from "multer"
import { addFood, listFoods, removeFood } from "../controllers/foodController.js"

const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

foodRouter.post('/add-food', upload.single('image'), addFood)

foodRouter.get('/list-foods', listFoods)

foodRouter.delete('/remove-food', removeFood)

export default foodRouter

