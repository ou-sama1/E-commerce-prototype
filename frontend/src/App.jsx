import './App.css'
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import ProductsList from "./components/products/ProductsList.jsx"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductsList />} />
      </Routes>
    </>
  )
}

export default App
