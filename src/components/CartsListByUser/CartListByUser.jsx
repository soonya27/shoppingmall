import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCartProduct } from '../../api/firebase';

export default function CartListByUser({ uid }) {
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => getCartProduct(uid)
    })

    const [option, setOption] = useState({ size: '', itemNum: 0 });
    const handleChange = (e) => setOption((prev => ({ ...prev, [e.target.name]: e.target.value })));
    return (
        <ul>
            {
                products && products.map(({ id, product: { hoverImageUrl, options }, size, itemNum }) => (
                    <li key={id}>
                        <img src={hoverImageUrl} alt="" />
                        <p>size : {size}</p>
                        <select name="size" id="" value={size} onChange={handleChange}>
                            {
                                options.map(item => (
                                    <option value={item} key={item} >{item}</option>
                                ))
                            }
                        </select>
                        <input type="number" name="itemNum" id="" value={itemNum} onChange={handleChange} />
                        <span>개</span>
                    </li>
                ))
            }
        </ul>
    );
}

