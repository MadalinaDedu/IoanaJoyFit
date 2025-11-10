// ====== SCROLL ANIMATIONS ======

// Funcție pentru detectarea când un element devine vizibil
function handleScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Selectează toate elementele care trebuie animate
  const animatedElements = document.querySelectorAll(`
    .pachete-intro,
    .pachete-card,
    .belaqua-intro,
    .program-card,
    .despre-header-clean,
    .despre-main-card,
    .despre-image-col,
    .despre-text-col,
    .despre-stats-section,
    .testimoniale-intro,
    .testimoniale-carousel,
    .social-proof,
    .retreat-header,
    .retreat-card,
    .gallery-item,
    .fade-in-up,
    .fade-in-down,
    .fade-in-left,
    .fade-in-right,
    .fade-in,
    .scale-in
  `);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Funcție specială pentru animații în cascadă (carduri multiple)
function handleCascadeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.pachete-card, .program-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const containers = document.querySelectorAll('.pachete-grid, .belaqua-programs');
  containers.forEach(container => {
    observer.observe(container);
  });
}

// Inițializare la încărcarea paginii
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimations();
  handleCascadeAnimations();
});

// Opțional: Re-inițializare la resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    handleScrollAnimations();
  }, 250);
});