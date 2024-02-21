import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import Cart from "../cart/Cart.jsx"
import ProfileIcon from "../profile/ProfileIcon.jsx"
import { useSelector } from "react-redux"
import Logout from "../authentication/Logout.jsx"

const Navbar = ()=>{
    const user = useSelector(state => state.user);

    return(
        <nav className={styles.navbar}>
            <div className={styles.links}>
                <span className={styles.brand}>Sneakers</span>
                <NavLink to="/" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')}>Collections</NavLink>
                <NavLink to="/about" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')}>About</NavLink>
                <NavLink to="/contact" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')}>Contact</NavLink>
            </div>
            <div className={styles.cart_profile}>
                {!user.user && <NavLink to="/signup" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')}>Signup</NavLink>}
                {!user.user && <NavLink to="/login" className={({isActive})=> [isActive ? styles.active : '', styles.link ].join(' ')}>Login</NavLink>}
                {user.user && <ProfileIcon user={user.user} favorites={user.favorites}  />}
                <Cart/>
                {user.user && <Logout />}
            </div>
        </nav>
    )
}

export default Navbar;