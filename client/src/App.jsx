import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CartPage from "./pages/CartPage"
import PlaceOrderPage from "./pages/PlaceOrderPage"
import HomePage from "./pages/HomePage"
import Footer from "./components/Footer"
import { useState } from "react"
import LoginPopUp from "./components/LoginPopUp"
import VerifyPayment from "./pages/VerifyPayment"
import MyOrdersPage from "./pages/MyOrdersPage"

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
      <div className="w-[80%] m-auto max-lg:w-[85%]">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
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