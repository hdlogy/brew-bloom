/**
 * Brew & Bloom — product.js
 * Product detail page: reads the product id from the ?id= query parameter,
 * renders the drink, handles size + quantity selection, adds the item to
 * the cart and shows a helpful fallback when the id is missing or unknown.
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  const state = {
    product: null,
    sizeId: 'regular',
    qty: 1
  };

  /** Show the "product not found" state */
  function renderNotFound(message) {
    const main = $('[data-product-main]');
    const fallback = $('[data-product-fallback]');
    if (main) main.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      const text = $('[data-fallback-message]');
      if (text) text.textContent = message;
    }
  }

  /** The size option that is currently selected */
  function currentSize() {
    const sizes = state.product.sizes;
    return (
      sizes.find(function (size) {
        return size.id === state.sizeId;
      }) || sizes[0]
    );
  }

  /** Update the displayed price for the current size + quantity */
  function updatePrice() {
    const size = currentSize();
    const total = size.price * state.qty;

    const priceEl = $('[data-unit-price]');
    const totalEl = $('[data-total-price]');
    const qtyEl = $('[data-qty-value]');

    if (priceEl) priceEl.textContent = BB.formatIDR(size.price);
    if (totalEl) totalEl.textContent = BB.formatIDR(total);
    if (qtyEl) qtyEl.textContent = String(state.qty);

    // Disable the decrement button at 1
    const minus = $('[data-qty-minus]');
    if (minus) minus.disabled = state.qty <= 1;

    // The add-to-cart button carries the live total
    const addBtn = $('[data-add-to-cart]');
    if (addBtn) {
      addBtn.setAttribute('data-size', size.id);
      addBtn.setAttribute('data-qty', String(state.qty));
      const label = $('[data-add-label]');
      if (label) label.textContent = 'Add to cart · ' + BB.formatIDR(total);
    }
  }

  /** Render the product detail content */
  function renderProduct(product) {
    state.product = product;
    state.sizeId = product.sizes[0].id;
    state.qty = 1;

    const main = $('[data-product-main]');
    const fallback = $('[data-product-fallback]');
    if (main) main.hidden = false;
    if (fallback) fallback.hidden = true;

    // --- Text ---
    const titleEl = $('[data-product-title]');
    if (titleEl) {
      titleEl.textContent = product.name;
      document.title = product.name + ' — Brew & Bloom';
    }

    const taglineEl = $('[data-product-tagline]');
    if (taglineEl) taglineEl.textContent = product.tagline;

    const descEl = $('[data-product-description]');
    if (descEl) descEl.textContent = product.description;

    const longEl = $('[data-product-long-description]');
    if (longEl) longEl.textContent = product.longDescription;

    const badgeEl = $('[data-product-badge]');
    if (badgeEl) {
      if (product.badge) {
        badgeEl.textContent = product.badge;
        badgeEl.hidden = false;
      } else {
        badgeEl.hidden = true;
      }
    }

    // --- Image ---
    const imgWrap = $('[data-product-image]');
    if (imgWrap) {
      imgWrap.innerHTML =
        '<img src="' + BB.escapeHtml(product.image) + '" alt="' +
        BB.escapeHtml(product.name + ' — ' + product.tagline) +
        '" width="800" height="1000" decoding="async">';
    }

    // --- Rating ---
    const ratingEl = $('[data-product-rating]');
    if (ratingEl) {
      ratingEl.innerHTML =
        BB.icon('star', 'icon--filled') +
        '<span>' + product.rating.toFixed(1) + '</span>' +
        '<span class="text-subtle">(' + BB.formatNumber(product.reviews) +
        ' sample reviews)</span>';
    }

    // --- Size options ---
    const sizeList = $('[data-size-options]');
    if (sizeList) {
      sizeList.innerHTML = product.sizes
        .map(function (size, index) {
          const checked = index === 0 ? ' checked' : '';
          return (
            '<label class="option">' +
            '<input type="radio" name="size" value="' + BB.escapeHtml(size.id) + '"' +
            checked + '>' +
            '<span class="option__dot" aria-hidden="true"></span>' +
            '<span class="option__text">' +
            '<span class="option__name">' + BB.escapeHtml(size.label) + '</span>' +
            '<span class="option__meta">' + BB.escapeHtml(size.volume) + ' · ' +
            BB.formatIDR(size.price) + '</span>' +
            '</span></label>'
          );
        })
        .join('');

      $$('input[name="size"]', sizeList).forEach(function (input) {
        input.addEventListener('change', function () {
          state.sizeId = input.value;
          updatePrice();
        });
      });
    }

    // --- Info table ---
    const infoEl = $('[data-product-info]');
    if (infoEl) {
      infoEl.innerHTML =
        '<tr><th scope="row">Origin</th><td>' + BB.escapeHtml(product.origin) + '</td></tr>' +
        '<tr><th scope="row">Roast</th><td>' + BB.escapeHtml(product.roast) + '</td></tr>' +
        '<tr><th scope="row">Brew method</th><td>' + BB.escapeHtml(product.brew) + '</td></tr>' +
        '<tr><th scope="row">Caffeine</th><td>' + BB.escapeHtml(product.caffeine) + '</td></tr>' +
        '<tr><th scope="row">Category</th><td>' +
        BB.escapeHtml(categoryLabel(product.category)) + '</td></tr>';
    }

    // --- Tasting notes ---
    const notesEl = $('[data-product-notes]');
    if (notesEl) {
      notesEl.innerHTML = product.notes
        .map(function (note) {
          return '<span class="tag">' + BB.escapeHtml(note) + '</span>';
        })
        .join('');
    }

    // --- Add to cart button ---
    const addBtn = $('[data-add-to-cart]');
    if (addBtn) {
      addBtn.setAttribute('data-add-to-cart', product.id);
      addBtn.setAttribute('data-size', state.sizeId);
      addBtn.setAttribute('data-qty', String(state.qty));
    }

    updatePrice();
  }

  /** Human label for a category id */
  function categoryLabel(id) {
    if (typeof CATEGORIES === 'undefined') return id;
    const found = CATEGORIES.find(function (category) {
      return category.id === id;
    });
    return found ? found.label : id;
  }

  /** Render the "you might also like" row */
  function renderRelated(product) {
    const container = $('[data-related-grid]');
    if (!container || typeof PRODUCTS === 'undefined') return;

    const sameCategory = PRODUCTS.filter(function (item) {
      return item.id !== product.id && item.category === product.category;
    });
    const others = PRODUCTS.filter(function (item) {
      return item.id !== product.id && item.category !== product.category;
    });

    const related = sameCategory.concat(others).slice(0, 4);

    container.innerHTML = related
      .map(function (item) {
        return BBApp.productCardHTML(item, { compact: true });
      })
      .join('');

    BBApp.bindAddToCart(container);
  }

  /* ---------------------------------------------------------------- */
  /* Quantity selector                                                 */
  /* ---------------------------------------------------------------- */

  function initQuantity() {
    const minus = $('[data-qty-minus]');
    const plus = $('[data-qty-plus]');
    const value = $('[data-qty-value]');

    if (minus) {
      minus.addEventListener('click', function () {
        state.qty = Math.max(1, state.qty - 1);
        updatePrice();
        announceQuantity();
      });
    }

    if (plus) {
      plus.addEventListener('click', function () {
        state.qty = Math.min(20, state.qty + 1);
        updatePrice();
        announceQuantity();
      });
    }

    if (value) {
      value.addEventListener('change', function () {
        const parsed = parseInt(value.value, 10);
        state.qty = isNaN(parsed) ? 1 : Math.min(20, Math.max(1, parsed));
        updatePrice();
        announceQuantity();
      });
    }
  }

  /** Announce the new quantity to screen readers */
  function announceQuantity() {
    const live = $('[data-qty-live]');
    if (!live) return;
    live.textContent =
      'Quantity ' + state.qty + ', total ' +
      BB.formatIDR(currentSize().price * state.qty);
  }

  /* ---------------------------------------------------------------- */
  /* Add to cart                                                       */
  /* ---------------------------------------------------------------- */

  function initAddToCart() {
    const button = $('[data-add-to-cart]');
    if (!button) return;

    button.addEventListener('click', function () {
      const product = state.product;
      if (!product) return;

      const size = currentSize();
      BB.Cart.add(product.id, size.id, state.qty);

      button.classList.add('is-loading');
      button.disabled = true;

      window.setTimeout(function () {
        button.classList.remove('is-loading');
        button.disabled = false;
        BB.Toast.show(
          'Added to cart',
          state.qty + ' × ' + product.name + ' (' + size.label + ') · ' +
            BB.formatIDR(size.price * state.qty),
          'success'
        );
        if (window.BBCartBadge) {
          window.BBCartBadge.render();
          window.BBCartBadge.bump();
        }
      }, 320);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                              */
  /* ---------------------------------------------------------------- */

  function init() {
    const id = BB.getParam('id');

    if (!id) {
      renderNotFound(
        'No drink was selected. Pick a drink from the menu to see its details.'
      );
      return;
    }

    const product = BB.findProduct(id);
    if (!product) {
      renderNotFound(
        'We could not find a drink with the id “' + id +
          '”. It may have been removed from the menu.'
      );
      return;
    }

    renderProduct(product);
    renderRelated(product);
    initQuantity();
    initAddToCart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
