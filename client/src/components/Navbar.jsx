import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { IoBagOutline } from "react-icons/io5"
import { IoIosLogOut } from "react-icons/io"
import { BsBasketFill } from "react-icons/bs"
import StoreContext from "../context/StoreContext"

const Navbar = () => {

    const [menu, setMenu] = useState("home")
    const { getTotalCartAmount, token, setToken, setCartItems, showLogin, setShowLogin } = useContext(StoreContext)
    const [viewAccount, setViewAccount] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        getTotalCartAmount()
        setCartItems([])
        setToken("")
        navigate('/')
    }

    const handleOrders = () => {
        navigate('/myorders')
        setViewAccount(false)
    }

    useEffect(() => {

    }, [viewAccount])

    const active = "pb-[2px] border-b-[2px] border-blue-950"

    return (
        <div className='py-[20px] flex justify-between
            items-center select-none border-b border-gray-400'>
            <Link to={'/'}>
                <h1
                    className={`text-[48px] max-md:text-[40px] text-red-500
                    font-[500] min-w-[150px]`}
                >
                    CraveHub
                </h1>
            </Link>
            <nav>
                <ul className={`flex gap-[20px] text-gray-600 text-[18px]
                    max-lg:text-[16px] max-sm:hidden`}>
                    <Link to={'/'}
                        onClick={() => setMenu("home")}
                        className={`${menu === "home" ? active : ""} cursor-pointer`}
                    >
                        Home
                    </Link>
                    <a
                        href="#explore-menu"
                        onClick={() => setMenu("dishes")}
                        className={`${menu === "dishes" ? active : ""} cursor-pointer`}
                    >
                        Dishes
                    </a>
                    <a
                        href="#footer"
                        onClick={() => setMenu("contact-us")}
                        className={`${menu === "contact-us" ? active : ""} cursor-pointer`}
                    >
                        Contact Us
                    </a>
                </ul>
            </nav>
            <div className={`flex items-center gap-[40px] max-lg:gap-[25px] max-sm:gap-[15px]`}>
                <div className="relative">
                    <Link to={'/cart'}>
                        <BsBasketFill className="fill-blue-950 text-[24px]" />
                    </Link>
                    <div
                        className={getTotalCartAmount() !== 0 ? `absolute min-w-[10px] min-h-[10px]
                        bg-red-500 rounded-[5px] -top-[6px] -right-[6px]` : ""}
                    ></div>
                </div>
                {!token ? (
                    <button
                        onClick={() => setShowLogin(true)}
                        disabled={showLogin}
                        className={`bg-tranparent text-[16px] text-gray-600
                        border border-[1px] border-red-600 p-[10px_30px]
                        rounded-[50px] hover:bg-red-100 active:bg-red-500
                        active:text-white transition duration-300
                        max-md:p-[8px_25px] max-sm:p-[6px_16px] outline-none
                        max-lg:text-[14px]`}
                    >
                        Sign In
                    </button>
                ) : (
                    <div
                        tabIndex={0}
                        onClick={() => setViewAccount(prev => !prev)}
                        onBlur={() => setViewAccount(false)}
                        className={`relative`}
                    >
                        <FaUserCircle
                            className={`text-blue-950  cursor-pointer max-md:text-[32px] text-[36px]`}
                        />
                        <ul
                            className={`w-[150px] absolute ${viewAccount ? "" : "hidden"}
                            right-0 z-10 flex flex-col gap-[10px] bg-red-50 py-[12px] px-[25px]
                            rounded-[4px] border border-red-500 outline-[2px] outline-white`}
                        >
                            <li
                                onClick={handleOrders}
                                className={`flex items-center gap-[10px] cursor-pointer
                                hover:text-red-500`}>
                                <IoBagOutline className={`text-[20px] text-red-500`} />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li
                                onClick={logout}
                                className={`flex items-center gap-[10px] cursor-pointer
                                hover:text-red-500`}>
                                <IoIosLogOut className={`text-[20px] text-red-500`} />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar