import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFavorites from "../../hooks/useFavorites";
import styles from "./Heart.module.css";
import favIcon from '../../images/icon-fav.svg'
import ActiveFavIcon from '../../images/icon-fav-active.svg'
import { useNavigate } from "react-router-dom";
import { userActions } from '../../store/userSlice';

const Heart = (props) => {
    const { product } = props;

    const user = useSelector(state => state.user.user);
    const favorites = useSelector(state => state.user.favorites);

    const { HandleFavorites, isError, isLoading } = useFavorites();

    const { addToFav } = userActions;

    const[hearted, setHearted] = useState(false);
    const[highlight, setHighlight] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        const alreadyHearted = favorites.filter(item => item.id === parseInt(product.id));
        if(alreadyHearted.length > 0){
            setHearted(true);
        }
        else setHearted(false)
    }, [favorites])

    useEffect(() => {
        if(!hearted) return;
        setHighlight(true);
        const timer = setTimeout(()=>setHighlight(false), 300);
        return () => {clearTimeout(timer)};
    }, [hearted])

    const heartHandle = async () => {
        if(user && !isLoading){
            await HandleFavorites(product.id);
            if(!isError){
            dispatch(addToFav(product));
            setHearted(prev => !prev);
            }
        }
        if(!user) navigate('/login');
    }

    return(
        <span onClick={heartHandle} className={styles.heart}>
            <img src={hearted && !isError ? ActiveFavIcon : favIcon} className={highlight ? styles.highlight : ''} />
        </span>
    )
}

export default Heart;