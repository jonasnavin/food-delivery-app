import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'

const ListFood = ({ url }) => {

  const getFoodUrl = `${url}/api/food/list-foods`
  const removeFoodUrl = `${url}/api/food/remove-food`

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(getFoodUrl)
      setList(response.data.data.reverse())
    }
    catch (error) {
      console.log(error)
    }
  }

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(removeFoodUrl, { params: { id } })
      await fetchList()
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className={`w-[70%] mx-auto py-[50px]`}>
      <h3 className={`font-bold text-xl mb-[30px]`}>Menu</h3>
      <div>
        <div
          className={`grid grid-cols-[1fr_2fr_1fr_1fr_.5fr] max-sm:grid-cols-[1fr_3fr_1fr]
            max-sm:gap-[15px] max-sm:hidden items-center gap-[10px] p-[12px_15px]
            border border-gray-200 text-[13px] bg-gray-200`}
        >
          <p className={`font-[700]`}>Image</p>
          <p className={`font-[700]`}>Name</p>
          <p className={`font-[700]`}>Category</p>
          <p className={`font-[700]`}>Price</p>
          <p className={`font-[700]`}>Remove</p>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-[1fr_2fr_1fr_1fr_.5fr] max-sm:grid-cols-[1fr_3fr_1fr]
            max-sm:gap-[15px] items-center gap-[10px] p-[12px_15px] border border-gray-200 text-[13px]`}
            >
              <img src={`${url}/images/${item.image}`} alt={item.name} className={`w-[50px]`} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>&#8377; {item.price}</p>
              <p
                onClick={() => removeFood(item._id)}
                className={`cursor-pointer text-center`}
              >
                x
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListFood