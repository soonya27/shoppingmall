import React from 'react';
import styles from './Title.module.css';


export default function Title({ highlight, text }) {
    return (
        <h2 className={styles.title}>
            <span>{highlight}</span>
            {text}
        </h2>
    );
}

