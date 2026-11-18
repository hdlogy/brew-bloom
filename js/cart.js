/**
 * Brew & Bloom — cart.js
 * Shopping cart page: renders the cart rows from localStorage, handles
 * quantity changes and removal, and keeps the totals in sync.
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  /** Render one cart item row */
  function cartItemHTML(item) {
    return (
      '<li class="cart-item" data-cart-key="' + BB.escapeHtml(item.key) + '">' +
      '<div class="cart-item__media">' +
      '<img src="' + BB.escapeHtml(item.product.image) + '" alt="' +
      BB.escapeHtml(item.product.name + ' (' + item.size.label + ')') +
      '" width="192" height="192" loading="lazy" decoding="async">' +
      '</div>' +
      '<div class="cart-item__info">' +
      '<h3 class="cart-item__name">' +
      '<a href="product.html?id=' + encodeURIComponent(item.product.id) + '">' +
      BB.escapeHtml(item.product.name) + '</a>' +
      '</h3>' +
      '<p class="cart-item__variant">' + BB.escapeHtml(item.size.label) + ' · ' +
      BB.escapeHtml(item.size.volume) + '</p>' +
      '<p class="cart-item__unit">' + BB.formatIDR(item.size.price) + ' each</p>' +
      '</div>' +
      '<div class="cart-item__controls">' +
      '<span class="cart-item__line-total">' + BB.formatIDR(item.lineTotal) + '</span>' +
      '<div class="qty qty--sm" role="group" aria-label="Quantity for ' +
      BB.escapeHtml(item.product.name) + '">' +
      '<button type="button" class="qty__btn" data-cart-action="decrease" ' +
      'aria-label="Decrease quantity of ' + BB.escapeHtml(item.product.name) + '">' +
      BB.icon('minus') + '</button>' +
      '<span class="qty__value" data-cart-qty>' + item.qty + '</span>' +
      '<button type="button" class="qty__btn" data-cart-action="increase" ' +
      'aria-label="Increase quantity of ' + BB.escapeHtml(item.product.name) + '">' +
      BB.icon('plus') + '</button>' +
      '</div>' +
      '<button type="button" class="cart-item__remove" data-cart-action="remove">' +
      BB.icon('trash', 'icon--sm') + '<span>Remove</span></button>' +
      '</div>' +
      '</li>'
    );
  }

  /** Update the summary totals in the sidebar */
  function renderSummary(items) {
    const subtotal = items.reduce(function (sum, item) {
      return sum + item.lineTotal;
    }, 0);
    const count = items.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);

    const subtotalEl = $('[data-cart-subtotal]');
    const totalEl = $('[data-cart-total]');
    const countEl = $('[data-cart-count]');
    const countLabel = $('[data-cart-count-label]');

    if (subtotalEl) subtotalEl.textContent = BB.formatIDR(subtotal);
    if (totalEl) totalEl.textContent = BB.formatIDR(subtotal);
    if (countEl) countEl.textContent = String(count);
    if (countLabel) {
      countLabel.textContent =
        count + (count === 1 ? ' item' : ' items') + ' in your cart';
    }

    // The proceed button is disabled when the cart is empty
    const proceed = $('[data-cart-proceed]');
    if (proceed) {
      proceed.disabled = items.length === 0;
      proceed.setAttribute('aria-disabled', items.length === 0 ? 'true' : 'false');
    }
  }


  /** Render the whole cart (or the empty state) */
  function renderCart() {
    const list = $('[data-cart-list]');
    const empty = $('[data-cart-empty]');
    const layout = $('[data-cart-layout]');
    if (!list) return;

    const items = BB.Cart.getItems();

    if (!items.length) {
      list.innerHTML = '';
      list.hidden = true;
      if (empty) empty.hidden = false;
      if (layout) layout.hidden = true;
      renderSummary([]);
      return;
    }

    list.hidden = false;
    if (empty) empty.hidden = true;
    if (layout) layout.hidden = false;

    list.innerHTML = items.map(cartItemHTML).join('');
    renderSummary(items);
  }

  /** Handle clicks on the cart controls (event delegation) */
  function initCartActions() {
    const list = $('[data-cart-list]');
    if (!list) return;

    list.addEventListener('click', function (event) {
      const button = event.target.closest('[data-cart-action]');
      if (!button) return;

      const row = button.closest('[data-cart-key]');
      if (!row) return;

      const key = row.getAttribute('data-cart-key');
      const parts = key.split('::');
      const productId = parts[0];
      const sizeId = parts.slice(1).join('::');
      const action = button.getAttribute('data-cart-action');

      const items = BB.Cart.getItems();
      const current = items.find(function (item) {
        return item.key === key;
      });
      if (!current) return;

      if (action === 'increase') {
        if (current.qty >= 20) {
          BB.Toast.show('Maximum reached', 'You can order up to 20 of one drink.', 'info');
          return;
        }
        BB.Cart.setQty(productId, sizeId, current.qty + 1);
      } else if (action === 'decrease') {
        if (current.qty <= 1) {
          // Decrease at quantity 1 removes the line
          BB.Cart.remove(productId, sizeId);
          BB.Toast.show('Removed from cart', current.product.name, 'info');
        } else {
          BB.Cart.setQty(productId, sizeId, current.qty - 1);
        }
      } else if (action === 'remove') {
        BB.Cart.remove(productId, sizeId);
        BB.Toast.show('Removed from cart', current.product.name, 'info');
      }

      renderCart();
      if (window.BBCartBadge) window.BBCartBadge.render();
    });
  }

  /** "Clear cart" button */
  function initClearCart() {
    const button = $('[data-cart-clear]');
    if (!button) return;

    button.addEventListener('click', function () {
      const items = BB.Cart.getItems();
      if (!items.length) return;
      BB.Cart.clear();
      renderCart();
      if (window.BBCartBadge) window.BBCartBadge.render();
      BB.Toast.show('Cart cleared', 'All items have been removed.', 'info');
    });
  }

  function init() {
    renderCart();
    initCartActions();
    initClearCart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
