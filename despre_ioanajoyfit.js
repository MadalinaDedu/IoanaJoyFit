// Parallax Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
  const parallaxItems = document.querySelectorAll('.parallax-item');
  
  if (window.innerWidth > 768) { // Only on desktop
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const despre = document.querySelector('.despre-parallax-section');
      
      if (despre) {
        const despreTop = despre.offsetTop;
        const despreHeight = despre.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (scrolled + windowHeight > despreTop && scrolled < despreTop + despreHeight) {
          parallaxItems.forEach(item => {
            const speed = item.dataset.speed || 0.5;
            const yPos = -(scrolled - despreTop) * speed;
            item.style.transform = `translateY(${yPos}px)`;
          });
        }
      }
    });
  }
});

// Counter animation (păstrează codul existent)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Intersection Observer pentru counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});