import { products } from './products.js';

const state = { items: [] };

const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

export function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.items.find(i => i.id === productId);
  if (existing) existing.qty += 1;
  else state.items.push({ ...product, qty: 1 });
  renderCart();
  showToast(`${product.name.split(' ')[1] || 'Item'} added to cart`);
}

export function removeItem(id) {
  state.items = state.items.filter(i => i.id !== id);
  renderCart();
}

export function updateQty(id, delta) {
  const item = state.items.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  else renderCart();
}

export function renderCart() {
  const container = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);
  const totalAmt = state.items.reduce((s, i) => s + i.qty * i.price, 0);

  countEl.textContent = totalQty;
  totalEl.textContent = formatINR(totalAmt);

  if (state.items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-midnight/40">
        <div class="w-16 h-16 rounded-full bg-maroon/5 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="shopping-bag" class="w-7 h-7 text-maroon/30"></i>
        </div>
        <div class="font-display text-xl text-midnight/60">Your cart is empty</div>
        <div class="text-xs mt-1">Add some legacy to it.</div>
      </div>`;
  } else {
    container.innerHTML = state.items.map(item => `
      <div class="flex gap-4 p-3 bg-white rounded-xl border border-maroon/5">
        <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg" alt="${item.name}"/>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm text-midnight truncate">${item.name}</div>
          <div class="text-xs text-midnight/50 mt-0.5">${item.color}</div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-1 bg-beige/60 rounded-full p-0.5">
              <button data-qty="-1" data-id="${item.id}" class="w-6 h-6 rounded-full hover:bg-maroon hover:text-beige flex items-center justify-center text-xs">−</button>
              <span class="text-xs font-semibold w-5 text-center">${item.qty}</span>
              <button data-qty="1" data-id="${item.id}" class="w-6 h-6 rounded-full hover:bg-maroon hover:text-beige flex items-center justify-center text-xs">+</button>
            </div>
            <div class="font-display font-bold text-maroon">${formatINR(item.qty * item.price)}</div>
          </div>
        </div>
        <button data-remove="${item.id}" class="w-7 h-7 rounded-full hover:bg-totem/10 text-midnight/40 hover:text-totem flex items-center justify-center self-start transition">
          <i data-lucide="x" class="w-4 h-4 pointer-events-none"></i>
        </button>
      </div>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();

  container.querySelectorAll('[data-qty]').forEach(b => {
    b.addEventListener('click', () => updateQty(b.dataset.id, parseInt(b.dataset.qty)));
  });
  container.querySelectorAll('[data-remove]').forEach(b => {
    b.addEventListener('click', () => removeItem(b.dataset.remove));
  });
}

export function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('toast-show');
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => toast.classList.remove('toast-show'), 2200);
}

export function openCart() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}
export function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}
