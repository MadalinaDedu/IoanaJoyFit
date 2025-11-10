// Inițializare Swiper pentru Testimoniale
const testimonialeSwiper = new Swiper('.testimoniale-carousel', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.testimonial-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 800,
  effect: 'slide',
});