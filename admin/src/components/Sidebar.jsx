import { NavLink } from "react-router-dom"
import { BsPlusCircle } from "react-icons/bs"
import { CgNotes } from "react-icons/cg"
import { IoBagCheckSharp } from "react-icons/io5"

const Sidebar = () => {

    const navLinkStyle = `flex items-center gap-[12px] border-[1px] border-gray-300
                        border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer`

    const activeStyle = `bg-red-50 border-red-500`

    return (
        <div
            className={`w-[18%] min-h-[100vh] border-[1.5px] border-gray-300 bt-0 text-[max(1.2vw,_12px)]`}
        >
            <div
                className={`pt-[50px] pl-[20%] flex flex-col gap-[20px]`}
            >
                <NavLink
                    to={'/'}
                    className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}
                >
                    <BsPlusCircle className={`text-[28px]`} />
                    <p className={`max-md:hidden`}>Add Items</p>
                </NavLink>
                <NavLink
                    to={'/list-food'}
                    className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}
                >
                    <CgNotes className={`text-[28px]`} />
                    {/* <img src={assets.order_icon} alt="" /> */}
                    <p className={`max-md:hidden`}>List Items</p>
                </NavLink>
                <NavLink
                    to={'/order-food'}
                    className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}
                >
                    <IoBagCheckSharp className={`text-[28px]`} />
                    {/* <img src={assets.order_icon} alt="" /> */}
                    <p className={`max-md:hidden`}>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar