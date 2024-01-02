import styles from "./Cover.module.css";

const Cover = () => {

    return(
        <div className={styles.cover}>
            <img src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cover" className={styles.image} />
            <div className={styles.text}>
                <h1 className={styles.title}>Sneakers</h1>
                <p className={styles.para}>the world of athletic fashion</p>
            </div>
        </div>
    )
}

export default Cover;