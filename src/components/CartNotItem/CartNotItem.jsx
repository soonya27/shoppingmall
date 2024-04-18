import React from 'react';
import styles from './CartNotItem.module.css';


export default function CartNotItem() {
    return (
        <div className={styles.container}>
            <strong> 장바구니가 비었습니다.</strong>
            <p>제품을 추가해주세요.</p>
        </div>
    );
}

