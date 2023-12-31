import styles from "./CartItem.module.css"
import { useDispatch } from "react-redux";
import { productsActions } from "../../store/productsSlice";

const CartItem = (props) => {
    const {id, title, image, price, quantity} = props.item;
    const {incrementItem, decrementItem, deleteItem} = productsActions;
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
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.price}>{price}</span>
            <div className={styles.quantity}>
                <button onClick={incrementHandler} className={styles.btn}>+</button>
                <span> {quantity} </span>
                <button onClick={decrementHandler} className={styles.btn}>-</button>
            </div>
            <button onClick={deleteHandler} className={styles.btnDel}><img src="./src/images/icon-delete.svg" /></button>
        </li>
    )
}

export default CartItem;