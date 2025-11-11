let swiperInstance = null;

function initSwiper() {
  // Verificăm dacă suntem pe mobil (max-width: 768px)
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile && !swiperInstance) {
    // Inițializăm Swiper doar pe mobil
    swiperInstance = new Swiper('.gallery-carousel', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      speed: 600,
      effect: 'slide',
    });
    
    console.log('✅ Swiper inițializat pentru galerie');
  } else if (!isMobile && swiperInstance) {
    // Distrugem Swiper pe desktop
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    console.log('🖥️ Swiper distrus - afișare grid pe desktop');
  }
}

// Inițializare la încărcarea paginii
window.addEventListener('load', initSwiper);

// Re-inițializare la redimensionarea ferestrei
window.addEventListener('resize', function() {
  initSwiper();
});

// Verificare suplimentară după 500ms (pentru cazurile când Swiper nu se inițializează imediat)
window.addEventListener('load', function() {
  setTimeout(function() {
    if (window.innerWidth <= 768 && !swiperInstance) {
      console.log('🔄 Re-inițializare Swiper după delay');
      initSwiper();
    }
  }, 500);
});