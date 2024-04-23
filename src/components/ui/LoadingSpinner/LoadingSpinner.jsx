import React from 'react';
import { SyncLoader } from 'react-spinners';
import styles from './LoadingSpinner.module.css';


export default function LoadingSpinner() {
    return (
        <div className={styles.spinner}>
            <SyncLoader color="#000" size={8} />
        </div>
    );
}

