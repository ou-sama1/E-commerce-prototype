import styles from "./Cover.module.css";
import cover from '../../images/cover.png';
import smallCover from '../../images/smallCover.png';

const Cover = () => {

    return(
        <div className={styles.cover}>
            <img src={cover} alt="Cover" className={styles.image} />
            <img src={smallCover} alt="Cover" className={styles.smallImage} />
        </div>
    )
}

export default Cover;