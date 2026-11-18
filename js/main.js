/**
 * Brew & Bloom — main.js
 * Page-level behaviour that is shared by every page:
 *   - mobile navigation drawer
 *   - active navigation highlighting
 *   - cart badge in the header
 *   - rendering shared product sections on the home page
 *   - rendering the footer from the shared data file
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  /* ---------------------------------------------------------------- */
  /* Mobile navigation drawer                                          */
  /* ---------------------------------------------------------------- */

  function initMobileNav() {
    const toggle = $('.nav__toggle');
    const drawer = $('.nav__drawer');
    if (!toggle || !drawer) return;

    const closeBtn = $('.nav__close', drawer);
    const scrim = $('.nav__scrim', drawer);
    let lastFocused = null;

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    toggle.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (scrim) scrim.addEventListener('click', closeDrawer);

    // Close when a link inside the drawer is used
    $$('.nav__link', drawer).forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Keep focus inside the drawer while it is open
    drawer.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
      const focusable = $$(
        'a[href], button:not([disabled]), input, select, textarea',
        drawer
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // If the viewport grows to desktop while the drawer is open, reset state
    window.addEventListener('resize', BB.debounce(function () {
      if (window.innerWidth >= 1024 && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    }, 150));
  }

  /* ---------------------------------------------------------------- */
  /* Active navigation state                                           */
  /* ---------------------------------------------------------------- */

  function initActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    $$('[data-nav]').forEach(function (link) {
      const target = link.getAttribute('href');
      const isMatch =
        target === current ||
        (current === '' && target === 'index.html') ||
        (target === 'index.html' && (current === '' || current === '/'));
      if (isMatch) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Cart badge in the header                                          */
  /* ---------------------------------------------------------------- */

  function initCartBadge() {
    const badge = $('.cart-btn__count');
    if (!badge) return;

    function render() {
      const count = BB.Cart.getCount();
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.hidden = count === 0;
      const btn = $('.cart-btn');
      if (btn) {
        btn.setAttribute(
          'aria-label',
          count === 0
            ? 'Shopping cart, empty'
            : 'Shopping cart, ' + count + ' item' + (count === 1 ? '' : 's')
        );
      }
    }

    render();

    // Re-render whenever the cart changes in another tab
    window.addEventListener('storage', function (event) {
      if (event.key === BB.CART_KEY) render();
    });

    // Expose a tiny API other scripts can call
    window.BBCartBadge = { render: render, bump: function () {
      badge.classList.add('is-bump');
      window.setTimeout(function () {
        badge.classList.remove('is-bump');
      }, 260);
    } };
  }

  /* ---------------------------------------------------------------- */
  /* Sticky navigation shadow                                          */
  /* ---------------------------------------------------------------- */

  function initNavScroll() {
    const nav = $('.nav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------- */
  /* Shared rendering helpers                                          */
  /* ---------------------------------------------------------------- */

  /**
   * Render a product card (molecule) as HTML.
   * @param {object} product  entry from PRODUCTS
   * @param {object} options  { compact: boolean }
   */
  function productCardHTML(product, options) {
    const opts = options || {};
    const badge = product.badge
      ? '<span class="badge badge--caramel product-card__badge">' +
        BB.escapeHtml(product.badge) +
        '</span>'
      : '';

    const desc = opts.compact
      ? ''
      : '<p class="product-card__desc">' + BB.escapeHtml(product.description) + '</p>';

    const meta =
      '<div class="product-card__meta">' +
      '<span class="product-card__rating">' +
      BB.icon('star', 'icon--filled') +
      '<span>' + product.rating.toFixed(1) + '</span>' +
      '<span aria-hidden="true">·</span>' +
      '<span>' + BB.formatNumber(product.reviews) + ' reviews</span>' +
      '</span>' +
      '</div>';

    return (
      '<article class="product-card' + (opts.compact ? ' product-card--grid' : '') + '">' +
      '<div class="product-card__media">' + badge +
      '<img src="' + BB.escapeHtml(product.image) + '" alt="' +
      BB.escapeHtml(product.name + ' — ' + product.tagline) +
      '" loading="lazy" decoding="async" width="600" height="750">' +
      '</div>' +
      '<div class="product-card__body">' +
      '<h3 class="product-card__title">' +
      '<a href="product.html?id=' + encodeURIComponent(product.id) + '">' +
      BB.escapeHtml(product.name) + '</a>' +
      '</h3>' +
      '<p class="product-card__tagline">' + BB.escapeHtml(product.tagline) + '</p>' +
      desc + meta +
      '<div class="product-card__footer">' +
      '<span class="product-card__price">' + BB.formatIDR(product.price) + '</span>' +
      '<div class="product-card__actions">' +
      '<a class="btn btn--outline btn--sm" href="product.html?id=' +
      encodeURIComponent(product.id) + '">Details</a>' +
      '<button type="button" class="btn btn--primary btn--sm product-card__add" data-add-to-cart="' +
      BB.escapeHtml(product.id) + '" data-size="regular" aria-label="Add ' +
      BB.escapeHtml(product.name) + ' to cart">' +
      BB.icon('plus') + '</button>' +
      '</div></div></div></article>'
    );
  }

  /** Attach add-to-cart behaviour to any button with [data-add-to-cart] */
  function bindAddToCart(scope) {
    $$('[data-add-to-cart]', scope || document).forEach(function (button) {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';

      button.addEventListener('click', function () {
        const productId = button.getAttribute('data-add-to-cart');
        const product = BB.findProduct(productId);
        if (!product) {
          BB.Toast.show('Item unavailable', 'That product could not be found.', 'error');
          return;
        }

        const sizeId = button.getAttribute('data-size') || 'regular';
        const size =
          product.sizes.find(function (s) {
            return s.id === sizeId;
          }) || product.sizes[0];

        BB.Cart.add(product.id, size.id, 1);

        // Brief loading state so the action is visible
        button.classList.add('is-loading');
        button.disabled = true;

        window.setTimeout(function () {
          button.classList.remove('is-loading');
          button.disabled = false;
          BB.Toast.show(
            'Added to cart',
            product.name + ' (' + size.label + ') · ' + BB.formatIDR(size.price),
            'success'
          );
          if (window.BBCartBadge) {
            window.BBCartBadge.render();
            window.BBCartBadge.bump();
          }
        }, 320);
      });
    });
  }

  /** Render the footer from the shared brand data */
  function renderFooter() {
    const container = $('[data-footer]');
    if (!container || typeof BRAND === 'undefined') return;

    const year = new Date().getFullYear();

    const socialHTML = BRAND.social
      .map(function (item) {
        return (
          '<a class="footer__social-link" href="' + BB.escapeHtml(item.href) +
          '" aria-label="' + BB.escapeHtml(item.label) + '">' +
          BB.icon(item.icon) + '</a>'
        );
      })
      .join('');

    container.innerHTML =
      '<div class="container container--wide">' +
      '<div class="footer__grid">' +

      '<div class="footer__brand">' +
      '<a class="brand" href="index.html">' +
      '<span class="brand__mark">' + BB.icon('leaf') + '</span>' +
      '<span class="brand__text">' +
      '<span class="brand__name">Brew &amp; Bloom</span>' +
      '<span class="brand__tag">Roastery &amp; Coffee Bar</span>' +
      '</span></a>' +
      '<p class="footer__about">' + BB.escapeHtml(BRAND.description) + '</p>' +
      '<div class="footer__social">' + socialHTML + '</div>' +
      '</div>' +

      '<div><h4>Explore</h4><ul class="footer__list">' +
      '<li><a href="menu.html">Full menu</a></li>' +
      '<li><a href="promotions.html">Promotions</a></li>' +
      '<li><a href="locations.html">Store locator</a></li>' +
      '<li><a href="about.html">Our story</a></li>' +
      '</ul></div>' +

      '<div><h4>Categories</h4><ul class="footer__list">' +
      '<li><a href="menu.html?category=coffee">Coffee</a></li>' +
      '<li><a href="menu.html?category=non-coffee">Non-Coffee</a></li>' +
      '<li><a href="menu.html?category=signature">Signature</a></li>' +
      '<li><a href="menu.html">All drinks</a></li>' +
      '</ul></div>' +

      '<div><h4>Visit us</h4><ul class="footer__contact">' +
      '<li>' + BB.icon('mapPin') + '<span>' + BB.escapeHtml(BRAND.address) + '</span></li>' +
      '<li>' + BB.icon('clock') + '<span>' + BB.escapeHtml(BRAND.hours) + '</span></li>' +
      '<li>' + BB.icon('phone') + '<a href="tel:' +
      BB.escapeHtml(BRAND.phone.replace(/\s/g, '')) + '">' +
      BB.escapeHtml(BRAND.phone) + '</a></li>' +
      '<li>' + BB.icon('mail') + '<a href="mailto:' + BB.escapeHtml(BRAND.email) + '">' +
      BB.escapeHtml(BRAND.email) + '</a></li>' +
      '</ul></div>' +

      '</div>' +

      '<div class="footer__bottom">' +
      '<p>&#169; ' + year + ' Brew &amp; Bloom. A university UI/UX rebrand case study ' +
      '&mdash; not a commercial website.</p>' +
      '<p class="footer__disclaimer">Original brand analysed: Kopi Kenangan. ' +
      'Brew &amp; Bloom is an original proposed visual identity created for academic purposes. ' +
      'All products, prices, promotions and store locations shown are sample data.</p>' +
      '</div></div>';
  }

  /* ---------------------------------------------------------------- */
  /* Home page sections                                                */
  /* ---------------------------------------------------------------- */

  /** Featured drinks — the products flagged `featured` in data.js */
  function renderFeatured() {
    const grid = $('[data-featured-grid]');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    const featured = PRODUCTS.filter(function (p) {
      return p.featured;
    }).slice(0, 6);

    grid.innerHTML = featured
      .map(function (product) {
        return productCardHTML(product, { compact: true });
      })
      .join('');

    bindAddToCart(grid);
  }

  /** Popular categories */
  function renderCategories() {
    const grid = $('[data-category-grid]');
    if (!grid || typeof CATEGORY_HIGHLIGHTS === 'undefined') return;

    grid.innerHTML = CATEGORY_HIGHLIGHTS.map(function (category) {
      return (
        '<a class="category-card" href="menu.html?category=' +
        encodeURIComponent(category.id) + '">' +
        '<div class="category-card__media">' +
        '<img src="' + BB.escapeHtml(category.image) + '" alt="' +
        BB.escapeHtml(category.title + ' category — ' + category.text) +
        '" loading="lazy" decoding="async" width="600" height="800">' +
        '</div>' +
        '<div class="category-card__body">' +
        '<h3 class="category-card__title">' + BB.escapeHtml(category.title) + '</h3>' +
        '<p class="category-card__text">' + BB.escapeHtml(category.text) + '</p>' +
        '<span class="category-card__cta">Browse ' +
        BB.escapeHtml(category.title) + BB.icon('arrowRight') +
        '</span>' +
        '</div></a>'
      );
    }).join('');
  }

  /** Store teaser on the home page */
  function renderStoreTeaser() {
    const list = $('[data-store-teaser]');
    if (!list || typeof STORES === 'undefined') return;

    list.innerHTML = STORES.slice(0, 3).map(function (store) {
      return (
        '<li class="store-teaser">' +
        '<span class="store-teaser__icon">' + BB.icon('mapPin') + '</span>' +
        '<span class="store-teaser__body">' +
        '<span class="store-teaser__name">' + BB.escapeHtml(store.name) + '</span>' +
        '<span class="store-teaser__meta">' + BB.escapeHtml(store.area) + ' · ' +
        BB.escapeHtml(store.hours[0].open) + '</span>' +
        '</span></li>'
      );
    }).join('');
  }

  /** Promotion preview on the home page */
  function renderPromoPreview() {
    const list = $('[data-promo-preview]');
    if (!list || typeof PROMOTIONS === 'undefined') return;

    list.innerHTML = PROMOTIONS.slice(0, 2).map(function (promo) {
      return (
        '<article class="promo-card promo-card--' + BB.escapeHtml(promo.accent) + '">' +
        '<div class="promo-card__media">' +
        '<span class="badge badge--sample promo-card__badge">Sample offer</span>' +
        '<img src="' + BB.escapeHtml(promo.image) + '" alt="' +
        BB.escapeHtml(promo.title + ' — ' + promo.tagline) +
        '" loading="lazy" decoding="async" width="600" height="375">' +
        '<span class="promo-card__discount">' + BB.escapeHtml(promo.discount) + '</span>' +
        '</div>' +
        '<div class="promo-card__body">' +
        '<h3 class="promo-card__title">' + BB.escapeHtml(promo.title) + '</h3>' +
        '<p class="promo-card__tagline">' + BB.escapeHtml(promo.tagline) + '</p>' +
        '<div class="promo-card__meta">' +
        '<span>' + BB.icon('calendar', 'icon--sm') + ' ' + BB.escapeHtml(promo.expiryLabel) + '</span>' +
        '</div>' +
        '<div class="promo-card__actions">' +
        '<a class="btn btn--primary btn--sm" href="promotions.html#' +
        BB.escapeHtml(promo.id) + '">View offer</a>' +
        '<a class="btn btn--outline btn--sm" href="product.html?id=' +
        encodeURIComponent(promo.productIds[0]) + '">See drinks</a>' +
        '</div></div></article>'
      );
    }).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Smooth page transitions (fallback for browsers without View Transitions) */
  /* ---------------------------------------------------------------- */
  function supportsViewTransitions() {
    return !!(
      window.CSS &&
      typeof CSS.supports === 'function' &&
      CSS.supports('view-transition-name', 'none')
    );
  }

  function initPageTransitions() {
    // Modern browsers handle cross-document transitions via CSS @view-transition.
    if (supportsViewTransitions()) return;

    var reducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    document.addEventListener('click', function (event) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var link = event.target && typeof event.target.closest === 'function'
        ? event.target.closest('a[href]')
        : null;
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' ||
          href.indexOf('javascript:') === 0 ||
          href.indexOf('mailto:') === 0 ||
          href.indexOf('tel:') === 0) {
        return;
      }

      var url;
      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      event.preventDefault();
      document.body.classList.add('is-page-leaving');
      window.setTimeout(function () {
        window.location.href = url.href;
      }, 180);
    }, true);
  }

  /* ---------------------------------------------------------------- */
  /* Bootstrap                                                         */
  /* ---------------------------------------------------------------- */

  function init() {
    initMobileNav();
    initActiveNav();
    initCartBadge();
    initNavScroll();
    renderFooter();
    // Page transitions disabled for presentation stability.
    // initPageTransitions();

    // Home page sections (no-ops when the containers are absent)
    renderFeatured();
    renderCategories();
    renderStoreTeaser();
    renderPromoPreview();

    // Any static add-to-cart buttons already in the markup
    bindAddToCart(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose the shared helpers so page scripts can reuse them
  window.BBApp = {
    productCardHTML: productCardHTML,
    bindAddToCart: bindAddToCart,
    renderFooter: renderFooter
  };
})();
