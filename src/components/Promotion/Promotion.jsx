import React from 'react';
import styles from './Promotion.module.css';

export default function Promotion() {
    return (
        <div className={styles.inner}>
            <div className={styles.txt}>
                <strong>PRIVATE</strong>
                <strong>HOLIDAY</strong>
            </div>
            <div className={styles.right}>
                <img src="/image/content01.jpg" alt="" />
            </div>
            <div className={styles.left}>
                <img src="/image/content02.jpg" alt="" />
            </div>
        </div>
    );
}

