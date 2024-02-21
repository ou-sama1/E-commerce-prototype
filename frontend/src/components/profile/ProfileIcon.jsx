import { useEffect, useState } from 'react';
import profileIcon from '../../images/icon-profile.svg';
import Modal from '../UI/Modal';
import styles from './ProfileIcon.module.css';
import useGetFavorites from '../../hooks/useGetFavorites';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const ProfileIcon = (props) => {
    const { username, email } = props.user || {username : "", email : ""};
    const favorites = props.favorites;

    const [display, setDisplay] = useState(false);

    const toggleCart = () => {
        setDisplay(prev => !prev);
    }

    const userIcon = <div className={styles.container}>
                            <button className={styles.profileIcon} onClick={toggleCart} ><img src={profileIcon} /></button>
                            <span>{username}</span>
                        </div>

    const userDetails = <><div className={styles.userDetails}>
                            <img src={profileIcon} className={styles.profileIconDetail}/>
                            <div className={styles.details}>
                                <span>{username}</span>
                                <span>{email}</span>
                            </div>
                        </div>
                        <h3  className={styles.header}>Favorites :</h3>
                        <ul className={styles.favorites}>
                            {
                                favorites.length   ? favorites.map(fav => <li key={fav.id} className={styles.favItem}>
                                                                    <img src={fav.image} className={styles.image} />
                                                                    <h3 className={styles.title}>{fav.title}</h3>
                                                                </li>)
                                            : <p>No items were added.</p>
                            }
                        </ul></>

    return(
        <>
            {
                props.user && userIcon
            }    
            <Modal close={toggleCart} display={display}>
                <h3 className={styles.header}>Profile</h3>
                {
                    props.user && userDetails
                }
            </Modal>        
        </>
    )
}

export default ProfileIcon;