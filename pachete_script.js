// script.js
const container = document.querySelector('.coverflow');
if (container) {
  let items = Array.from(document.querySelectorAll('.coverflow-item'));
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  let currentIndex = 0; // Start de la primul element
  let isAnimating = false;
  let autoScrollInterval = null;

  // Actualizează transformările pentru efectul 3D coverflow
  function updateTransforms() {
    items.forEach((item, index) => {
      let offset = index - currentIndex;

      // Pentru efect infinit: repoziționează offset-ul
      if (offset > items.length / 2) offset -= items.length;
      if (offset < -items.length / 2) offset += items.length;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      const translateX = offset * 400; // ajustează distanța între carduri
      const translateZ = -absOffset * 100;
      const rotateY = -sign * Math.min(absOffset * 60, 60);
      const scale = 1 - absOffset * 0.12;
      const opacity = absOffset > 3 ? 0 : 1 - absOffset * 0.3;

      item.style.transform = `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      item.style.opacity = opacity;
      item.style.zIndex = 100 - absOffset;

      item.classList.toggle('focus', index === currentIndex);
    });
  }

  function navigate(direction) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += direction;

    // Buclă infinită pe index
    if (currentIndex < 0) currentIndex = items.length - 1;
    if (currentIndex >= items.length) currentIndex = 0;

    updateTransforms();
    setTimeout(() => { isAnimating = false; }, 600);
  }

  function goToIndex(index) {
    if (isAnimating || index === currentIndex) return;
    currentIndex = index;
    updateTransforms();
  }

  function autoScrollCarousel() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      navigate(1);
    }, 4000);
  }

  // Evenimente
  btnPrev?.addEventListener('click', () => navigate(-1));
  btnNext?.addEventListener('click', () => navigate(1));

  // Opțional: navigare cu tastele
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  window.addEventListener('load', () => {
    updateTransforms();
    autoScrollCarousel();
  });

  window.addEventListener('resize', updateTransforms);
}

function showOnScroll() {
    const hexagons = document.querySelectorAll('.hexagon');
    const triggerBottom = window.innerHeight * 0.85;

    hexagons.forEach((el, index) => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add('visible');
        // opțional: decalaj pe fiecare element pentru un efect tip "cascadă"
        el.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  }

  window.addEventListener('scroll', showOnScroll);
  window.addEventListener('load', showOnScroll);

function showRetreatTextOnScroll() {
  const retreatText = document.querySelector('.retreat-text');
  if (!retreatText) return;
  const triggerBottom = window.innerHeight * 0.85;
  const boxTop = retreatText.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    retreatText.classList.add('visible');
  }
}

window.addEventListener('scroll', showRetreatTextOnScroll);
window.addEventListener('load', showRetreatTextOnScroll);

function showHomeTextOnScroll() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;
  const triggerBottom = window.innerHeight * 0.85;
  const boxTop = homeSection.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    homeSection.classList.add('visible');
  }
}

window.addEventListener('scroll', showHomeTextOnScroll);
window.addEventListener('load', showHomeTextOnScroll);

function showHeaderContentOnScroll() {
  const headerContent = document.querySelector('.header-content');
  if (!headerContent) return;
  const triggerBottom = window.innerHeight * 0.85;
  const boxTop = headerContent.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    headerContent.classList.add('visible');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll('.home_container p');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const p = entry.target;

        // Set delay pe fiecare paragraf, in functie de pozitie
        const index = Array.from(paragraphs).indexOf(p);
        setTimeout(() => {
          p.classList.add('visible');
        }, index * 300); // delay 300ms intre ele

        observer.unobserve(p); // nu mai observa dupa ce a aparut
      }
    });
  }, { threshold: 0.1 }); // cand 10% din element e vizibil

  paragraphs.forEach(p => observer.observe(p));
});


document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector('.about-content');
  const imgWrapper = document.querySelector('.about-img-wrapper');
  const title = document.querySelector('.about-text h2');
  const paragraph = document.querySelector('.about-text p');
  const socialIcons = document.querySelectorAll('.social-links a');

  if (!aboutSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // 1. Poza
        imgWrapper.classList.add('visible');

        // 2. Titlul după 500ms
        setTimeout(() => {
          title.classList.add('visible');
        }, 500);

        // 3. Paragraful după 1000ms
        setTimeout(() => {
          paragraph.classList.add('visible');
        }, 1000);

        // 4. Iconițele una câte una după pargraf
        socialIcons.forEach((icon, index) => {
          setTimeout(() => {
            icon.classList.add('visible');
          }, 1300 + index * 200);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
});

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const triggerBottom = window.innerHeight * 0.85;

  counters.forEach(counter => {
    const boxTop = counter.getBoundingClientRect().top;

    if (boxTop < triggerBottom && !counter.classList.contains('counted')) {
      counter.classList.add('counted');
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 100; // viteza

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    }
  });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);


window.addEventListener('scroll', showHeaderContentOnScroll);
window.addEventListener('load', showHeaderContentOnScroll);

  document.addEventListener("DOMContentLoaded", () => {
    const headerContent = document.querySelector(".header-content");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          headerContent.classList.add("visible");
        }
      });
    }, { threshold: 0.5 }); // când 50% din el e vizibil

    observer.observe(headerContent);
  });

  document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(" .home_container h2");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // ca să nu mai tot ruleze
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  // Observăm titlul
  const retreatTitle = document.querySelector('#retreat h2');
  if (retreatTitle) observer.observe(retreatTitle);

  // Observăm toate elementele din galerie
  document.querySelectorAll('#retreat .gallery-item').forEach(item => {
    observer.observe(item);
  });

  // Animație pentru Contact Section
function showContactOnScroll() {
  const contactSection = document.querySelector('#contact');
  const contactTitle = document.querySelector('#contact h2');
  const contactForm = document.querySelector('#contact form');
  
  if (!contactSection) return;
  
  const triggerBottom = window.innerHeight * 0.85;
  const boxTop = contactSection.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    if (contactTitle) contactTitle.classList.add('visible');
    if (contactForm) contactForm.classList.add('visible');
  }
}

window.addEventListener('scroll', showContactOnScroll);
window.addEventListener('load', showContactOnScroll);