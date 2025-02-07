import { menu_list } from '../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

    return (
        <div
            id='explore-menu'
            className={`flex flex-col gap-[20px] pt-[50px]`}
        >
            <h1
                className={`text-[32px] font-[600] text-gray-900`}
            >
                Explore our menu
            </h1>
            <p
                className={`max-w-[100%] max-sm:text-[16px] text-neutral-700 text-[18px]`}
            >
                Explore a wide variety of delicious dishes crafted to satisfy every craving. From local favorites to global cuisines, find your next meal at CraveHub.
            </p>
            <div
                className={`flex justify-between items-center text-center
                gap-[30px] my-[20px] mx-[0px] overflow-x-scroll hide-scrollbar `}
            >
                {menu_list.map((item, index) => {
                    return (
                        <div key={index}
                            onClick={() => setCategory(prev => prev === item.menu_name ? "all" : item.menu_name)}
                            className={`w-[7.5vw] min-w-[80px] cursor-pointer
                            rounded-[50%] transition duration-200`}
                        >
                            <img
                                className={category === item.menu_name ?
                                    `border-[4px] border-red-500 p-[2px] rounded-[50%]` : ""}
                                src={item.menu_image}
                                alt={item.menu_name}
                            />
                            <p
                                className={`mt-[10px] text-neutral-600 text-[18px]`}
                            >{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className={`my-[10px] h-[2px] bg-gray-300 border-none`} />
        </div>
    )
}

export default ExploreMenu