import { useContext, useState } from 'react'
import { GiKnifeFork } from "react-icons/gi"
import axios from 'axios'
import StoreContext from '../context/StoreContext'

const LoginPopUp = () => {

    const { url, setToken, loadCartData, setShowLogin } = useContext(StoreContext)

    const [status, setStatus] = useState('Login')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(prevStatus => ({ ...prevStatus, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url
        if (status === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/signup"
        }
        try {
            const response = await axios.post(newUrl, data)
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false)
                await loadCartData(response.data.token)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const inputStyle = `outline-none border-[1px] border-gray-400 p-[10px] rounded-[4px]`

    return (
        <div className={`absolute z-10 w-[100%] h-[100%] bg-black/40 grid`}>
            <form
                onSubmit={onLogin}
                className={`place-self-center w-[max(25vw,_330px)]
                text-gray-400 bg-white flex flex-col gap-[25px]
                p-[25px_30px] rounded-[8px] text-[14px] animate-[fadeIn_.5s]`}>
                <div className={`flex items-center justify-between`}>
                    <h2 className='text-2xl font-[600] text-black'>{status}</h2>
                    <GiKnifeFork
                        className='text-[24px] text-gray-700 cursor-pointer'
                        onClick={() => setShowLogin(false)}
                    />
                </div>
                <div className={`flex flex-col gap-[20px]`}>
                    {status === "Sign Up" ? (
                        <input
                            className={inputStyle}
                            value={data.name}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='Name'
                            name="name"
                            required
                        />
                    ) : null}
                    <input
                        className={inputStyle}
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder='Email'
                        name="email"
                        required
                    />
                    <input
                        className={inputStyle}
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder='Password'
                        name="password"
                        required
                    />
                </div>
                <div className={`flex items-start gap-[8px]`}>
                    <input
                        className={`mt-[5px] `}
                        type="checkbox"
                        id='condition-terms'
                        required
                    />
                    <label htmlFor='condition-terms'>
                        By continuing, I agree to the terms of use & privacy policy.
                    </label>
                </div>
                <button
                    type='submit'
                    className={`p-[10px] rounded-[4px] text-white
                        bg-red-500 text-[15px] cursor-pointer`}
                >
                    {status === "Sign Up" ? "Create Account" : "Login"}
                </button>
                {status === "Sign Up" ? (
                    <p>
                        Already have an account? &nbsp;
                        <span
                            className={`text-red-500 font-[500] cursor-pointer`}
                            onClick={() => setStatus("Login")}
                        >
                            Login
                        </span>
                    </p>
                ) : (
                    <p>
                        Don't have an account? &nbsp;
                        <span
                            className={`text-red-500 font-[500] cursor-pointer`}
                            onClick={() => setStatus("Sign Up")}
                        >
                            Sign Up
                        </span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginPopUp