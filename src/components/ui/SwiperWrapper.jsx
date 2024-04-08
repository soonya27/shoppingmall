import React from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';


export default function SwiperWrapper({ children, isPagination = true }) {
    const pagination = isPagination ? { type: 'fraction' } : ''
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            pagination={pagination}
            autoplay={{ delay: 5000 }}
            loop
        >
            {children}
        </Swiper>
    );
}

