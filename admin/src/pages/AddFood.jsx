import { useState } from "react"
import { toast } from 'react-toastify'
import { IoCloudUploadSharp } from "react-icons/io5"
import axios from 'axios'

const AddFood = ({ url }) => {

    const addFoodUrl = `${url}/api/food/add-food`

    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (!data.name || !data.description || !data.price || !image) {
            return toast.error("All fields are required.")
        }

        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))
        formData.append("image", image)
        try {
            const response = await axios.post(addFoodUrl, formData)
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        } catch (error) {
            toast.error("Server Error")
        }
    }

    const flexColStyle = `flex flex-col gap-[10px]`

    return (
        <div
            className={`w-[70%] ml-[max(5vw,_25px)] py-[50px] text-gray-500 text-[16px]`}>
            <h3 className={`font-bold text-black text-xl mb-[30px]`}
            >
                Add Food
            </h3>
            <form
                onSubmit={onSubmitHandler}
                className={`${flexColStyle} gap-[20px]`}
            >
                <div
                    className={`${flexColStyle}`}
                >
                    <p>Upload Image</p>
                    <label htmlFor="image" className={`w-[120px] cursor-pointer`}>
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="uploaded image"
                            />
                        ) : (

                            <div
                                className={`border border-dashed h-[70px] flex flex-col
                                items-center justify-center bg-gray-100`}
                            >
                                <IoCloudUploadSharp className={`text-gray-500 text-[28px]`} />
                                <p className={`text-[14px]`}>Upload</p>
                            </div>
                        )}
                    </label>
                    <input
                        onChange={e => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                    />
                </div>
                <div className={`${flexColStyle} w-[max(40%,_250px)]`}>
                    <p>Product Name</p>
                    <input
                        value={data.name}
                        onChange={onChangeHandler}
                        autoComplete="off"
                        className={`p-[10px] outline-none border-[1px] border-gray-400`}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>
                <div className={`${flexColStyle} w-[max(40%,_250px)]`}>
                    <p>Product Description</p>
                    <textarea
                        value={data.description}
                        onChange={onChangeHandler}
                        autoComplete="off"
                        className={`p-[10px] outline-none border-[1px] border-gray-400`}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                    />
                </div>
                <div
                    className={`flex gap-[30px] max-md:flex-col`}
                >
                    <div className={`${flexColStyle}`}>
                        <p>Product Category</p>
                        <select
                            value={data.category}
                            onChange={onChangeHandler}
                            className={`max-w-[120px] p-[10px] outline-none border-[1px]
                                border-gray-400 cursor-pointer`}
                            name="category"
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div
                        className={`${flexColStyle}`}
                    >
                        <p>Product Price</p>
                        <input
                            value={data.price}
                            onChange={onChangeHandler}
                            className={`max-w-[120px] p-[10px] outline-none border-[1px] border-gray-400`}
                            type="number"
                            name="price"
                            placeholder="&#8377; 0"
                        />
                    </div>
                </div>
                <button
                    className={`max-w-[120px] border-none p-[10px] bg-black text-white cursor-pointer`}
                    type="submit"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddFood