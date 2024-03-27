import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    const { category, image, title, price, id } = product;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${id}`, { state: { product } });
    }
    return (
        <li onClick={handleClick} className={styles.list}>
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <strong>{title}</strong>
                <p>{price}</p>
            </div>
            <span>{category}</span>
        </li>
    );
}

