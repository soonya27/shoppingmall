import React, { useEffect, useState } from 'react';
import styles from './TopButton.module.css';
import ArrowTopIcon from '../ui/icons/ArrowTopIcon';



export default function TopButton() {
    const [showButton, setShowButton] = useState(0);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const showButtonClick = () => {
            if (window.scrollY > 50) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }
        window.addEventListener("scroll", showButtonClick);
        return () => {
            window.removeEventListener("scroll", showButtonClick);
        }
    }, []);

    return (
        <>
            {showButton && (
                <div className={`${styles.btnTop} ${showButton ? styles.active : ''}`} onClick={handleClick}>
                    <p>
                        <ArrowTopIcon />
                    </p>
                </div>
            )
            }
        </>
    );
}

