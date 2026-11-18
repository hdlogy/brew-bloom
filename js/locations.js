/**
 * Brew & Bloom — locations.js
 * Store locator page: renders the sample store records, filters them by
 * area and simulates a directions request.
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  const state = { area: 'All Areas', query: '' };

  /** Render one store card */
  function storeCardHTML(store) {
    const hours = store.hours
      .map(function (row) {
        return (
          '<tr><td>' + BB.escapeHtml(row.day) + '</td><td>' +
          BB.escapeHtml(row.open) + '</td></tr>'
        );
      })
      .join('');

    const features = store.features
      .map(function (feature) {
        return '<span class="badge">' + BB.escapeHtml(feature) + '</span>';
      })
      .join('');

    return (
      '<article class="store-card" id="' + BB.escapeHtml(store.id) + '">' +
      '<div class="store-card__media">' +
      '<img src="' + BB.escapeHtml(store.image) + '" alt="' +
      BB.escapeHtml(store.name + ' — sample demonstration photo') +
      '" width="640" height="360" loading="lazy" decoding="async">' +
      '</div>' +
      '<div class="store-card__body">' +
      '<span class="store-card__area">' + BB.icon('mapPin', 'icon--sm') +
      BB.escapeHtml(store.area) + '</span>' +
      '<h3 class="store-card__name">' + BB.escapeHtml(store.name) + '</h3>' +
      '<p class="store-card__address">' + BB.icon('mapPin', 'icon--sm') +
      '<span>' + BB.escapeHtml(store.address) + '</span></p>' +
      '<table class="hours-table">' +
      '<caption class="visually-hidden">Opening hours for ' +
      BB.escapeHtml(store.name) + '</caption>' +
      '<tbody>' + hours + '</tbody>' +
      '</table>' +
      '<div class="store-card__features">' + features + '</div>' +
      '<div class="store-card__actions">' +
      '<button type="button" class="btn btn--primary btn--sm" data-directions="' +
      BB.escapeHtml(store.name) + '">' + BB.icon('navigation', 'icon--sm') +
      '<span>Get directions</span></button>' +
      '<a class="btn btn--outline btn--sm" href="menu.html">View menu</a>' +
      '</div>' +
      '</div></article>'
    );
  }

  /** Stores matching the active area and search term */
  function filteredStores() {
    if (typeof STORES === 'undefined') return [];

    return STORES.filter(function (store) {
      if (state.area !== 'All Areas' && store.area !== state.area) return false;
      if (state.query) {
        const term = state.query.toLowerCase();
        const haystack = (store.name + ' ' + store.area + ' ' + store.address).toLowerCase();
        if (haystack.indexOf(term) === -1) return false;
      }
      return true;
    });
  }

  /** Render the store list */
  function renderStores() {
    const grid = $('[data-store-grid]');
    const empty = $('[data-store-empty]');
    const count = $('[data-store-count]');
    if (!grid) return;

    const matched = filteredStores();

    if (count) {
      count.textContent =
        matched.length + (matched.length === 1 ? ' sample store' : ' sample stores');
    }

    if (!matched.length) {
      grid.innerHTML = '';
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    grid.hidden = false;
    if (empty) empty.hidden = true;
    grid.innerHTML = matched.map(storeCardHTML).join('');
  }

  /** Render the area filter */
  function renderAreaFilter() {
    const container = $('[data-area-filters]');
    if (!container || typeof STORE_AREAS === 'undefined') return;

    container.innerHTML = STORE_AREAS.map(function (area) {
      const active = area === state.area;
      const count =
        area === 'All Areas'
          ? STORES.length
          : STORES.filter(function (s) {
              return s.area === area;
            }).length;

      return (
        '<button type="button" class="filter' + (active ? ' is-active' : '') +
        '" data-area="' + BB.escapeHtml(area) + '"' +
        (active ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' +
        BB.escapeHtml(area) +
        '<span class="filter__count">' + count + '</span></button>'
      );
    }).join('');

    $$('[data-area]', container).forEach(function (button) {
      button.addEventListener('click', function () {
        state.area = button.getAttribute('data-area');
        renderAreaFilter();
        renderStores();
      });
    });
  }

  /** Wire up the store search field */
  function initSearch() {
    const input = $('[data-store-search]');
    if (!input) return;

    const wrap = $('.search');
    const clearBtn = $('[data-store-search-clear]');

    function syncClear() {
      if (wrap) wrap.classList.toggle('has-value', input.value.length > 0);
    }

    input.addEventListener(
      'input',
      BB.debounce(function () {
        state.query = input.value;
        syncClear();
        renderStores();
      }, 180)
    );

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        state.query = '';
        syncClear();
        renderStores();
        input.focus();
      });
    }

    syncClear();
  }

  /** Simulated directions button */
  function initDirections() {
    const grid = $('[data-store-grid]');
    if (!grid) return;

    grid.addEventListener('click', function (event) {
      const button = event.target.closest('[data-directions]');
      if (!button) return;

      const storeName = button.getAttribute('data-directions');
      const original = button.innerHTML;

      button.classList.add('is-loading');
      button.disabled = true;

      window.setTimeout(function () {
        button.classList.remove('is-loading');
        button.disabled = false;
        button.innerHTML = original;
        BB.Toast.show(
          'Directions simulated',
          'This demo has no map service. In a real build, “' + storeName +
            '” would open your maps app.',
          'info'
        );
      }, 900);
    });
  }

  function init() {
    renderAreaFilter();
    initSearch();
    renderStores();
    initDirections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
