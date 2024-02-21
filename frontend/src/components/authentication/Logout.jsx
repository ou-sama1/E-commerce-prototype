import useLogout from "../../hooks/useLogout.js"
import { useSelector } from "react-redux"
import styles from './Logout.module.css'

const Logout = () => {
    const user = useSelector(state => state.user.user);
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }

    return(
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
    )
}

export default Logout;