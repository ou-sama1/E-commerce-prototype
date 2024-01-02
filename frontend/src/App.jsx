import './App.css'
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import ProductsList from "./components/products/ProductsList.jsx"
import Cover from './components/layout/Cover.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {

  return (
    <>
      <Navbar/>
      <Cover />
      <Routes>
        <Route path='/' element={<ProductsList />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
