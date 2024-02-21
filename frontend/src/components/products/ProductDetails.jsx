import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.css'
import useProduct from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import cartIcon from '../../images/icon-cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import favIcon from '../../images/icon-fav.svg'
import ActiveFavIcon from '../../images/icon-fav-active.svg'
import { userActions } from '../../store/userSlice';
import useFavorites from '../../hooks/useFavorites';
import ProductDetailsSkeleton from './skeleton/ProductDetailsSkeleton';

const ProductDetails = () => {
    const favorites = useSelector(state => state.user.favorites);
    const { getProduct, loading, error } = useProduct();
    const { HandleFavorites, isError, isLoading } = useFavorites();
    const { id } = useParams();
    const[product, setProduct] = useState({});
    const[quantity, setQuantity] = useState(1);
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { incrementItemBy } = cartActions;
    const { addToFav } = userActions;
    const[hearted, setHearted] = useState(false);
    const[highlight, setHighlight] = useState(false);

    useEffect( () => {
        const getOneProduct = async () => {
            const product = await getProduct(id);
            setProduct(product);
        }
        getOneProduct();
    }, [])

    useEffect( () => {
        const alreadyHearted = favorites.filter(item => item.id === parseInt(id));
        if(alreadyHearted.length > 0){
            setHearted(true);
        }
    }, [favorites])

    useEffect(() => {
        if(!hearted) return;
        setHighlight(true);
        const timer = setTimeout(()=>setHighlight(false), 300);
        return () => {clearTimeout(timer)};
    }, [hearted])

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

    const heartHandle = async () => {
        if(user && !isLoading){
            await HandleFavorites(id);
            if(!isError){
            dispatch(addToFav(product));
            setHearted(prev => !prev);
            }
        }
        if(!user) navigate('/signup');
    }

    
    const template = <div className={styles.container}>
                        <span onClick={heartHandle} className={styles.heart}>
                            <img src={hearted && !isError ? ActiveFavIcon : favIcon} className={highlight ? styles.highlight : ''} />
                        </span>
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
            {error && <p>An error occured</p>} 
            {!loading && !error && template}
        </>
    )
}

export default ProductDetails;