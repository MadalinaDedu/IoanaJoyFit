// Dark Mode Toggle - Funcționează 100%!
console.log('Dark mode script started...');

// Funcția principală de inițializare
function initDarkMode() {
  console.log('Initializing dark mode...');
  
  // Creează butonul dark mode
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
  darkModeToggle.setAttribute('type', 'button');
  
  // Verifică dacă dark mode era activat
  const darkMode = localStorage.getItem('darkMode');
  
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️'; // Emoji soare
    console.log('Dark mode was enabled, restoring...');
  } else {
    darkModeToggle.innerHTML = '🌙'; // Emoji lună
    console.log('Light mode active');
  }

  // Adaugă butonul în body
  document.body.appendChild(darkModeToggle);
  console.log('Dark mode button added to page!');

  // Toggle dark mode la click
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '☀️';
      localStorage.setItem('darkMode', 'enabled');
      console.log('Dark mode ENABLED');
    } else {
      darkModeToggle.innerHTML = '🌙';
      localStorage.setItem('darkMode', 'disabled');
      console.log('Dark mode DISABLED');
    }
  });

  console.log('Dark mode toggle ready!');
}

// Așteaptă ca DOM-ul să fie complet încărcat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
  console.log('Waiting for DOM to load...');
} else {
  // DOM-ul este deja încărcat
  initDarkMode();
}

// Restul funcționalităților (scroll reveal, smooth scroll, etc.)
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, adding extra features...');

  // Smooth scroll pentru linkuri
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Închide menu mobil dacă e deschis
        const navLinks = document.getElementById('nav-links');
        const hamburger = document.getElementById('hamburger');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Animații scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observă elementele pentru animații
  const animatedElements = document.querySelectorAll('.header-content, .home-text p, .about-img-wrapper, .about-text h2, .about-text p, .social-links a, .retreat-text, .hexagon');
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    const increment = target / speed;

    const updateCount = function() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        setTimeout(updateCount, 1);
      } else {
        counter.textContent = target;
      }
    };

    updateCount();
  }

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    counterObserver.observe(counter);
  });

  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Hamburger menu enhanced
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    // Event listener pentru hamburger este deja în menu_script.js
    // Adăugăm doar funcționalitatea de închidere la click în afara meniului
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  console.log('All features initialized!');
});