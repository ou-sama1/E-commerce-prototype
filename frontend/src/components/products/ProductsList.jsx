import { useSelector, useDispatch } from "react-redux";
import Product from "./Product.jsx";
import styles from "./ProductsList.module.css";

const ProductsList = () => {
    const products = useSelector(state => state.products.products);

    return(
        <ul className={styles.productsList}>
            {
                products.map(product => <Product key={product.id} product={product} />)
            }
        </ul>
    )
}

export default ProductsList;