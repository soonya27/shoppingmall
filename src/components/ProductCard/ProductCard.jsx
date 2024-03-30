import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useMediaQuery } from "react-responsive";


export default function ProductCard({ product }) {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const { category, image, title, price, id } = product;
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
        <li onClick={handleClick} >
            {
                isPc ? (
                    <div className={styles.pc}>
                        <div className={styles.mask}><img src={image} alt={title} /></div>
                        <div className={styles.hover}>
                            <img src={image} alt={`${title}_hover_img`} />
                            <div className={styles.txt}>
                                <strong>{title}<br />
                                    [{category}]</strong>
                                <span>₩ {price}</span>
                            </div>
                            <p className={styles.icon}><img src="/image/icon/like_icon.png" alt="" /></p>
                        </div>
                    </ div>
                ) : (
                    <div className="swiper-slide">
                        <a href="#"><img src={image} alt={title} />
                            <p>{title}<br />[{category}]</p>
                            <span>₩ {price}</span></a>
                    </div>
                )
            }
        </li >


    );
}

