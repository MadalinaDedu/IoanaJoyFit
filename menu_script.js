// ====== NAVBAR INTERACTIONS ======

// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
}

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const href = item.getAttribute('href');
    
    // Dacă e link extern (index.html sau alte pagini), lasă comportamentul default
    if (!href.startsWith('#')) {
      // Nu preveni comportamentul default - permite navigarea
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
      return; // IMPORTANT: ieșim din funcție
    }
    
    // Doar pentru link-uri interne (#home, #retreat) facem preventDefault și smooth scroll
    e.preventDefault();
    const targetSection = document.querySelector(href);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Închide meniul
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Navbar scroll effect - fundal mai vizibil
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Active link highlight based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      navLink.classList.add('active');
    }
  });
});