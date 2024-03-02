import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import ProductsList from "./components/products/ProductsList.jsx"
import Footer from './components/layout/Footer.jsx'
import Signup from './components/authentication/signup.jsx'
import Login from './components/authentication/Login.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from './store/userSlice.jsx'
import ProductDetails from './components/products/ProductDetails.jsx'
import useGetFavorites from './hooks/useGetFavorites.js'
import ErrorPage from './components/layout/ErrorPage.jsx'
import ScrollToTop from './components/UI/ScrollToTop.jsx'
import Contact from './components/contact/Contact.jsx'
import About from './components/about/About.jsx'

function App() {
  const dispatch = useDispatch();
  const { userAutenticated, fillFav } = userActions;
  const user = useSelector(state => state.user.user);
  const { getUserFavorites, error, loading } = useGetFavorites();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch(userAutenticated(user));
      const getFavorites = async () => {
        const usersFavorites = await getUserFavorites(user);
        if(!error){
          dispatch(fillFav(usersFavorites));
        }
      }
      getFavorites();
    }
  }, []);

  return (
    <div className='appContainer'>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path="*" element={<ErrorPage error='Page not found.' />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
