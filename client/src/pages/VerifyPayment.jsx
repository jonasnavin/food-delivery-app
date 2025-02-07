import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import StoreContext from "../context/StoreContext"
import axios from "axios"

const VerifyPayment = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const { url } = useContext(StoreContext)

    const verifyPaymentUrl = `${url}/api/order/verify`

    const VerifyPayment = async () => {
        try {
            const response = await axios.post(verifyPaymentUrl, { success, orderId })
            if (response.data.success) {
                navigate('/myorders')
            }
            else {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { VerifyPayment() }, [])

    return (
        <div
            className={`min-h-[60vh] grid `}
        >
            <div
                className={`w-[100px] h-[100px] place-self-center border-[5px]
            border-gray-400 border-t-red-500 rounded-[50%] animate-spin`}
            ></div>
        </div>
    )
}

export default VerifyPayment