import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CartPage from "./pages/CartPage"
import PlaceOrderPage from "./pages/PlaceOrderPage"
import HomePage from "./pages/HomePage"
import Footer from "./components/Footer"
import LoginPopUp from "./components/LoginPopUp"
import VerifyPayment from "./pages/VerifyPayment"
import MyOrdersPage from "./pages/MyOrdersPage"
import { useContext } from "react"
import StoreContext from "./context/StoreContext"

const App = () => {

  const { showLogin } = useContext(StoreContext)

  return (
    <>
      {showLogin ? <LoginPopUp /> : null}
      <div className="w-[80%] m-auto max-lg:w-[85%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<PlaceOrderPage />} />
          <Route path="/verify" element={<VerifyPayment />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App