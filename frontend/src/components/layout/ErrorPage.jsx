import styles from "./ErrorPage.module.css";

const ErrorPage = (props) => {
    const { error } = props || { error : 'Page not found.' };
    return(
        <div className={styles.container}>
            <h1>404</h1>
            <p>{error}</p>
            <a href="/">Go back</a>
        </div>
    )
}

export default ErrorPage;