import Product from "./Product.jsx";
import styles from "./ProductsList.module.css";
import useProducts from "../../hooks/useProducts.js";
import Filter from "../filter/Filter.jsx";
import Cover from '../layout/Cover.jsx'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductSkeleton from "./skeleton/ProductSkeleton.jsx";
import Pagination from "../UI/Pagination.jsx";
import Carousel from "../posters/Carousel.jsx";

const ProductsList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {category, gender, price} = useSelector(state => state.filter);
    let {products, loading, error} = useProducts();

    const productsPerPage = 8;

    const MoveToNextPage = (nextPage) => {
        setCurrentPage(prev => nextPage)
    }

    //Reset the current page to 1 when filtered by either category, gender, price
    useEffect(() => {
        setCurrentPage(1)
    }, [category, gender, price])

    //Filter by category, gender, price
    const filteredProducts = products && products.filter(
                                (product) => (
                                    (product.category === (category || product.category))
                                    &&
                                    (product.gender === (gender || product.gender))
                                    &&
                                    ( price ? (product.price >= parseFloat(price.split("-")[0]) && product.price <= parseFloat(price.split("-")[1])) : true)                                
                                )
                            )
                            .map(product => <Product key={product.id} product={product} />)

    return(
        <div className={styles.container}>
            <Cover />
            <h2 className={styles.text}>Our products</h2>
            <div id="productsList" className={styles.subContainer}>
                <Filter />
                <ul className={styles.productsList}>

                    {
                        (loading && !products.length && !error) && Array(productsPerPage).fill(0).map((_ , i)=> <ProductSkeleton key={i} />)
                    }
                    {
                        (error && !products.length) && <p className={styles.noData}>An error occured.</p>
                    }
                    {
                        // Filter by page (pagination)
                        products && filteredProducts
                                    .filter(
                                            (_, i) => (i < (currentPage * productsPerPage) && i >= (currentPage * productsPerPage - productsPerPage))
                                        )
                    }
                    {
                        (!loading && !filteredProducts.length && !error) && <p className={styles.noData}>No matches found</p>
                    }

                </ul>
                
            </div>
            {
                products && <Pagination itemsCount={filteredProducts.length} itemsPerPage={productsPerPage} MoveToNextPage={MoveToNextPage} currentPage={currentPage} />
            }
            <Carousel />
        </div>
    )
}

export default ProductsList;