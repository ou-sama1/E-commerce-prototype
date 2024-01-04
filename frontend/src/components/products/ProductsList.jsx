import Product from "./Product.jsx";
import styles from "./ProductsList.module.css";
import useProducts from "../../hooks/useProducts.js";
import Filter from "../filter/Filter.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductSkeleton from "./skeleton/ProductSkeleton.jsx";

const ProductsList = (props) => {
    const {category, gender, price} = useSelector(state => state.filter);
    let {products, loading, error} = useProducts();

    return(
        <div className={styles.container}>
            <Filter />
            <ul className={styles.productsList}>

                {
                    (loading && !products.length && !error) && Array(25).fill(0).map(_ => <ProductSkeleton />)
                }
                {
                    (error && !products.length) && "An error occured."
                }
                {
                    products && products
                        .filter(
                            product => (
                                (product.category === (category || product.category))
                                &&
                                (product.gender === (gender || product.gender))
                                &&
                                ( price ? (product.price >= parseFloat(price.split("-")[0]) && product.price <= parseFloat(price.split("-")[1])) : true)
                            )
                        )
                        .map(product => <Product key={product.id} product={product} />)
                }

            </ul>
        </div>
    )
}

export default ProductsList;