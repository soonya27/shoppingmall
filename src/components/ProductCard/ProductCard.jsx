import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useMediaQueryContext } from '../../context/MediaQueryContext';
import { addBookmarkByUser, removeFromBookmark } from '../../api/firebase';
import { useAuthContent } from '../../context/AuthContext';
import HeartIcon from '../ui/icons/HeartIcon';
import HeartFilledIcon from '../ui/icons/HeartIFilledcon';
import { useQueryClient } from '@tanstack/react-query';


export default function ProductCard({ product }) {
    const { isPc } = useMediaQueryContext();
    const { category, defaultImageUrl, hoverImageUrl, title, price, id, isBookmark } = product;
    const navigate = useNavigate();
    const { uid } = useAuthContent();


    //query mutation(업로드후 바로 캐시 업데이트)
    const queryClient = useQueryClient();

    const handleClick = (e) => {
        //param으로 객체 전달
        if (e.target.closest('p') && Array.from(e.target.closest('p').classList).includes('bookmark')) return;
        navigate(`/products/${id}`, { state: { product } });
    }
    const handleBookmark = () => {
        if (!uid) {
            console.log('로그인해주세요')
            return;
        }
        isBookmark ? removeFromBookmark(uid, product.id)
            : addBookmarkByUser({ user: uid, product });
        queryClient.invalidateQueries(['products']);

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
                                <strong>{title}</strong>
                                <p>[{category}]</p>
                                <span>₩ {price}</span>
                            </div>
                            <p className={`bookmark ${styles.icon}`} onClick={handleBookmark}>
                                {isBookmark ? <HeartFilledIcon /> : <HeartIcon />}
                            </p>
                        </div>
                    </ div>
                ) : (
                    <div className={styles.mobile}>
                        <img src={hoverImageUrl} alt={title} />
                        <div className={styles.txt}>
                            <p className={styles.category}>[{category}]</p>
                            <strong>{title}</strong>
                            <span>₩ {price}</span>
                        </div>
                        <p className={`bookmark ${styles.icon}`} onClick={handleBookmark}>
                            {isBookmark ? <HeartFilledIcon /> : <HeartIcon />}
                        </p>
                    </div>
                )
            }
        </li >


    );
}

