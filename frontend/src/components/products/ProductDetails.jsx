import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css'
import useProduct from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import cartIcon from '../../images/icon-cart.svg';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import ProductDetailsSkeleton from './skeleton/ProductDetailsSkeleton';
import Heart from '../UI/Heart';
import ErrorPage from '../layout/ErrorPage';

const ProductDetails = () => {
    const { getProduct, loading, error } = useProduct();

    const[product, setProduct] = useState({});
    const[quantity, setQuantity] = useState(1);

    const { id } = useParams();
    const dispatch = useDispatch();

    const { incrementItemBy } = cartActions;

    useEffect( () => {
        const getOneProduct = async () => {
            const product = await getProduct(id);
            setProduct(product);
        }
        getOneProduct();
    }, [])

    const incrementHandler = () => {
        setQuantity(prev => prev + 1)
    }
    const decrementHandler = () => {
        if(quantity > 1){
            setQuantity(prev => prev - 1)
        }
    }
    const addToCartHandler = () => {
        dispatch(incrementItemBy({product, quantity}))
        setQuantity(1);
    }
    
    const template = <div className={styles.container}>
                        <Heart product={product} />
                        <div className={styles.imgContainer}>
                            <img src={product?.image} alt={product?.title} className={styles.image} />
                        </div>
                        <div className={styles.details}>
                            <h2 className={styles.title}>{product?.title}</h2>
                            <p className={styles.description}>{product?.description}</p>
                            <div className={styles.separator}></div>
                            <span className={styles.price}>{product?.price?.toFixed(2)}$</span>
                            <div className={styles.btnContainer}>
                                <button className={styles.quantityBtn} onClick={incrementHandler}>+</button>
                                <span>{quantity}</span>
                                <button className={styles.quantityBtn} onClick={decrementHandler}>-</button>
                                <button className={styles.addBtn} onClick={addToCartHandler}><img src={cartIcon} /> Add to cart</button>
                            </div>
                        </div>
                    </div>
    
    return(
        <>
            {loading && <ProductDetailsSkeleton />}
            {error && <ErrorPage error="An error occured." />} 
            {!loading && !error && template}
        </>
    )
}

export default ProductDetails;