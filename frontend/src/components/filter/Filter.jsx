import styles from "./Filter.module.css";
import { filterActions } from "../../store/filterSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Filter = () => {
    const dispatch = useDispatch();
    const {setCategory, setGender, setPrice} = filterActions;
    
    const categoryHandler = (e) => {
        dispatch(setCategory(e.target.value))
    };
    const genderHandler = (e) => {
        dispatch(setGender(e.target.value))
    };
    const priceHandler = (e) => {
        dispatch(setPrice(e.target.value))
    };

    useEffect(() => {
            dispatch(setCategory(""))
            dispatch(setGender(""))
            dispatch(setPrice(""))
 
    }, [])

    return(
        <div className={styles.filter}>

            <h3 className={styles.header}>Filter</h3>

            <div className={styles.layers}>
                <div className={styles.layer}>
                    <h4 className={styles.type}>By category</h4>

                    <input type="radio" value="" name="category" defaultChecked onClick={categoryHandler} />
                    <label>All </label>
                    
                    <input type="radio" value="clothing" name="category" onClick={categoryHandler} />
                    <label>Clothing </label>
                    
                    <input type="radio" value="shoes" name="category" onClick={categoryHandler} />
                    <label>Shoes</label>
                </div>
                
                <div className={styles.layer}>
                    <h4 className={styles.type}>By gender</h4>

                    <input type="radio" value="" name="gender" defaultChecked onClick={genderHandler} />
                    <label>All </label>
                    
                    <input type="radio" value="male" name="gender" onClick={genderHandler} />
                    <label>Male </label>
                    
                    <input type="radio" value="female" name="gender" onClick={genderHandler} />
                    <label>Female</label>
                </div>
                
                <div className={`${styles.layer} ${styles.prices}`}>
                    <h4 className={styles.type}>By price</h4>
                    <div className={styles.price}>
                        <input type="radio" value="" name="price" defaultChecked onClick={priceHandler} />
                        <label>All </label>
                    </div>

                    <div className={styles.price}>
                    <input type="radio" value="500-999999" name="price" onClick={priceHandler} />
                    <label>+500$ </label>
                    </div>

                    <div className={styles.price}>
                    <input type="radio" value="300-499" name="price" onClick={priceHandler} />
                    <label>300 - 499$ </label>
                    </div>

                    <div className={styles.price}>
                    <input type="radio" value="100-299" name="price" onClick={priceHandler} />
                    <label>100 - 299$</label>
                    </div>

                    <div className={styles.price}>
                    <input type="radio" value="50-99" name="price" onClick={priceHandler} />
                    <label>50 - 99$</label>
                    </div>
                    
                    <div className={styles.price}>
                    <input type="radio" value="0-49" name="price" onClick={priceHandler} />
                    <label>less than 50$</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;