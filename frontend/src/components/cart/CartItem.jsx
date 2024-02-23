import styles from "./CartItem.module.css"
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CartItem = (props) => {
    const {id, title, image, price, quantity} = props.item;
    const {incrementItem, decrementItem, deleteItem} = cartActions;
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(incrementItem(id));
    }
    
    const decrementHandler = () => {
        dispatch(decrementItem(id));
    }
    
    const deleteHandler = () => {
        dispatch(deleteItem(id));
    }

    return(
        <li className={styles.item}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.subContainer}>
                <div  className={styles.details}>
                    <h3 className={styles.title}>{title}</h3>
                    <span className={styles.price}>{price.toFixed(2)}$</span>
                </div>
                <div  className={styles.actions}>
                    <div className={styles.quantity}>
                        <button onClick={incrementHandler} className={styles.btn}>+</button>
                        <span> {quantity} </span>
                        <button onClick={decrementHandler} className={styles.btn}>-</button>
                    </div>
                    <button onClick={deleteHandler} className={styles.btnDel}><img src="/src/images/icon-delete.svg" /></button>
                </div>
            </div>
        </li>
    )
}

export default CartItem;