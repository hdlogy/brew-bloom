/**
 * Brew & Bloom — menu.js
 * Menu / shop page: renders the product grid, category filters and the
 * live search field. Filtering and searching are both client-side and
 * work together (a search term narrows the active category).
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  const state = {
    category: 'all',
    query: ''
  };

  /** All products, in the order they appear in data.js */
  function allProducts() {
    return typeof PRODUCTS === 'undefined' ? [] : PRODUCTS.slice();
  }

  /** Products matching the active category */
  function byCategory(products, category) {
    if (category === 'all') return products;
    return products.filter(function (product) {
      return product.category === category;
    });
  }

  /** Products matching the search query (name, tagline or description) */
  function bySearch(products, query) {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter(function (product) {
      return (
        product.name.toLowerCase().indexOf(term) !== -1 ||
        product.tagline.toLowerCase().indexOf(term) !== -1 ||
        product.description.toLowerCase().indexOf(term) !== -1
      );
    });
  }

  /** Count of products in a category (ignores the search term) */
  function countFor(category) {
    return byCategory(allProducts(), category).length;
  }

  /** Render the category filter buttons */
  function renderFilters() {
    const container = $('[data-filters]');
    if (!container || typeof CATEGORIES === 'undefined') return;

    container.innerHTML = CATEGORIES.map(function (category) {
      const count = countFor(category.id);
      const active = category.id === state.category;
      return (
        '<button type="button" class="filter' + (active ? ' is-active' : '') +
        '" data-category="' + BB.escapeHtml(category.id) + '"' +
        (active ? ' aria-pressed="true"' : ' aria-pressed="false"') +
        '>' +
        BB.icon(category.icon, 'icon--sm') +
        '<span>' + BB.escapeHtml(category.label) + '</span>' +
        '<span class="filter__count">' + count + '</span>' +
        '</button>'
      );
    }).join('');

    $$('[data-category]', container).forEach(function (button) {
      button.addEventListener('click', function () {
        state.category = button.getAttribute('data-category');
        renderFilters();
        renderProducts();
      });
    });
  }

  /** Render the product grid (or the empty state) */
  function renderProducts() {
    const grid = $('[data-product-grid]');
    const empty = $('[data-empty-state]');
    const countEl = $('[data-result-count]');
    if (!grid) return;

    const matched = bySearch(
      byCategory(allProducts(), state.category),
      state.query
    );

    // Update the result count
    if (countEl) {
      const noun = matched.length === 1 ? 'drink' : 'drinks';
      countEl.textContent =
        matched.length + ' ' + noun + ' found' +
        (state.query ? ' for “' + state.query + '”' : '');
    }

    if (!matched.length) {
      grid.innerHTML = '';
      grid.hidden = true;
      if (empty) {
        empty.hidden = false;
        const query = $('[data-empty-query]');
        if (query) {
          query.textContent = state.query
            ? 'We could not find anything matching “' + state.query + '”.'
            : 'There are no drinks in this category yet.';
        }
      }
      return;
    }

    grid.hidden = false;
    if (empty) empty.hidden = true;

    grid.innerHTML = matched
      .map(function (product) {
        return BBApp.productCardHTML(product, {});
      })
      .join('');

    BBApp.bindAddToCart(grid);

    // Staggered, smooth entrance for the freshly rendered cards
    $$('.product-card', grid).forEach(function (card, index) {
      card.style.animationDelay = Math.min(index, 10) * 45 + 'ms';
    });
  }

  /** Wire up the search field */
  function initSearch() {
    const input = $('[data-search]');
    const wrap = $('.search');
    if (!input) return;

    const clearBtn = $('[data-search-clear]');

    function syncClearButton() {
      if (wrap) wrap.classList.toggle('has-value', input.value.length > 0);
    }

    input.addEventListener(
      'input',
      BB.debounce(function () {
        state.query = input.value;
        syncClearButton();
        renderProducts();
      }, 180)
    );

    // Clear button
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        state.query = '';
        syncClearButton();
        renderProducts();
        input.focus();
      });
    }

    // Submitting the search form should not reload the page
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        state.query = input.value;
        syncClearButton();
        renderProducts();
      });
    }

    syncClearButton();
  }

  /** Read ?category=... from the URL and apply it */
  function applyCategoryFromURL() {
    const requested = BB.getParam('category');
    if (!requested) return;

    const exists =
      typeof CATEGORIES !== 'undefined' &&
      CATEGORIES.some(function (category) {
        return category.id === requested;
      });

    if (exists) {
      state.category = requested;
    } else {
      BB.Toast.show(
        'Unknown category',
        'We could not find “' + requested + '”, so we showed the full menu.',
        'error'
      );
    }
  }

  function init() {
    applyCategoryFromURL();
    renderFilters();
    initSearch();
    renderProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
