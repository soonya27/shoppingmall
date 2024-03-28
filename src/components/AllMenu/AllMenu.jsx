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
            <div className={styles.modal_body}>
                <button onClick={onClose}
                    className='absolute -top-9 right-0 text-white'
                ><CloseIcon /></button>
                {children}
            </div>
        </section>
    );
}

