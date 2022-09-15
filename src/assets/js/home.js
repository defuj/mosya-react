// brand menu slide
var brandSlides = document.querySelectorAll(".brand-slide");
brandSlides.forEach(function(e, i) {
  e.addEventListener("click", function(e) {
    brandSlides.forEach(function(e2, i2) {
      e2.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// banner slider
const startBanner = ()=>{
  new Swiper(".mySlider", {
      // slidesPerView: 'auto',
      slidesPerView: 1.3,
      // centeredSlides: true,
      centeredSlides: false,
      direction: 'horizontal',
      spaceBetween: 10,
      loop: true,
      autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      },
  });
}