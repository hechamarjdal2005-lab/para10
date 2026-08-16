const CART_KEY = 'para_irmas_cart';

function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  showAddToCartFeedback(productId);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showAddToCartFeedback(productId) {
  const buttons = document.querySelectorAll(`[data-product-id="${productId}"]`);
  buttons.forEach(btn => {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Ajouté ✓';
    btn.classList.add('added');
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('added');
      btn.disabled = false;
    }, 1200);
  });

  const cartIcons = document.querySelectorAll('.cart-icon-wrapper');
  cartIcons.forEach(icon => {
    icon.classList.add('bounce');
    setTimeout(() => icon.classList.remove('bounce'), 500);
  });

  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 500);
  });
}

function renderCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  if (!drawer) return;

  const cart = getCart();
  const itemsContainer = drawer.querySelector('.cart-items');
  const subtotalEl = drawer.querySelector('.cart-subtotal-value');
  const totalEl = drawer.querySelector('.cart-total-value');
  const emptyMsg = drawer.querySelector('.cart-empty');
  const cartFooter = drawer.querySelector('.cart-footer');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  let html = '';
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;

    html += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${product.name}</h4>
          <p class="cart-item-price">${product.price} DH</p>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Diminuer la quantité">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Augmenter la quantité">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Supprimer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = html;

  const total = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = total + ' DH';
  if (totalEl) totalEl.textContent = total + ' DH';
}

function openCart() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function orderViaWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    const emptyMsg = document.querySelector('.cart-empty-msg');
    if (emptyMsg) {
      emptyMsg.style.display = 'block';
      setTimeout(() => emptyMsg.style.display = 'none', 3000);
    }
    return;
  }

  let message = 'Bonjour Para IRMAS,\n\nJe souhaite passer la commande suivante :\n\n';

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const itemTotal = product.price * item.quantity;
    message += `- ${product.name} ×${item.quantity} — ${itemTotal} DH\n`;
  });

  const total = getCartTotal();
  message += `\nTotal : ${total} DH\n\nMerci.`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/212668313233?text=${encoded}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
});
