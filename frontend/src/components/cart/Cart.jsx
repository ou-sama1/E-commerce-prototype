import cartIcon from "../../images/icon-cart.svg";
import styles from "./Cart.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CheckoutBtn from "./CheckoutBtn.jsx";

const Cart = ()=>{
    const cartItems = useSelector(state => state.products.cart);
    const [display, setDisplay] = useState(false);
    const toggleCart = () => {
        setDisplay(prev => !prev);
    }

    return(
        <>
            <button onClick={toggleCart} className={styles.btn}>
                <img src={cartIcon} className={styles.icon} />
                {
                    cartItems.length > 0 && <span className={styles.itemsCount}>{cartItems.length}</span>
                }
            </button>
            <Modal close={toggleCart} display={display}>
                <h3 className={styles.header}>Cart</h3>

                  {
                    cartItems.length ? 
                    <div className={styles.content}>
                        <ul className={styles.itemsList}>
                            {
                                cartItems.map(item => <CartItem key={item.id} item={item} />)
                            }
                        </ul>
                        <h3 className={styles.total}>Total :  
                            <span> 
                                { cartItems.reduce((total, curr) => total + curr.price * curr.quantity, 0).toFixed(2) }$
                            </span>
                        </h3>
                        <CheckoutBtn />
                    </div>
                    :
                    <p>Cart is empty.</p>
                  }

                
            </Modal>
        </>

    )
}

export default Cart;