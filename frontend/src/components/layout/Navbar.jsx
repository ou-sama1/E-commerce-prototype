import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import Cart from "../cart/Cart.jsx"
import ProfileIcon from "../profile/ProfileIcon.jsx"
import useLogout from "../../hooks/useLogout.js"
import { useSelector } from "react-redux"

const Navbar = ()=>{
    const user = useSelector(state => state.user.user);
    console.log(user)
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    }

    return(
        <nav className={styles.navbar}>
            <div className={styles.links}>
                <span className={styles.brand}>Sneakers</span>
                <NavLink to="/" className={styles.link}>Collections</NavLink>
                <NavLink to="/about" className={styles.link}>About</NavLink>
                <NavLink to="/contact" className={styles.link}>Contact</NavLink>
            </div>
            <div className={styles.cart_profile}>
                {!user && <NavLink to="/signup" className={styles.link}>Signup</NavLink>}
                {!user && <NavLink to="/login" className={styles.link}>Login</NavLink>}
                {user && <ProfileIcon user={user} />}
                <Cart/>
                {user && <button className={styles.logout} onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}

export default Navbar;