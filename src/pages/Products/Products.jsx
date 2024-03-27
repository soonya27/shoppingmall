import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function ProductDetail() {
    //main에는 popular list를 보여줄수도 있으니... 
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            return axios.get('/data/products_list.json')
                .then(res => res.data.items)
        }
    })


    return (
        <div>
            <h2>All Products</h2>
            <article>
                {isLoading && <p>loading...</p>}
                {products &&
                    <ul className={styles.productsList}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ul>
                }
            </article>
        </div>
    );
}
