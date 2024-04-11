import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, onClick = () => { }, type = 'button' }) {
    return (
        <button type={type} className={styles.button} onClick={onClick}>{children}</button>
    );
}

