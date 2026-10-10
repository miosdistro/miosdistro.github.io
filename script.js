const RELEASE_TIMESTAMP = '2026-10-10T19:05:00-04:00';

function isReleaseActive() {
  return new Date() >= new Date(RELEASE_TIMESTAMP);
}

function applyReleaseState() {
  document.querySelectorAll('.event-status').forEach((badge) => {
    const label = badge.textContent.trim().toLowerCase();
    if (label.includes('próximo') || label.includes('pendiente')) {
      badge.textContent = 'Realizado';
      badge.classList.add('event-status-complete');
    }
  });

  const cta = document.querySelector('.gallery-cta');
  if (cta) {
    cta.remove();
  }
}

function activateDownloadsModal() {
  if (!window.location.pathname.endsWith('descargas.html')) {
    return;
  }

  const banner = document.querySelector('.download-banner');
  if (banner) {
    banner.remove();
  }

  const modal = document.querySelector('.download-modal');
  if (!modal) {
    return;
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  const closeButton = modal.querySelector('.download-modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 780) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

function splitLetters(el) {
  if (!el || el.dataset.splitDone) return;

  const text = el.textContent.trim();
  el.innerHTML = '';

  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${index * 0.04}s`;
    el.appendChild(span);
  });

  el.dataset.splitDone = '1';
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation();
  document.querySelectorAll('.animate-letters').forEach(splitLetters);
  document.querySelectorAll('.emoji').forEach((element) => {
    element.style.willChange = 'transform';
  });

  if (isReleaseActive()) {
    applyReleaseState();
    activateDownloadsModal();
  }
});

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .compare-card, .compare-box, .community-card, .download-card, .edition-card, .animate-letters').forEach((element) => {
  observer.observe(element);
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (header) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }

  lastScrollY = currentScrollY;
});
