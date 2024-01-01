import { useSelector, useDispatch } from "react-redux";
import Product from "./Product.jsx";
import styles from "./ProductsList.module.css";
import useProducts from "../../hooks/useProducts.js";

const ProductsList = () => {
    const products = useProducts();

    return(
        <ul className={styles.productsList}>
            {
                products.map(product => <Product key={product.id} product={product} />)
            }
        </ul>
    )
}

export default ProductsList;