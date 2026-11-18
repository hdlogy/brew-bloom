/**
 * Brew & Bloom — order-summary.js
 * Order summary page: shows the cart contents, validates a simple mock
 * checkout form on the client and shows a simulated confirmation.
 *
 * IMPORTANT: nothing is sent anywhere. No payment is taken, no account is
 * created and no personal data is stored. The form only asks for a name
 * and a contact address so the demo has something to validate.
 */

'use strict';

(function () {
  const $ = BB.$;
  const $$ = BB.$$;

  /* ---------------------------------------------------------------- */
  /* Rendering the summary                                             */
  /* ---------------------------------------------------------------- */

  function renderOrder() {
    const list = $('[data-order-items]');
    const empty = $('[data-order-empty]');
    const layout = $('[data-order-layout]');
    if (!list) return;

    const items = BB.Cart.getItems();
    const subtotal = items.reduce(function (sum, item) {
      return sum + item.lineTotal;
    }, 0);
    const count = items.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);

    if (!items.length) {
      list.innerHTML = '';
      list.hidden = true;
      if (empty) empty.hidden = false;
      if (layout) layout.hidden = true;
      return;
    }

    list.hidden = false;
    if (empty) empty.hidden = true;
    if (layout) layout.hidden = false;

    list.innerHTML = items
      .map(function (item) {
        return (
          '<div class="order-item">' +
          '<div class="order-item__media">' +
          '<img src="' + BB.escapeHtml(item.product.image) + '" alt="' +
          BB.escapeHtml(item.product.name) + '" width="104" height="104" loading="lazy">' +
          '</div>' +
          '<div>' +
          '<p class="order-item__name">' + BB.escapeHtml(item.product.name) + '</p>' +
          '<p class="order-item__meta">' + BB.escapeHtml(item.size.label) + ' · ' +
          'Qty ' + item.qty + ' · ' + BB.formatIDR(item.size.price) + ' each</p>' +
          '</div>' +
          '<p class="order-item__price">' + BB.formatIDR(item.lineTotal) + '</p>' +
          '</div>'
        );
      })
      .join('');

    const subtotalEl = $('[data-order-subtotal]');
    const totalEl = $('[data-order-total]');
    const countEl = $('[data-order-count]');
    if (subtotalEl) subtotalEl.textContent = BB.formatIDR(subtotal);
    if (totalEl) totalEl.textContent = BB.formatIDR(subtotal);
    if (countEl) {
      countEl.textContent =
        count + (count === 1 ? ' item' : ' items') + ' · no delivery fee';
    }
  }

  /* ---------------------------------------------------------------- */
  /* Form validation rules                                             */
  /* ---------------------------------------------------------------- */

  const RULES = {
    name: {
      label: 'Full name',
      test: function (value) {
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'Your name looks too short.';
        if (!/^[a-zA-ZÀ-ɏ\s'.-]+$/.test(value.trim())) {
          return 'Please use letters only.';
        }
        return '';
      }
    },
    email: {
      label: 'Email address',
      test: function (value) {
        if (!value.trim()) return 'Please enter an email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      }
    },
    phone: {
      label: 'Phone number',
      test: function (value) {
        if (!value.trim()) return 'Please enter a phone number.';
        const digits = value.replace(/[^\d]/g, '');
        if (digits.length < 8) return 'Please enter a valid phone number.';
        if (digits.length > 15) return 'That phone number looks too long.';
        return '';
      }
    },
    address: {
      label: 'Delivery address',
      test: function (value) {
        if (!value.trim()) return 'Please enter an address.';
        if (value.trim().length < 10) return 'Please enter a more complete address.';
        return '';
      }
    },
    notes: {
      label: 'Order notes',
      test: function () {
        return ''; // optional field
      }
    }
  };

  /* ---------------------------------------------------------------- */
  /* Validating a single field                                         */
  /* ---------------------------------------------------------------- */

  function validateField(input) {
    const field = input.closest('.field');
    const rule = RULES[input.name];
    if (!field || !rule) return true;

    const message = rule.test(input.value);
    const errorEl = $('.field__error', field);

    if (message) {
      field.classList.add('is-error');
      field.classList.remove('is-success');
      if (errorEl) {
        errorEl.innerHTML = BB.icon('alert', 'icon--sm') +
          '<span>' + BB.escapeHtml(message) + '</span>';
      }
      input.setAttribute('aria-invalid', 'true');
      return false;
    }

    field.classList.remove('is-error');
    if (input.value.trim()) field.classList.add('is-success');
    else field.classList.remove('is-success');
    if (errorEl) errorEl.innerHTML = '';
    input.setAttribute('aria-invalid', 'false');
    return true;
  }

  /** Validate the whole form; returns true when everything passes */
  function validateForm(form) {
    let valid = true;
    let firstInvalid = null;

    $$('input, textarea', form).forEach(function (input) {
      if (!input.name) return;
      if (!validateField(input)) {
        valid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    const errorBox = $('[data-form-error-summary]');
    if (firstInvalid) {
      firstInvalid.focus();
      if (errorBox) {
        errorBox.hidden = false;
        errorBox.focus();
      }
    } else if (errorBox) {
      errorBox.hidden = true;
    }

    return valid;
  }

  /* ---------------------------------------------------------------- */
  /* Simulated checkout                                                */
  /* ---------------------------------------------------------------- */

  /** Build a fake order reference such as BB-7F3K92 */
  function buildReference() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 6; i += 1) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'BB-' + out;
  }

  function showConfirmation(form, items) {
    const formPanel = $('[data-order-form-panel]');
    const confirmPanel = $('[data-order-confirmation]');
    if (!confirmPanel) return;

    const reference = buildReference();
    const total = items.reduce(function (sum, item) {
      return sum + item.lineTotal;
    }, 0);

    const refEl = $('[data-confirmation-ref]');
    if (refEl) refEl.textContent = reference;

    const nameEl = $('[data-confirmation-name]');
    if (nameEl) {
      const nameInput = form.querySelector('[name="name"]');
      nameEl.textContent = nameInput ? nameInput.value.trim() : '';
    }

    const totalEl = $('[data-confirmation-total]');
    if (totalEl) totalEl.textContent = BB.formatIDR(total);

    const countEl = $('[data-confirmation-count]');
    if (countEl) {
      const count = items.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);
      countEl.textContent = count + (count === 1 ? ' item' : ' items');
    }

    if (formPanel) formPanel.hidden = true;
    confirmPanel.hidden = false;

    // Move focus to the confirmation for keyboard and screen-reader users
    confirmPanel.setAttribute('tabindex', '-1');
    confirmPanel.focus();
    confirmPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // The demo order is "placed" — empty the cart so the state stays consistent
    BB.Cart.clear();
    if (window.BBCartBadge) window.BBCartBadge.render();
  }

  /* ---------------------------------------------------------------- */
  /* Wiring up the checkout form                                       */
  /* ---------------------------------------------------------------- */

  function initForm() {
    const form = $('[data-order-form]');
    if (!form) return;

    // Validate a field when the user leaves it
    $$('input, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.value.trim() || input.hasAttribute('required')) {
          validateField(input);
        }
      });
      // Clear the error as soon as the user starts fixing it
      input.addEventListener('input', function () {
        const field = input.closest('.field');
        if (field && field.classList.contains('is-error')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!validateForm(form)) {
        BB.Toast.show(
          'Please check the form',
          'Some fields need attention before you can continue.',
          'error'
        );
        return;
      }

      const submitBtn = $('[data-order-submit]');
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      // Simulate a short "processing" delay so the state is visible
      window.setTimeout(function () {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }
        const items = BB.Cart.getItems();
        showConfirmation(form, items);
        BB.Toast.show(
          'Simulated order confirmed',
          'No payment was taken — this is a design prototype.',
          'success'
        );
      }, 700);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                              */
  /* ---------------------------------------------------------------- */

  function init() {
    renderOrder();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
