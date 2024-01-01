import styles from "./Product.module.css";
import cartIcon from "../../images/icon-cart.svg";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const Product = (props) => {
    const dispatch = useDispatch();
    const {id, title, image, description, price} = props.product;
    const {addToCart} = cartActions;

    const addHandler = () => {
        dispatch(addToCart({id, title, image, price}))
    }

    return(
        <li className={styles.product}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.details}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <span className={styles.price}>{price.toFixed(2)}$</span>
                <button onClick={addHandler} className={styles.add}>
                    <img src={cartIcon}/> Add to cart
                </button>
            </div>
        </li>
    )
}

export default Product;