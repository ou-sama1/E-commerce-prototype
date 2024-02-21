import styles from "./ProductDetailsSkeleton.module.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton  from 'react-loading-skeleton';

const ProductDetailsSkeleton = () => {

    return(
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <Skeleton width="100%" height="100%" />
                </div>
                <div className={styles.details}>
                    <h2 className={styles.title}><Skeleton width="300px" /></h2>
                    <p className={styles.description}><Skeleton width="80%" /></p>
                    <div className={styles.separator}></div>
                    <span className={styles.price}><Skeleton count={1} /><Skeleton count={1} /></span>
                    <div className={styles.btnContainer}>
                        <button className={styles.quantityBtn}><Skeleton count={1} /></button>
                        <span><Skeleton count={1} /></span>
                        <button className={styles.quantityBtn}><Skeleton count={1} /></button>
                        <button className={styles.addBtn}><Skeleton count={1} /></button>
                    </div>
                </div>
            </div>
            )
};

export default ProductDetailsSkeleton;