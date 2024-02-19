import './App.css'
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import ProductsList from "./components/products/ProductsList.jsx"

import Footer from './components/layout/Footer.jsx'
import Signup from './components/authentication/signup.jsx'
import Login from './components/authentication/Login.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from './store/userSlice.jsx'

function App() {
  const dispatch = useDispatch();
  const { userAutenticated } = userActions;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch(userAutenticated(user));
    }
  }, []);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
