import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useMediaQueryContext } from '../context/MediaQueryContext';


export default function ProductCard({ product }) {
    const { isPc } = useMediaQueryContext();
    const { category, defaultImageUrl, hoverImageUrl, title, price, id } = product;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${id}`, { state: { product } });
    }
    return (
        // <li onClick={handleClick} className={styles.list}>
        //     <div>
        //         <img src={image} alt="" />
        //     </div>
        //     <div>
        //         <strong>{title}</strong>
        //         <p>{price}</p>
        //     </div>
        //     <span>{category}</span>
        // </li>
        <li onClick={handleClick} className={styles.li}>
            {
                isPc ? (
                    <div className={styles.pc}>
                        <div className={styles.mask}><img src={defaultImageUrl} alt={title} /></div>
                        <div className={styles.hover}>
                            <img src={hoverImageUrl} alt={`${title}_hover_img`} />
                            <div className={styles.txt}>
                                <strong>{title}<br />
                                    [{category}]</strong>
                                <span>₩ {price}</span>
                            </div>
                            <p className={styles.icon}><img src="/image/icon/like_icon.png" alt="" /></p>
                        </div>
                    </ div>
                ) : (
                    <div className={styles.mobile}>
                        <img src={hoverImageUrl} alt={title} />
                        <p>{title}<br />[{category}]</p>
                        <span>₩ {price}</span>
                        <p className={styles.icon}><img src="/image/icon/like_icon.png" alt="" /></p>
                    </div>
                )
            }
        </li >


    );
}

