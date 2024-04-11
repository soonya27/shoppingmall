import React from 'react';

export default function CartListNotUser() {
    //localstorage에서 리스트 가져오기
    const products = [];
    return (
        <ul>
            {
                products.map(item => (
                    <li>{item}</li>
                ))
            }
        </ul>
    );
}

