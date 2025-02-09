import { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div
            className={`mt-[30px]`}
        >
            <h2
                className={`font-[600] text-[26px]`}
            >Top dishes near you</h2>
            <div
                className={`grid min-2xl:grid-cols-4 grid-cols-3 max-lg:grid-cols-3
                    max-md:grid-cols-2 max-sm:grid-cols-1 mt-[30px] gap-y-[50px] gap-x-[30px]`}
            >
                {food_list.map((item, index) => {
                    if (category === "all" || category === item.category) {
                        return (
                            <FoodItem key={index} item={item} />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay