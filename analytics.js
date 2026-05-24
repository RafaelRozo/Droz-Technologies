/* Droz Technologies — analytics.js
   Google Analytics 4 (G-G3NER3MPW7) + Meta Pixel (1532229697701487).
   Sourced from droz-technologies-v2. Loaded from the <head> of every page.
   Change the two IDs below in this single file to update tracking everywhere. */
(function () {
  'use strict';

  var GA_ID = 'G-G3NER3MPW7';
  var FB_PIXEL_ID = '1532229697701487';

  /* ── Google Analytics 4 (gtag.js) ── */
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  /* ── Meta (Facebook) Pixel ── */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
})();
