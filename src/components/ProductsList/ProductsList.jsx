import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Title from '../../components/ui/Title/Title';
import styles from './ProductsList.module.css';
import { useAuthContent } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner';
import useProducts from '../../hooks/useProducts';


export default function ProductsList({ type = 'all' }) {
    const { uid } = useAuthContent();
    const typeText = {
        all: { highlight: 'ALL', text: 'PRODUCTS' },
        new: { highlight: 'NEW', text: 'ARRIVAL' },
        best: { highlight: 'BEST', text: 'SELLER' },
        bookmark: { highlight: 'BOOKMARK', text: 'PRODUCTS' }
    }

    const { productQuery: {
        isLoading,
        error,
        data: products
    } } = useProducts(uid);


    const random = products && randomNum(products.length, 6);
    const filteredProducts = products && (type === 'new' ? products.filter((item, idx) => idx < 6)
        : type === 'best' ? products.filter((item, idx) => random.includes(idx))
            : type === 'bookmark' ? products.filter(item => item.isBookmark)
                : products);
    return (
        <article className={styles.article}>
            <Title highlight={typeText[type].highlight} text={typeText[type].text} />
            <div className='inner'>
                {isLoading && <LoadingSpinner />}
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
    // 좋아요 표시 누른뒤 reload.. 특정값 가져오기로 변경
    // while (array.length < count) {
    //     const randomNumber = Math.floor(Math.random() * (max - 1 + 1)) + 0;
    //     if (!array.includes(randomNumber)) {
    //         array.push(randomNumber);
    //     }
    // }
    // return array;

    return [1, 3, 5, 7, 9, 11];
}