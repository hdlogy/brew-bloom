/**
 * Brew & Bloom — promotions.js
 * Promotions page: renders the sample offers, filters them by category and
 * lets the visitor copy a promo code.
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  const state = { filter: 'all' };

  /** Render one promotion card */
  function promoCardHTML(promo) {
    const products = promo.productIds
      .map(function (id) {
        return BB.findProduct(id);
      })
      .filter(Boolean);

    const productLinks = products
      .map(function (product) {
        return (
          '<a class="btn btn--outline btn--sm" href="product.html?id=' +
          encodeURIComponent(product.id) + '">' +
          BB.escapeHtml(product.name) + '</a>'
        );
      })
      .join('');

    return (
      '<article class="promo-card promo-card--' + BB.escapeHtml(promo.accent) +
      '" id="' + BB.escapeHtml(promo.id) + '">' +
      '<div class="promo-card__media">' +
      '<span class="badge badge--sample promo-card__badge">Sample offer</span>' +
      '<img src="' + BB.escapeHtml(promo.image) + '" alt="' +
      BB.escapeHtml(promo.title + ' — ' + promo.tagline) +
      '" width="640" height="400" loading="lazy" decoding="async">' +
      '<span class="promo-card__discount">' + BB.escapeHtml(promo.discount) + '</span>' +
      '</div>' +
      '<div class="promo-card__body">' +
      '<h3 class="promo-card__title">' + BB.escapeHtml(promo.title) + '</h3>' +
      '<p class="promo-card__tagline">' + BB.escapeHtml(promo.tagline) + '</p>' +
      '<p class="promo-card__desc">' + BB.escapeHtml(promo.description) + '</p>' +
      '<div class="promo-card__meta">' +
      '<span>' + BB.icon('calendar', 'icon--sm') + ' ' +
      BB.escapeHtml(promo.expiryLabel) + '</span>' +
      '<span class="promo-card__code">' + BB.icon('tag', 'icon--sm') +
      BB.escapeHtml(promo.code) + '</span>' +
      '</div>' +
      '<div class="promo-card__actions">' +
      '<button type="button" class="btn btn--primary btn--sm" data-copy-code="' +
      BB.escapeHtml(promo.code) + '">Copy code</button>' +
      productLinks +
      '</div>' +
      '</div></article>'
    );
  }

  /** Render the filtered list of promotions */
  function renderPromotions() {
    const grid = $('[data-promo-grid]');
    const empty = $('[data-promo-empty]');
    if (!grid || typeof PROMOTIONS === 'undefined') return;

    const matched = PROMOTIONS.filter(function (promo) {
      if (state.filter === 'all') return true;
      return promo.appliesTo.indexOf(state.filter) !== -1;
    });

    if (!matched.length) {
      grid.innerHTML = '';
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    grid.hidden = false;
    if (empty) empty.hidden = true;
    grid.innerHTML = matched.map(promoCardHTML).join('');
  }

  /** Render the filter chips */
  function renderFilters() {
    const container = $('[data-promo-filters]');
    if (!container || typeof CATEGORIES === 'undefined') return;

    const options = [
      { id: 'all', label: 'All offers' },
      { id: 'coffee', label: 'Coffee' },
      { id: 'non-coffee', label: 'Non-Coffee' },
      { id: 'signature', label: 'Signature' }
    ];

    container.innerHTML = options
      .map(function (option) {
        const active = option.id === state.filter;
        return (
          '<button type="button" class="filter' + (active ? ' is-active' : '') +
          '" data-promo-filter="' + BB.escapeHtml(option.id) + '"' +
          (active ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' +
          BB.escapeHtml(option.label) + '</button>'
        );
      })
      .join('');

    $$('[data-promo-filter]', container).forEach(function (button) {
      button.addEventListener('click', function () {
        state.filter = button.getAttribute('data-promo-filter');
        renderFilters();
        renderPromotions();
      });
    });
  }

  /** Copy a promo code to the clipboard (with a fallback) */
  function initCopyCode() {
    const grid = $('[data-promo-grid]');
    if (!grid) return;

    grid.addEventListener('click', function (event) {
      const button = event.target.closest('[data-copy-code]');
      if (!button) return;

      const code = button.getAttribute('data-copy-code');

      function confirm() {
        const original = button.innerHTML;
        button.textContent = 'Copied!';
        button.classList.add('is-success');
        window.setTimeout(function () {
          button.innerHTML = original;
          button.classList.remove('is-success');
        }, 1600);
        BB.Toast.show('Code copied', code + ' — this is a sample code and cannot be redeemed.', 'info');
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(confirm).catch(function () {
          BB.Toast.show('Copy the code manually', code, 'info');
        });
      } else {
        BB.Toast.show('Copy the code manually', code, 'info');
      }
    });
  }

  function init() {
    renderFilters();
    renderPromotions();
    initCopyCode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
