import cartIcon from "../images/icon-cart.svg";
import styles from "./Cart.module.css";

const Cart = ()=>{

    return(
        <button className={styles.btn}>
            <img src={cartIcon} className={styles.icon} />
        </button>
    )
}

export default Cart;