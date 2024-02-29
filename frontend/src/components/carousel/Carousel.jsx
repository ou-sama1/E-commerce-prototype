import styles from './Carousel.module.css';
import carousel1 from '../../images/carousel-1.png';
import carousel2 from '../../images/carousel-2.png';
import carousel3 from '../../images/carousel-3.png';
import { useEffect, useState } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animation, setAnimation] = useState(false);
    const images = [carousel1, carousel2, carousel3];

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setAnimation(true)
          const timer = setTimeout(() => {
            setAnimation(false);
          }, 1000);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className={styles.container}>
            <img src={images[(currentIndex - 1 + images.length) % images.length]} className={`${animation ? styles.animation : ''}`} />
            <img src={images[currentIndex]} className={`${animation ? styles.animation : ''}`} />
            <img src={images[(currentIndex + 1) % images.length]} className={`${animation ? styles.animation : ''}`} />          
        </div>
    )
}

export default Carousel;