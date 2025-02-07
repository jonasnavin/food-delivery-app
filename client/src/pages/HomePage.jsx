import { useState } from "react"
import ExploreMenu from "../components/ExploreMenu"
import Header from "../components/Header"
import FoodDisplay from "../components/FoodDisplay"

const HomePage = () => {

  const [category, setCategory] = useState('all')

  return (
    <main>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </main>
  )
}

export default HomePage