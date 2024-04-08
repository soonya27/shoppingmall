import React from 'react';
import { useLocation } from 'react-router-dom';
import SwiperWrapper from '../../components/ui/SwiperWrapper';
import { SwiperSlide } from 'swiper/react';
import styles from './ProductDetail.module.css';


export default function ProductDetail() {
    const { state: { product: { category, defaultImageUrl, hoverImageUrl, title, price, id, descripct } } } = useLocation();
    return (
        <div className='inner'>
            <div className={styles.container}>
                <div className={styles.imgWrap}>
                    <img src={hoverImageUrl} alt="" />
                </div>
                <div className={styles.txt}>
                    <div className={styles.descripct}>
                        <p>{`[${category}]`}</p>
                        <strong>{title}</strong>
                        <p>{price}원</p>
                        <p>{descripct}</p>
                    </div>
                    <button type="button">Add Cart</button>
                </div>
            </div>
        </div>
    );
}

