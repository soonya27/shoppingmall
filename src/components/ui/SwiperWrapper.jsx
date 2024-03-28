import React from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

export default function SwiperWrapper({ children }) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            pagination={{ type: 'fraction' }}
            autoplay
            loop
        >
            {children}
        </Swiper>
    );
}

