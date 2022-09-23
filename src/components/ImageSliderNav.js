import React, {useEffect} from "react";
// import Swiper from 'swiper/swiper-bundle';
import { Autoplay, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.css";

const ImageSliderNav = React.memo((props) => {
    const banners = props.banner;
    const updatePosition = () => {
        try {
            const pagination = document.querySelector('.swiper-pagination');
            document.getElementById('container-slide').appendChild(pagination);
            document.querySelector('.swiper-pagination').style.cssText = 'bottom:auto';
        } catch (error) {}
    }

    useEffect(() => {
        updatePosition();
    }, [updatePosition])
    return (
        <div className="container-slider" id="container-slide">
            <Swiper className="productSlider"
                modules={[Pagination, Scrollbar, Autoplay]}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                spaceBetween={16}
                slidesPerView={'auto'}
                centeredSlides={false}
                pagination={{ clickable: true }}>
                {banners.map((item, index) => 
                <SwiperSlide key={index}>
                    <img src={item} alt=""/>
                </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
})

export default ImageSliderNav;