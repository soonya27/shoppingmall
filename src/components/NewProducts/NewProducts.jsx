import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../api/firebase';
import ProductCard from '../../components/ProductCard/ProductCard';
import Title from '../../components/ui/Title/Title';
import styles from './NewProducts.module.css';




export default function NewProducts() {
    //main에는 popular list를 보여줄수도 있으니... 
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProduct()
    })



    return (
        <article className={styles.article}>
            <Title highlight="NEW" text="ARRIVAL" />
            <div className='inner'>
                {isLoading && <p>loading...</p>}
                {products &&
                    <ul className={styles.productList}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ul>
                }
            </div>
        </article>
    );
}

