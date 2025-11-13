    // Așteptăm ca toate scripturile să se încarce
    window.addEventListener('DOMContentLoaded', function() {
      // Intersection Observer pentru animații
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Observăm toate elementele care au animații
      document.querySelectorAll('.benefit-card, .section-title, .gallery-item, .retreat-section h2').forEach(el => {
        observer.observe(el);
      });

      // Adăugăm animație de plutire pentru iconițe
      document.querySelectorAll('.benefit-icon').forEach((icon, index) => {
        icon.style.animation = `floatIcon 3s ease-in-out ${index * 0.2}s infinite`;
      });

      // Adăugăm delay pentru carduri
      document.querySelectorAll('.benefit-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });

      // Adăugăm delay pentru galerie
      document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    // Activează linia portocalie la scroll pentru Retreat card
const observerRetreat = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

const retreatCard = document.querySelector('.retreat-card');
if (retreatCard) {
  observerRetreat.observe(retreatCard);
}