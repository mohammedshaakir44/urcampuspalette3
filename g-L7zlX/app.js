import { products } from './products.js';
import { addToCart, renderCart, openCart, closeCart, showToast } from './cart.js';

const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

const accentMap = {
  maroon: { bg: 'bg-maroon', text: 'text-maroon', badge: 'bg-maroon text-beige' },
  midnight: { bg: 'bg-midnight', text: 'text-midnight', badge: 'bg-midnight text-beige' },
  totem: { bg: 'bg-totem', text: 'text-totem', badge: 'bg-totem text-beige' }
};

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map((p, i) => {
    const a = accentMap[p.accent];
    return `
    <article class="product-card reveal bg-white rounded-2xl overflow-hidden border border-maroon/5 flex flex-col" data-delay="${i * 0.1}">
      <div class="relative aspect-[4/5] overflow-hidden bg-beige/40">
        <img src="${p.image}" alt="${p.name}" class="product-img w-full h-full object-cover"/>
        <span class="absolute top-4 left-4 ${a.badge} text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">${p.badge}</span>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <div class="text-[10px] uppercase tracking-[0.2em] ${a.text} font-semibold mb-2">${p.color}</div>
        <h3 class="font-display text-2xl font-bold text-midnight leading-tight">${p.name}</h3>
        <p class="text-sm text-midnight/60 mt-2 italic">${p.tagline}</p>
        <p class="text-sm text-midnight/70 mt-3 leading-relaxed flex-1">${p.description}</p>
        <div class="mt-4 pt-4 border-t border-maroon/5 flex items-center gap-2 text-xs text-midnight/50">
          <i data-lucide="layers" class="w-3.5 h-3.5"></i>
          <span class="truncate">${p.material}</span>
        </div>
        <div class="mt-5 flex items-center justify-between gap-4">
          <div class="font-display text-3xl font-bold text-maroon">${formatINR(p.price)}</div>
          <button data-add="${p.id}" class="btn-add ${a.bg} hover:opacity-90 text-beige px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Add
          </button>
        </div>
      </div>
    </article>`;
  }).join('');

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add);
    });
  });
}

function initAnimations() {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-fade', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    stagger: 0.12, delay: 0.2
  });

  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

function initCart() {
  document.getElementById('cart-toggle').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('checkout-btn').addEventListener('click', () => {
    showToast('Order placed! Pickup at SAC ✦');
    setTimeout(closeCart, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  initCart();
  if (window.lucide) window.lucide.createIcons();
  requestAnimationFrame(initAnimations);
});
