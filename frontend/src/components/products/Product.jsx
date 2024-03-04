import styles from "./Product.module.css";
import cartIcon from "../../images/icon-cart.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Heart from "../UI/Heart";

const Product = (props) => {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);
    const {id, title, image, description, price} = props.product;
    const {addToCart} = cartActions;
    const navigate = useNavigate();

    const addHandler = () => {
        dispatch(addToCart({id, title, image, price}));
        setAdded(true);
        const timer = setTimeout(() => {setAdded(false)}, 400);
        return () => clearTimeout(timer);
    }

    const goToDetail = (id) => {
        navigate(`/product/${id}`);
    }

    return(
        <li className={styles.product}>
            <Heart product={props.product} />
            <div className={styles.imgContainer}>
                <img src={image} alt={title} className={styles.image}  onClick={()=>goToDetail(id)}/>
            </div>
            <div className={styles.details}>

                <h2 className={styles.title}>{title}</h2>

                <p className={styles.description}>{description}</p>

                <span className={styles.price}>{price.toFixed(2)}$</span>

                <button onClick={addHandler} className={styles.add}>
                     {added ? "Added successfully" : <div><img src={cartIcon}/> Add to cart</div>  }
                </button>

            </div>
        </li>
    )
}

export default Product;