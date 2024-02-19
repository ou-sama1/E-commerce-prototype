import { useState } from 'react';
import profileIcon from '../../images/icon-profile.svg';
import Modal from '../UI/Modal';
import styles from './ProfileIcon.module.css';

const ProfileIcon = (props) => {
    const { username, email } = props.user;
    const [display, setDisplay] = useState(false);

    const toggleCart = () => {
        setDisplay(prev => !prev);
    }

    return(
        <>
            <div className={styles.container}>
                <button className={styles.profileIcon} onClick={toggleCart} ><img src={profileIcon} /></button>
                <span>{username}</span>
            </div>
            <Modal close={toggleCart} display={display}>
                <h3 className={styles.header}>Profile</h3>
                <div className={styles.userDetails}>
                    <img src={profileIcon} className={styles.profileIconDetail}/>
                    <span>{username}</span>
                    <span>{email}</span>
                    
                </div>
            </Modal>
        </>
    )
}

export default ProfileIcon;