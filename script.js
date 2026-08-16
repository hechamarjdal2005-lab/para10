/* ============================================
   Para IRMAS — script.js
   General site behavior, animations, search,
   filters, mobile nav, form validation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initSearch();
  initCategoryFilters();
  initContactForm();
  initSmoothScroll();
  initPageTransitions();
  initStarRating();
});

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---- Search ---- */
function initSearch() {
  const input = document.querySelector('.search-input');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterProducts();
    }, 250);
  });
}

/* ---- Category Filters ---- */
function initCategoryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts();
    });
  });

  // Check URL for category parameter
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    buttons.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.category === cat) b.classList.add('active');
    });
    filterProducts();
  }
}

function filterProducts() {
  const grid = document.querySelector('.products-grid');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const searchInput = document.querySelector('.search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const activeFilter = document.querySelector('.filter-btn.active');
  const category = activeFilter ? activeFilter.dataset.category : 'all';

  let filtered = PRODUCTS;

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  }

  renderProducts(grid, filtered);
}

function renderProducts(container, products) {
  if (products.length === 0) {
    container.innerHTML = '<div class="no-results"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><p>Aucun produit trouvé</p></div>';
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card reveal revealed" data-category="${product.category}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">${product.price} DH</span>
          <button class="add-to-cart-btn" data-product-id="${product.id}" onclick="addToCart(${product.id})" aria-label="Ajouter ${product.name} au panier">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Featured Products on Homepage ---- */
function renderFeaturedProducts() {
  const container = document.querySelector('.featured-products-grid');
  if (!container || typeof PRODUCTS === 'undefined') return;

  const featured = PRODUCTS.slice(0, 6);
  container.innerHTML = featured.map(product => `
    <div class="product-card reveal">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">${product.price} DH</span>
          <button class="add-to-cart-btn" data-product-id="${product.id}" onclick="addToCart(${product.id})" aria-label="Ajouter ${product.name} au panier">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (error) error.textContent = 'Ce champ est requis';
        valid = false;
      } else {
        field.classList.remove('error');
        if (error) error.textContent = '';
      }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const error = emailField.parentElement.querySelector('.field-error');
      if (!emailRegex.test(emailField.value)) {
        emailField.classList.add('error');
        if (error) error.textContent = 'Adresse email invalide';
        valid = false;
      }
    }

    if (valid) {
      form.style.display = 'none';
      const success = form.parentElement.querySelector('.form-success');
      if (success) success.style.display = 'flex';
    }
  });

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const error = field.parentElement.querySelector('.field-error');
      if (error) error.textContent = '';
    });
  });
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---- Page Transitions ---- */
function initPageTransitions() {
  document.body.classList.add('loaded');
}

/* ---- Star Rating Animation ---- */
function initStarRating() {
  const starContainers = document.querySelectorAll('.stars-animated');
  starContainers.forEach(container => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stars = container.querySelectorAll('.star');
          stars.forEach((star, i) => {
            setTimeout(() => star.classList.add('visible'), i * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(container);
  });
}

/* ---- Navbar scroll effect ---- */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

/* ---- Counter animation for stats ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}
