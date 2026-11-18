/**
 * Brew & Bloom — core.js
 * Shared utilities used by every page: formatting, DOM helpers, the cart
 * store (localStorage), icons and toast notifications.
 *
 * Everything is exposed on the global `BB` object so the rest of the code
 * stays simple and dependency-free. No modules are used so that the site
 * also works when opened directly from the file system.
 */

'use strict';

const BB = (function () {
  /* ---------------------------------------------------------------- */
  /* Formatting                                                        */
  /* ---------------------------------------------------------------- */

  /** Format a number as Indonesian Rupiah, e.g. 34000 -> "Rp 34.000" */
  const idrFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  function formatIDR(value) {
    return idrFormatter.format(Number(value) || 0);
  }

  /** Format a plain number with Indonesian thousand separators */
  function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(Number(value) || 0);
  }

  /** Escape a string so it can be safely inserted via innerHTML */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------------------------------------------------------------- */
  /* DOM helpers                                                       */
  /* ---------------------------------------------------------------- */

  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) =>
    Array.from((scope || document).querySelectorAll(selector));

  /** Build an element from a tag, attribute map and children */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === 'class') node.className = attrs[key];
        else if (key === 'text') node.textContent = attrs[key];
        else if (key === 'html') node.innerHTML = attrs[key];
        else if (key.startsWith('on') && typeof attrs[key] === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else if (attrs[key] !== null && attrs[key] !== undefined) {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  /** Read a query parameter from the current URL */
  function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  /** Debounce a function (used for the live search field) */
  function debounce(fn, wait) {
    let timer = null;
    return function () {
      const args = arguments;
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  }


  /* ---------------------------------------------------------------- */
  /* Icons — inline SVG so they need no extra network requests          */
  /* ---------------------------------------------------------------- */

  const ICON_PATHS = {
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    cup: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.4l-1.9-5.8L4 10.7l6.1-1.9L12 3Z"/><path d="M18 17l.8 2.2L21 20l-2.2.8L18 23l-.8-2.2L15 20l2.2-.8L18 17Z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    seed: '<path d="M12 22V9"/><path d="M12 9C12 5 9 2 4 2c0 5 3 8 8 8Z"/><path d="M12 9c0-4 3-7 8-7 0 5-3 8-8 8Z"/>',
    tag: '<path d="M12.6 2.7a2 2 0 0 0-1.4-.6H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.6 8.6a2 2 0 0 0 2.8 0l7.2-7.2a2 2 0 0 0 0-2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z"/>',
    tiktok: '<path d="M15 2v11.5a4.5 4.5 0 1 1-4-4.47"/><path d="M15 2c0 3 2 5 5 5v3c-1.8 0-3.4-.6-5-1.7"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    navigation: '<path d="m3 11 19-9-9 19-2-8-8-2Z"/>',
    truck: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8Z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    receipt: '<path d="M4 2v20l2.5-1.5L9 22l2.5-1.5L14 22l2.5-1.5L19 22V2l-2.5 1.5L14 2l-2.5 1.5L9 2 6.5 3.5 4 2Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
    coffee: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"/>'
  };


  /**
   * Return inline SVG markup for a named icon.
   * @param {string} name  key from ICON_PATHS
   * @param {string} cls   optional extra class names
   */
  function icon(name, cls) {
    const path = ICON_PATHS[name];
    if (!path) return '';
    return (
      '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      path +
      '</svg>'
    );
  }

  /* ---------------------------------------------------------------- */
  /* Cart store — persisted in localStorage for the demo only          */
  /* ---------------------------------------------------------------- */

  const CART_KEY = 'brewandbloom.cart.v1';
  const MAX_QTY = 20;

  /**
   * A cart line: { productId, sizeId, qty }
   * Price is always looked up from the PRODUCTS table at render time so a
   * stale localStorage entry can never change what a customer pays.
   */
  function readCart() {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(function (line) {
          return (
            line &&
            typeof line.productId === 'string' &&
            typeof line.sizeId === 'string' &&
            Number.isFinite(Number(line.qty))
          );
        })
        .map(function (line) {
          return {
            productId: line.productId,
            sizeId: line.sizeId,
            qty: Math.min(MAX_QTY, Math.max(1, Number(line.qty) || 1))
          };
        });
    } catch (err) {
      // Corrupted or unavailable storage (private mode) -> start empty.
      return [];
    }
  }

  function writeCart(lines) {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch (err) {
      /* Storage unavailable — the cart still works for this page view. */
    }
  }

  /** Unique key for a cart line */
  function lineKey(productId, sizeId) {
    return productId + '::' + sizeId;
  }

  const Cart = {
    /** All raw cart lines */
    getLines: readCart,

    /** Cart lines resolved against the product table (drops unknown ids) */
    getItems: function () {
      const lines = readCart();
      const resolved = [];
      lines.forEach(function (line) {
        const product = findProduct(line.productId);
        if (!product) return;
        const size =
          product.sizes.find(function (s) {
            return s.id === line.sizeId;
          }) || product.sizes[0];
        resolved.push({
          key: lineKey(product.id, size.id),
          product: product,
          size: size,
          qty: line.qty,
          lineTotal: size.price * line.qty
        });
      });
      return resolved;
    },

    /** Total number of cups in the cart */
    getCount: function () {
      return readCart().reduce(function (sum, line) {
        return sum + line.qty;
      }, 0);
    },

    /** Sum of all line totals */
    getSubtotal: function () {
      return this.getItems().reduce(function (sum, item) {
        return sum + item.lineTotal;
      }, 0);
    },

    /** Add `qty` of a product/size. Returns the resulting cart count. */
    add: function (productId, sizeId, qty) {
      const amount = Math.max(1, Number(qty) || 1);
      const lines = readCart();
      const key = lineKey(productId, sizeId);
      const existing = lines.find(function (line) {
        return lineKey(line.productId, line.sizeId) === key;
      });

      if (existing) {
        existing.qty = Math.min(MAX_QTY, existing.qty + amount);
      } else {
        lines.push({
          productId: productId,
          sizeId: sizeId,
          qty: Math.min(MAX_QTY, amount)
        });
      }

      writeCart(lines);
      return this.getCount();
    },

    /** Set an absolute quantity for a line. Quantity 0 removes the line. */
    setQty: function (productId, sizeId, qty) {
      const amount = Math.max(0, Number(qty) || 0);
      let lines = readCart();
      const key = lineKey(productId, sizeId);

      if (amount === 0) {
        lines = lines.filter(function (line) {
          return lineKey(line.productId, line.sizeId) !== key;
        });
      } else {
        lines = lines.map(function (line) {
          if (lineKey(line.productId, line.sizeId) === key) {
            line.qty = Math.min(MAX_QTY, amount);
          }
          return line;
        });
      }

      writeCart(lines);
      return this.getCount();
    },

    /** Remove a line entirely */
    remove: function (productId, sizeId) {
      return this.setQty(productId, sizeId, 0);
    },

    /** Empty the cart */
    clear: function () {
      writeCart([]);
      return 0;
    },

    /** Restore the cart from a saved order (used after a demo checkout) */
    restore: function (lines) {
      writeCart(lines || []);
      return this.getCount();
    }
  };

  /** Find a product by id (delegates to the shared data file) */
  function findProduct(id) {
    if (typeof PRODUCTS === 'undefined') return null;
    return PRODUCTS.find(function (p) {
      return p.id === id;
    }) || null;
  }

  /* ---------------------------------------------------------------- */
  /* Toast notifications                                               */
  /* ---------------------------------------------------------------- */

  const Toast = {
    _stack: null,

    _ensureStack: function () {
      if (!this._stack || !document.body.contains(this._stack)) {
        this._stack = el('div', {
          class: 'toast-stack',
          role: 'region',
          'aria-label': 'Notifications'
        });
        document.body.appendChild(this._stack);
      }
      return this._stack;
    },

    /**
     * Show a toast message.
     * @param {string} title  bold headline
     * @param {string} text   optional supporting line
     * @param {string} type   'success' | 'error' | 'info'
     */
    show: function (title, text, type) {
      const kind = type || 'success';
      const stack = this._ensureStack();

      const iconName =
        kind === 'error' ? 'alert' : kind === 'info' ? 'info' : 'check';

      const toast = el('div', {
        class: 'toast toast--' + kind,
        role: kind === 'error' ? 'alert' : 'status',
        'aria-live': kind === 'error' ? 'assertive' : 'polite'
      });

      toast.innerHTML =
        '<span class="toast__icon">' + icon(iconName) + '</span>' +
        '<div class="toast__body">' +
        '<p class="toast__title">' + escapeHtml(title) + '</p>' +
        (text ? '<p class="toast__text">' + escapeHtml(text) + '</p>' : '') +
        '</div>' +
        '<button type="button" class="toast__close" aria-label="Dismiss notification">' +
        icon('close') +
        '</button>';

      const dismiss = function () {
        if (!toast.parentNode) return;
        toast.classList.add('is-leaving');
        window.setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 260);
      };

      $('.toast__close', toast).addEventListener('click', dismiss);
      stack.appendChild(toast);

      window.setTimeout(dismiss, 4200);
      return toast;
    }
  };

  /* ---------------------------------------------------------------- */
  /* Image helper with graceful fallback                              */
  /* ---------------------------------------------------------------- */

  /**
   * Build an <img> that swaps to a neutral placeholder if the file is
   * missing, so a broken asset never leaves an empty box on the page.
   */
  function imgElement(src, alt, cls) {
    const img = el('img', {
      src: src,
      alt: alt,
      loading: 'lazy',
      decoding: 'async'
    });
    if (cls) img.className = cls;
    img.addEventListener('error', function () {
      img.removeAttribute('src');
      img.alt = alt + ' (image unavailable)';
      img.classList.add('is-broken');
    });
    return img;
  }

  /* ---------------------------------------------------------------- */
  /* Global error handler — so nothing fails silently during a demo   */
  /* ---------------------------------------------------------------- */

  function handleError(message, source, lineno, colno, error) {
    var msg = String(message || 'An error occurred');
    if (source) msg += '\n' + source;
    if (lineno) msg += ' (line ' + lineno + ')';
    // Defer so the current call stack can finish before showing the toast
    window.setTimeout(function () {
      BB.Toast.show('JavaScript error', msg, 'error');
    }, 100);
    return true; // prevent the default console error from being the only signal
  }

  window.onerror = handleError;

  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason && event.reason.message
      ? event.reason.message
      : String(event.reason || 'Promise rejected');
    window.setTimeout(function () {
      BB.Toast.show('JavaScript error', reason, 'error');
    }, 100);
  });

  return {
    $: $,
    $$: $$,
    el: el,
    getParam: getParam,
    debounce: debounce,
    escapeHtml: escapeHtml,
    formatIDR: formatIDR,
    formatNumber: formatNumber,
    icon: icon,
    ICON_PATHS: ICON_PATHS,
    findProduct: findProduct,
    Cart: Cart,
    Toast: Toast,
    imgElement: imgElement,
    CART_KEY: CART_KEY
  };
})();
