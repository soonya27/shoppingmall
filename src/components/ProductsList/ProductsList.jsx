import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../api/firebase';
import ProductCard from '../../components/ProductCard/ProductCard';
import Title from '../../components/ui/Title/Title';
import styles from './ProductsList.module.css';
import { useAuthContent } from '../../context/AuthContext';



export default function ProductsList({ type = 'all' }) {
    const { uid } = useAuthContent();
    const typeText = {
        all: { highlight: 'ALL', text: 'PRODUCTS' },
        new: { highlight: 'NEW', text: 'ARRIVAL' },
        best: { highlight: 'BEST', text: 'SELLER' },
        bookmark: { highlight: 'BOOKMARK', text: 'PRODUCTS' }
    }
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['products', uid || ''],
        queryFn: async () => getProduct(uid),
    })
    const random = products && randomNum(products.length, 6);
    const filteredProducts = products && (type === 'new' ? products.filter((item, idx) => idx < 6)
        : type === 'best' ? products.filter((item, idx) => random.includes(idx))
            : type === 'bookmark' ? products.filter(item => item.isBookmark)
                : products);
    return (
        <article className={styles.article}>
            <Title highlight={typeText[type].highlight} text={typeText[type].text} />
            <div className='inner'>
                {isLoading && <p>loading...</p>}
                {products &&
                    <ul className={styles.productList}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        )
                        )}
                    </ul>
                }
            </div>
        </article>
    );
}


function randomNum(max, count) {
    const array = [];
    while (array.length < count) {
        const randomNumber = Math.floor(Math.random() * (max - 1 + 1)) + 0;
        if (!array.includes(randomNumber)) {
            array.push(randomNumber);
        }
    }
    return array;
}