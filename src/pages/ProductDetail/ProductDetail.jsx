import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.css';


export default function ProductDetail() {
    const { state: { product: { category, image, title, price, id, descripct } } } = useLocation();
    return (
        <div>
            <h2>detail</h2>
            <div>
                <p>{`> ${category}`}</p>
                <div>
                    <img src={image} alt="" />
                </div>
                <div>
                    <strong>{title}</strong>
                    <p>{price}원</p>
                    <p>{descripct}</p>
                    <button type="button">Add Cart</button>
                </div>
            </div>
        </div>
    );
}

