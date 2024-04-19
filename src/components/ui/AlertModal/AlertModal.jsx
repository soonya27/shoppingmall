import React from 'react';
import styles from './AlertModal.module.css';
import Button from '../Button/Button';


export default function AlertModal({ onClose, children, closeCallback }) {
    return (
        <section onClick={async (e) => {
            //section(bg 영역 클릭시)
            if (e.target === e.currentTarget) {
                closeCallback ? await closeCallback().then(onClose)
                    : onClose();
            }
        }}
            className={styles.container}
        >
            {/* PostModal container */}
            <div className={styles.container_inner}>
                {children}
                <Button onClick={async () => {
                    closeCallback ? await closeCallback().then(onClose)
                        : onClose();
                }}>
                    확인
                </Button>
            </div>
        </section>
    );
}

