import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa6"

const Footer = () => {
    return (
        <footer
            id='footer'
            className={`text-gray-300 bg-stone-800 flex flex-col items-center
                gap-[20px] mt-[100px] pb-[20px] pt-[80px] px-[8vw]`}
        >
            <div
                className={`w-[100%] grid grid-cols-[2fr_1fr_1fr]
                    max-md:grid-cols-[1fr] gap-[80px] max-md:gap-[30px]`}
            >
                <div
                    className={`flex flex-col items-start gap-[20px]`}
                >
                    <Link to={'/'}>
                        <h2 className={`text-[40px] text-red-500 font-[500]`}
                        >CraveHub</h2>
                    </Link>
                    <p className='text-justify'>
                        Your trusted food delivery partner, connecting you to the best flavors from local eateries and beyond. Enjoy fast, fresh, and reliable service designed to satisfy your cravings anytime, anywhere. Discover taste, convenience, and happiness with every order at CraveHub.
                    </p>
                    <div className='flex gap-[15px]'>

                        <a
                            href='https://facebook.com'
                            target='_blank'
                            className={`w-[40px] h-[40px] flex items-center justify-center
                            cursor-pointer rounded-[50%] border-[1.5px] border-gray-200 rounded-[50%]`}
                        >
                            <FaFacebookF
                                className={`text-[18px] text-gray-200`}
                            />
                        </a>
                        <a
                            href='https://instagram.com'
                            target='_blank'
                            className={`w-[40px] h-[40px] flex items-center justify-center
                            cursor-pointer rounded-[50%] border-[1.5px] border-gray-200 rounded-[50%]`}
                        >
                            <FaInstagram
                                className={`text-[18px] text-gray-200`}
                            />
                        </a>
                        <a
                            href='https://linkedin.com'
                            target='_blank'
                            className={`w-[40px] h-[40px] flex items-center justify-center
                            cursor-pointer rounded-[50%] border-[1.5px] border-gray-200 rounded-[50%]`}
                        >
                            <FaLinkedinIn
                                className={`text-[18px] text-gray-200`}
                            />
                        </a>
                    </div>
                </div>
                <div
                    className={`flex flex-col items-start gap-[20px]`}
                >
                    <h2 className='text-[24px] text-white'>Company</h2>
                    <ul>
                        <li className='mb-[8px] cursor-pointer'>Home</li>
                        <li className='mb-[8px] cursor-pointer'>About us</li>
                        <li className='mb-[8px] cursor-pointer'>Delivery</li>
                        <li className='mb-[8px] cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>
                <div
                    className={`flex flex-col items-start gap-[20px]`}
                >
                    <h2 className='text-[24px] text-white'>Get In Touch</h2>
                    <ul>
                        <li className='mb-[8px] cursor-pointer'>+91 9789534***</li>
                        <li className='mb-[8px] cursor-pointer'>jonasnavin@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className='w-[100%] h-[2px] my-[20px] bg-gray-300 border-none' />
            <p>Copyright 2025 &copy; CraveHub.com - All Right Reserved.</p>
        </footer>
    )
}

export default Footer