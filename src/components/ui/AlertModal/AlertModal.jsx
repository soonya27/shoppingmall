import React from 'react';
import styles from './AlertModal.module.css';
import Button from '../Button/Button';


export default function AlertModal({ onClose, children }) {
    return (
        <section onClick={(e) => {
            //section(bg 영역 클릭시)
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}
            className={styles.container}
        >
            {/* PostModal container */}
            <div className={styles.container_inner}>
                {children}
                <Button onClick={onClose}>
                    확인
                </Button>
            </div>
        </section>
    );
}

