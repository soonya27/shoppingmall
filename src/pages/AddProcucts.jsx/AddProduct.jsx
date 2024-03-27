import React from 'react';
import { addNewProduct, getProduct } from '../../api/firebase';

export default function AddProduct() {
    const handleClick = () => {
        addNewProduct();
    }
    const handleClickGet = () => {
        const data = getProduct();
        // console.log(data);
    }
    return (
        <div>
            AddProduct
            <button type="button"
                onClick={handleClick}>
                submit
            </button>
            <button type="button"
                onClick={handleClickGet}>
                조회
            </button>

        </div>
    );
}

