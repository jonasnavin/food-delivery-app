const Header = () => {
    return (
        <header
            id="header"
            className={`h-[34vw] mt-[30px] mx-auto bg-[url(/header_img.png)]
                        bg-no-repeat bg-contain relative`}
        >
            <div
                className={`absolute flex flex-col items-start
                gap-[1.5vw] max-w-[55%] max-md:max-w-[70%] max-sm:max-w-[100%]
                bottom-[10%] left-[6vw] animate-[fadeIn_3s]`}
            >
                <h2
                    className={`text-white font-[500] text-[max(4.5vw,_20px)]`}
                >
                    Order your <br /> favourite food here
                </h2>
                <p
                    className="text-white text-[max(1vw,_14px)] max-sm:hidden"
                >
                    Craving something delicious? Discover mouthwatering meals from your favorite restaurants, delivered fresh and fast with CraveHub.
                </p>
                <a
                    href="#explore-menu"
                    className={`text-gray-500 font-[500] py-[1vw] px-[2.3vw]
                    bg-white text-[max(1vw,_12px)] rounded-[50px]`}
                >
                    View Menu
                </a>
            </div>
        </header>
    )
}

export default Header