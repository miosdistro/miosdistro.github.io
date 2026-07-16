// Smooth scroll for in-page anchors
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Letter-splitting animation for headings with class .animate-letters
function splitLetters(el) {
  if (!el || el.dataset.splitDone) return;
  const text = el.textContent.trim();
  el.innerHTML = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = `${i * 0.04}s`;
    el.appendChild(span);
  });
  el.dataset.splitDone = '1';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-letters').forEach(splitLetters);
  document.querySelectorAll('.emoji').forEach(e => e.style.willChange = 'transform');
});

// IntersectionObserver to add .in-view when cards/headings enter viewport
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .compare-card, .compare-box, .community-card, .download-card, .edition-card, .animate-letters').forEach(el => {
  observer.observe(el);
});

// Header hide on scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = currentScrollY;
});
