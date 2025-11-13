  let swiperInstance = null;

  function initSwiper() {
    if (window.innerWidth <= 768 && !swiperInstance) {
      swiperInstance = new Swiper('.gallery-carousel, .belaqua-carousel', {

        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
    } else if (window.innerWidth > 768 && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  window.addEventListener('load', initSwiper);
  window.addEventListener('resize', initSwiper);