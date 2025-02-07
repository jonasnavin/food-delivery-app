import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div
            className={`flex justify-between items-center p-[8px_4%]`}
        >
            <div>
            <h1
                className={`w-[max(10%,_80px)] text-3xl font-bold text-red-500`}
            >
                CraveHub
            </h1>
            <p className={`text-gray-700 text-[15px]`}>Admin Panel</p>
            </div>
            <FaUserCircle className={`text-blue-950 max-md:text-[32px] text-[36px]`} />
        </div>
    )
}

export default Navbar