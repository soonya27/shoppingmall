import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';
import ProductsList from '../../components/ProductsList/ProductsList';

export default function Products() {


    return (
        <ProductsList type='all' />
    );
}
