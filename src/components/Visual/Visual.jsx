import React from 'react';
import styles from './Visual.module.css';
import { useMediaQuery } from "react-responsive";
import SwiperWrapper from './../ui/SwiperWrapper';
import { SwiperSlide } from 'swiper/react';



export default function Visual() {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    return (
        <>
            {isPc ? (
                <section className={styles.visual}>
                    <div className={styles.inner}>
                        <div className={styles.txt}>
                            <h2><p>H</p><p>O</p><p>L</p><p>I</p></h2>
                            <strong>DONOT</strong>
                            <strong><em>“</em>DISTURB<em>”</em></strong>
                            <h2><p>D</p><p>A</p><p>Y</p></h2>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={styles.mobile}>
                    <div className={styles.mobile_txt}>
                        <em>DO NOT DISTURB</em>
                        <h2><p>H</p><p>O</p><p>L</p><p>I</p></h2>
                        <h2><p>D</p><p>A</p><p>Y</p></h2>
                        <p className={styles.sub}>
                            <span>2020</span><span>COLLECTION</span>
                        </p>
                    </div>
                    <SwiperWrapper>
                        <SwiperSlide><img src="/image/visual_01.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/image/visual_02.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/image/visual_03.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/image/visual_04.jpg" alt="" /></SwiperSlide>
                    </SwiperWrapper>
                </section>
            )}

        </>
    );
}

