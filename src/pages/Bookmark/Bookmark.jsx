import React from 'react';
import styles from './Bookmark.module.css';
import ProductsList from '../../components/ProductsList/ProductsList';


export default function Bookmark() {
    return (
        <div>
            <ProductsList type='bookmark' />
        </div>
    );
}

