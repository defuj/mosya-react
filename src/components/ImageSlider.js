import React from "react";
// import Swiper from 'swiper/swiper-bundle';
import { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.css";

const ImageSlider = React.memo((props) => {
    const banners = props.banner;
    
    const openUrl = (url) => {
        window.open(url, '_blank');
    }

    return (
        <Swiper className="mySlider" id="mySlider"
            modules={[Scrollbar, Autoplay]}
            autoplay={{delay: 5000, disableOnInteraction: false}}
            spaceBetween={10}
            slidesPerView={1.5}
            centeredSlides={true}
            loop={true}
            loopedSlides={5}
            lazy={true}>
            {banners.map((item, index) => 
            <SwiperSlide key={index} onClick={() => openUrl(item.link)}>
                <img src={item.image} alt={`banner-mosya-${index}`} title={`image-banner-mosya-${index}`}/>
            </SwiperSlide>
            )}
        </Swiper>
    )
})

export default ImageSlider;