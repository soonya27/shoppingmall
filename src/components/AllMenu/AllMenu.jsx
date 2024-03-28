import React from 'react';
import styles from './AllMenu.module.css';
import CloseIcon from './../ui/icons/CloseIcon';


export default function AllMenu({ onClose, children }) {
    return (
        <section className={styles.container}
            onClick={(e) => {
                //section(bg 영역 클릭시)
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            {/* PostModal container */}
            <div className={styles.modal_body} onClick={(e) => {
                if (e.target.localName === 'a') {
                    onClose();
                }
            }}>
                <button onClick={onClose}
                    className={styles.closeBtn}
                ><CloseIcon /></button>
                {children}
            </div>
        </section>
    );
}

