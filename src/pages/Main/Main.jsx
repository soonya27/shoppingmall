import React, { useState } from 'react';
import styles from './Main.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';
import Visual from '../../components/Visual/Visual';
import { getProduct } from '../../api/firebase';
import Promotion from '../../components/Promotion/Promotion';
import Title from '../../components/ui/Title/Title';

export default function Main() {
    //main에는 popular list를 보여줄수도 있으니... 
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProduct()
    })

    const item = {
        id: 'id',
        name: 'name'
    }
    return (
        <main>
            <Visual item={item} item2={{ key: 'item2' }} />
            <Promotion />
            <article className={styles.article}>
                <Title highlight="NEW" text="ARRIVAL" />
                {isLoading && <p>loading...</p>}
                {products &&
                    <ul className={styles.productList}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ul>
                }
            </article>
        </main>
    );
}

