// Animații pentru Contact
document.addEventListener('DOMContentLoaded', function() {
  // Observer pentru titlu
  const contactTitle = document.querySelector('#contact h2');
  const contactWrapper = document.querySelector('.contact-form-wrapper');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  if (contactTitle) {
    observer.observe(contactTitle);
  }
  
  if (contactWrapper) {
    observer.observe(contactWrapper);
  }
  
  // Observer pentru retreat card (dacă ai și asta)
  const retreatCard = document.querySelector('.retreat-card');
  if (retreatCard) {
    observer.observe(retreatCard);
  }
});