import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import AddFood from "./pages/AddFood"
import ListFood from "./pages/ListFood"
import OrderFood from "./pages/OrderFood"
import { Bounce, ToastContainer } from 'react-toastify'

const App = () => {

  const url = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://cravehub-backend.onrender.com"

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <hr />
      <div
        className={`flex`}
      >
        <Sidebar />
        <Routes>
          <Route path="/" element={<AddFood url={url} />} />
          <Route path="/list-food" element={<ListFood url={url} />} />
          <Route path="/order-food" element={<OrderFood url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App