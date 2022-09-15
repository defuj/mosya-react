import React from "react";
import Swiper from 'swiper/swiper-bundle';
import "swiper/swiper-bundle.css";

const ImageSlider = (props) => {
    const banners = props.banner;
    new Swiper(".mySlider", {
        slidesPerView: 1.3,
        centeredSlides: false,
        direction: 'horizontal',
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
    return (
        <div className="swiper mySlider" id="mySlider">
            <div className="swiper-wrapper" id="content-banner">
                {banners.map((item, index) => 
                    <a className="swiper-slide" href={item.link} target="_blank" key={item.id} rel="noopener noreferrer">
                        <img src={item.image} alt=""/>
                    </a>
                )}
            </div>
        </div>
    )
}

export default ImageSlider;