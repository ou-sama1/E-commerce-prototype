import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import Cart from "../cart/Cart.jsx"
import Profile from "../UI/Profile.jsx"

const Navbar = ()=>{

    return(
        <nav className={styles.navbar}>
            <div className={styles.links}>
                <span className={styles.brand}>Sneakers</span>
                <NavLink to="/" className={styles.link}>Collections</NavLink>
                <NavLink to="/men" className={styles.link}>Men</NavLink>
                <NavLink to="/women" className={styles.link}>Women</NavLink>
                <NavLink to="/about" className={styles.link}>About</NavLink>
                <NavLink to="/contact" className={styles.link}>Contact</NavLink>
            </div>
            <div className={styles.cart_profile}>
                <Cart/>
                <Profile/>
            </div>
        </nav>
    )
}

export default Navbar;