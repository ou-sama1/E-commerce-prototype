import cartIcon from "../../images/icon-cart.svg";
import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CheckoutBtn from "./CheckoutBtn.jsx";

const Cart = ()=>{
    const cartItems = useSelector(state => state.cart.cart);
    const [display, setDisplay] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const toggleCart = () => {
        setDisplay(prev => !prev);
    }

    useEffect(() => {
        if(cartItems === null) return;
        setHighlight(true);
        const timer = setTimeout(()=>setHighlight(false), 300);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        return () => {clearTimeout(timer)};
    }, [cartItems])

    return(
        <>
            <button onClick={toggleCart} className={`${styles.btn} ${highlight ? styles.highlight : ""}`}>
                <img src={cartIcon} className={styles.icon} />
                {
                    cartItems?.length > 0 && <span className={styles.itemsCount}>{cartItems.length}</span>
                }
            </button>
            <Modal close={toggleCart} display={display}>
                <h3 className={styles.header}>Cart</h3>

                  {
                    cartItems?.length ? 
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