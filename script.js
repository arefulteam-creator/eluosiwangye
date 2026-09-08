// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('glowhome-lang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Restore saved language
const savedLang = localStorage.getItem('glowhome-lang');
if (savedLang) setLanguage(savedLang);

// Hero Carousel
const heroCarousel = document.getElementById('heroCarousel');
const heroSlides = heroCarousel.querySelectorAll('.carousel-slide');
const heroDots = heroCarousel.querySelectorAll('.carousel-dot');
let heroCurrentSlide = 0;
let heroInterval;

function showHeroSlide(index) {
  heroSlides.forEach(s => s.classList.remove('active'));
  heroDots.forEach(d => d.classList.remove('active'));
  heroSlides[index].classList.add('active');
  heroDots[index].classList.add('active');
  heroCurrentSlide = index;
}

function nextHeroSlide() {
  showHeroSlide((heroCurrentSlide + 1) % heroSlides.length);
}

function startHeroCarousel() {
  heroInterval = setInterval(nextHeroSlide, 5000);
}

heroDots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(heroInterval);
    showHeroSlide(parseInt(dot.dataset.slide));
    startHeroCarousel();
  });
});

startHeroCarousel();

// About Carousel
const aboutCarousel = document.getElementById('aboutCarousel');
if (aboutCarousel) {
  const aboutSlides = aboutCarousel.querySelectorAll('.about-carousel-slide');
  const aboutDots = aboutCarousel.querySelectorAll('.about-carousel-dot');
  let aboutCurrentSlide = 0;
  let aboutInterval;

  function showAboutSlide(index) {
    aboutSlides.forEach(s => s.classList.remove('active'));
    aboutDots.forEach(d => d.classList.remove('active'));
    aboutSlides[index].classList.add('active');
    aboutDots[index].classList.add('active');
    aboutCurrentSlide = index;
  }

  function nextAboutSlide() {
    showAboutSlide((aboutCurrentSlide + 1) % aboutSlides.length);
  }

  aboutDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(aboutInterval);
      showAboutSlide(parseInt(dot.dataset.slide));
      startAboutCarousel();
    });
  });

  function startAboutCarousel() {
    aboutInterval = setInterval(nextAboutSlide, 4000);
  }

  startAboutCarousel();
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 64;
      const top = target.offsetTop - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Scroll Spy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
});

// Fade In Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form Handler
function handleSubmit(e) {
  e.preventDefault();
  alert('Thank you for your inquiry! We will get back to you shortly.');
  e.target.reset();
}

// Product View Details Button
document.querySelectorAll('.btn-view').forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.closest('.product-card').querySelector('.product-name').textContent;
    alert('View details for: ' + productName);
  });
});

// View More Button
document.querySelector('.view-more-btn')?.addEventListener('click', () => {
  document.getElementById('displays')?.scrollIntoView({ behavior: 'smooth' });
});
