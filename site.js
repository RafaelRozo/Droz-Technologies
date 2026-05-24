/* Droz Technologies — site.js
   Mega-menu · mobile drawer · scroll-spy · form UX · locale fallback.
   No dependencies. Last built: 2026-05-21.
*/
(function () {
  'use strict';

  // §1 — Mega-menu
  // Desktop opens on :hover via CSS (no JS needed).
  // Parent <a> always navigates — we never preventDefault, so a click always goes to the overview page.
  // We expose a small caret button (.mega-caret) for touch users to open the dropdown without navigating.
  var megas = document.querySelectorAll('.has-mega');
  megas.forEach(function (m) {
    var caret = m.querySelector('.mega-caret');
    if (caret) {
      caret.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        megas.forEach(function (o) { if (o !== m) o.classList.remove('is-open'); });
        m.classList.toggle('is-open');
      });
    }
  });
  document.addEventListener('click', function (e) {
    megas.forEach(function (m) {
      if (!m.contains(e.target)) m.classList.remove('is-open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') megas.forEach(function (m) { m.classList.remove('is-open'); });
  });

  // §2 — Mobile drawer
  var burger = document.querySelector('.nav-burger');
  var drawer = document.querySelector('.nav-drawer');
  var scrim  = document.querySelector('.nav-scrim');
  var closeBtn = document.querySelector('.nav-drawer-close');
  function setDrawer(open) {
    if (!drawer || !scrim) return;
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });

  // §3 — Scroll-spy on .toc
  var toc = document.querySelector('.toc');
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var sections = links.map(function (a) {
      var id = a.getAttribute('href').slice(1);
      return document.getElementById(id);
    }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  // §4 — Form submit UX (Web3Forms)
  var forms = document.querySelectorAll('form[action*="web3forms"]');
  forms.forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = f.querySelector('button[type="submit"], input[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
        .then(function (data) {
          var ok = data && (data.success === true || data.success === 'true');
          var msg = document.createElement('div');
          msg.className = ok ? 'form-success' : 'form-failure';
          msg.textContent = ok
            ? 'Thank you — your message reached the Droz team. We respond within one business day.'
            : 'Sorry — the message could not be sent. Please email contact@droz.tech directly.';
          f.replaceWith(msg);
        })
        .catch(function () {
          var msg = document.createElement('div');
          msg.className = 'form-failure';
          msg.textContent = 'Network error. Please email contact@droz.tech directly.';
          f.replaceWith(msg);
        });
    });
  });

  // §5 — Locale fallback tooltip (only fires if any data-fallback links remain)
  var fallbacks = document.querySelectorAll('.lang a[data-fallback="true"]');
  fallbacks.forEach(function (a) {
    var tip;
    a.addEventListener('mouseenter', function () {
      var locale = a.getAttribute('data-locale') || a.textContent.trim();
      tip = document.createElement('div');
      tip.className = 'lang-tip';
      tip.textContent = 'Not yet translated — taking you to the ' + locale + ' home.';
      document.body.appendChild(tip);
      var r = a.getBoundingClientRect();
      tip.style.top  = (window.scrollY + r.bottom + 8) + 'px';
      tip.style.left = (window.scrollX + r.left) + 'px';
    });
    a.addEventListener('mouseleave', function () { if (tip) { tip.remove(); tip = null; } });
  });

  // §6 — Machine-translation notice dismiss (session-scoped)
  var mt = document.querySelector('.mt-notice');
  if (mt) {
    try { if (sessionStorage.getItem('droz-mt-dismissed') === '1') mt.classList.add('is-dismissed'); } catch (e) {}
    var mtx = mt.querySelector('.mt-notice-x');
    if (mtx) mtx.addEventListener('click', function () {
      mt.classList.add('is-dismissed');
      try { sessionStorage.setItem('droz-mt-dismissed', '1'); } catch (e) {}
    });
  }
})();
