import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import Cart from "../cart/Cart.jsx"
import ProfileIcon from "../profile/ProfileIcon.jsx"
import { useSelector } from "react-redux"
import Logout from "../authentication/Logout.jsx"
import { useState } from "react"
import iconClose from '../../images/icon-close.svg'
import iconMenu from '../../images/icon-menu.svg'

const Navbar = ()=>{
    const user = useSelector(state => state.user);
    const[visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(prev=>!prev);
    }

    return(
        <nav className={`${styles.navbar} `}>
            <div className={`${styles.links} ${!visible ? styles.hideNav : ''}`}>
                <span className={styles.brand}>Sneakers</span>
                <NavLink to="/" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ') } onClick={toggleVisibility}>Collections</NavLink>
                <NavLink to="/about" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ') } onClick={toggleVisibility}>About</NavLink>
                <NavLink to="/contact" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ') } onClick={toggleVisibility}>Contact</NavLink>
            </div>
            <div className={`${styles.cart_profile} ${!visible ? styles.hideNav : ''}`}>
                {!user.user && <NavLink to="/signup" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')} onClick={toggleVisibility} >Signup</NavLink>}
                {!user.user && <NavLink to="/login" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')} onClick={toggleVisibility} >Login</NavLink>}
                {user.user && <ProfileIcon user={user.user} favorites={user.favorites} onClick={toggleVisibility} />}
                <Cart/>
                {user.user && <Logout />}
            </div>
            <button className={styles.btnShow} onClick={toggleVisibility}>{visible ? <img src={iconClose} /> : <img src={iconMenu} />}</button>
            <span className={`${styles.cart} ${visible ? styles.hideCart : ''}`}>
                <Cart/>
            </span>    
        </nav>
    )
}

export default Navbar;