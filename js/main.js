// ---- Mobile Menu Toggle ----
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ---- Scroll Fade-in Animation ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => { if(i !== item) i.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

// ---- Search Bar Redirect to Telegram Bot ----
const searchForm = document.getElementById('hero-search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
      window.open(`https://t.me/extractkrlo_bot?start=search_${encodeURIComponent(query)}`, '_blank');
    }
  });
}

// ---- Genre Tab Filter ----
document.querySelectorAll('.genre-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.genre-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const genre = tab.dataset.genre;
    document.querySelectorAll('.movie-card').forEach(card => {
      if (genre === 'all' || card.dataset.genre === genre) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10,10,15,0.95)';
  } else {
    nav.style.background = 'rgba(10,10,15,0.85)';
  }
});

// ---- Counter Animation ----
function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + '+';
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target, parseInt(entry.target.dataset.target));
    }
  });
});
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
