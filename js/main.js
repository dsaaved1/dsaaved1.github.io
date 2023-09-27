/* Your JS here. */
const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
  const logoSize = Math.min(Math.max(30, 100 - scrollY / 10), 50);
    
  if (window.scrollY > 50) {

    navbar.classList.add('small');
  } else {
    navbar.classList.remove('small');
  }

  const fontSize = 18 - window.scrollY / 100;
  navbar.style.fontSize = `${fontSize}px`;
  logo.style.width = `${logoSize}px`;
  logo.style.height = `${logoSize}px`;

});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove('active');
    if (a.href.includes(current)) {
      a.classList.add('active');
    }
  });

  const lastSection = sections[sections.length - 1];
  const lastNavLink = navLinks[navLinks.length - 1];

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    navLinks.forEach((a) => a.classList.remove('active'));
    lastNavLink.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach((link) => {
    link.addEventListener('click', smoothScroll);
  });

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; 
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
});
  
const track = document.getElementById('carousel-track');
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % track.children.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + track.children.length) % track.children.length;
  updateCarousel();
}

function updateCarousel() {
  const itemWidth = window.innerWidth; // Set item width to the window width
  track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);


function openModal(title, description) {
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  modal.style.display = 'flex';
  modalTitle.innerText = title;
  modalDescription.innerText = description;
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}