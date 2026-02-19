/* === Droz Technologies — Animation Engine ===
   IntersectionObserver, counters, parallax
   Pure vanilla JS, no dependencies
   =========================================== */

(function () {
  'use strict';

  // Bail on reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === Page Load Fade-in ===
  function initLoadState() {
    // Small delay to ensure styles are applied
    requestAnimationFrame(function () {
      document.body.classList.add('loaded');
    });
  }

  // === Hero Text Stagger ===
  function initHeroAnimation() {
    var heroes = document.querySelectorAll('.hero-animate');
    if (!heroes.length) return;
    // Trigger after a brief delay for load
    setTimeout(function () {
      heroes.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 100);
  }

  // === Scroll Reveal (IntersectionObserver) ===
  function initScrollReveal() {
    var elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // === Number Counter ===
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (prefersReducedMotion) return; // Numbers already show static

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var text = el.textContent.trim();
    // Extract number, prefix ($), suffix (+, %, etc.)
    var match = text.match(/^([^0-9]*)([0-9,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    var prefix = match[1];
    var targetStr = match[2].replace(/,/g, '');
    var suffix = match[3];
    var target = parseFloat(targetStr);
    var hasDecimal = targetStr.indexOf('.') !== -1;
    var hasComma = match[2].indexOf(',') !== -1;
    var duration = 1200;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (hasDecimal) {
        current = current.toFixed(targetStr.split('.')[1].length);
      } else {
        current = Math.round(current);
      }

      if (hasComma) {
        current = Number(current).toLocaleString('en-US');
      }

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // === Subtle Parallax ===
  function initParallax() {
    var parallaxEls = document.querySelectorAll('.parallax-hero');
    if (!parallaxEls.length || prefersReducedMotion) return;

    var ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          parallaxEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var inView = rect.bottom > 0 && rect.top < window.innerHeight;
            if (inView) {
              var offset = scrollY * 0.12;
              el.style.transform = 'translateY(' + offset + 'px)';
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // === Smooth Scroll for Anchor Links ===
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // === Auto-tag elements for animation ===
  function autoTagElements() {
    // Section headings
    document.querySelectorAll('h2.serif, .divisions-header h2, .work-header h2, .contact h2, .connect-promo h2').forEach(function (el) {
      if (!el.hasAttribute('data-animate') && !el.closest('.hero')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Image containers
    document.querySelectorAll('.img-container, .hero-image-container').forEach(function (el) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Work cards
    var cards = document.querySelectorAll('.work-card');
    cards.forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
        el.setAttribute('data-animate-delay', String(Math.min(i + 1, 4)));
      }
    });

    // Connect stats
    var stats = document.querySelectorAll('.connect-stat');
    stats.forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
        el.setAttribute('data-animate-delay', String(Math.min(i + 1, 4)));
      }
    });

    // Division items
    var divItems = document.querySelectorAll('.division-item');
    divItems.forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
        el.setAttribute('data-animate-delay', String(Math.min(i + 1, 3)));
      }
    });

    // Stat values — add counter
    document.querySelectorAll('.hero-stat-value, .connect-stat-value').forEach(function (el) {
      if (!el.hasAttribute('data-counter')) {
        el.setAttribute('data-counter', '');
      }
    });

    // Generic sections / cards on subpages
    document.querySelectorAll('.service-card, .case-card, .feature-card, .stat-card, .benefit-card, .pricing-card, .industry-card, .step-card, .team-card, [class*="-card"]').forEach(function (el) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Section-level elements on subpages
    document.querySelectorAll('section > .container > h2, section > .container > .section-header').forEach(function (el) {
      if (!el.hasAttribute('data-animate') && !el.closest('.hero')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Hero elements — tag for hero animation
    var hero = document.querySelector('.hero');
    if (hero) {
      var h1 = hero.querySelector('h1');
      var heroP = hero.querySelector('.hero-right > p, .hero-text > p, .hero p:not(.hero-stat-label)');
      var heroCta = hero.querySelector('.btn, .cta-btn, a[class*="btn"]');
      var heroStats = hero.querySelector('.hero-stats');

      if (h1 && !h1.classList.contains('hero-animate')) {
        h1.classList.add('hero-animate');
        h1.setAttribute('data-hero-delay', '0');
      }
      if (heroP && !heroP.classList.contains('hero-animate')) {
        heroP.classList.add('hero-animate');
        heroP.setAttribute('data-hero-delay', '1');
      }
      if (heroStats && !heroStats.classList.contains('hero-animate')) {
        heroStats.classList.add('hero-animate');
        heroStats.setAttribute('data-hero-delay', '2');
      }
      if (heroCta && !heroCta.classList.contains('hero-animate')) {
        heroCta.classList.add('hero-animate');
        heroCta.setAttribute('data-hero-delay', '3');
      }
    }

    // Parallax on hero images
    document.querySelectorAll('.hero-image-container img, .hero .img-hero').forEach(function (el) {
      if (!el.classList.contains('parallax-hero')) {
        el.classList.add('parallax-hero');
      }
    });
  }

  // === Init ===
  function init() {
    autoTagElements();
    initLoadState();
    initHeroAnimation();
    initScrollReveal();
    initCounters();
    initParallax();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
