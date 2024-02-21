import styles from "./ProductSkeleton.module.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';

const ProductSkeleton = () => {

    return(
            <div className={styles.productSkeleton}>
                <div className={styles.imgSkeleton}>
                    <Skeleton width="100%" height="100%" />
                </div>
                <h2 className={styles.titleSkeleton}><Skeleton /></h2>
                <p className={styles.paraSkeleton}><Skeleton count={3} /></p>
                <p className={styles.paraSkeleton}><Skeleton width="80%" /></p>
                <div className={styles.btnSkeleton}><Skeleton height="100%" /></div>
            </div>
            )
};

export default ProductSkeleton;