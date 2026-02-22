/* === Droz Technologies — Premium Animation Engine ===
   Framer-level quality. Pure vanilla JS.
   =================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // === Scroll Progress Bar ===
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (h > 0 ? (window.pageYOffset / h) * 100 : 0) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // === Custom Cursor ===
  function initCustomCursor() {
    if (isTouchDevice || prefersReducedMotion) return;
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible');
        ring.classList.add('visible');
      }
    });

    // Smooth ring follow
    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = 'translate(' + (rx - 18) + 'px,' + (ry - 18) + 'px)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .work-card, .division-item')) {
        dot.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .work-card, .division-item')) {
        dot.classList.remove('hovering');
      }
    });
  }

  // === Page Load ===
  function initLoadState() {
    requestAnimationFrame(function () {
      document.body.classList.add('js-ready');
      document.body.classList.add('loaded');
    });
  }

  // === Hero Cinematic Text Reveal ===
  function initHeroCinematic() {
    var lines = document.querySelectorAll('.hero-line');
    if (!lines.length) return;
    if (prefersReducedMotion) {
      lines.forEach(function (l) { l.classList.add('revealed'); });
      return;
    }
    setTimeout(function () {
      lines.forEach(function (line, i) {
        setTimeout(function () {
          line.classList.add('revealed');
        }, i * 200);
      });
    }, 300);
  }

  // === Rotating Text — Smooth Slide ===
  function initRotatingText() {
    var el = document.querySelector('.rotating-text');
    if (!el || prefersReducedMotion) return;
    var words = ['running', 'growing', 'protected', 'intelligent', 'connected'];
    var idx = 0;
    setInterval(function () {
      el.classList.add('slide-out');
      setTimeout(function () {
        idx = (idx + 1) % words.length;
        el.textContent = words[idx];
        el.classList.remove('slide-out');
        el.classList.add('slide-in-prepare');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.classList.remove('slide-in-prepare');
          });
        });
      }, 600);
    }, 3000);
  }

  // === Hero Parallax on Scroll ===
  function initHeroParallax() {
    var heroText = document.querySelector('.hero-parallax');
    if (!heroText || prefersReducedMotion) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          if (scrollY < window.innerHeight) {
            heroText.style.transform = 'translate3d(0,' + (scrollY * 0.3) + 'px,0)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // === Hero Animate (legacy) ===
  function initHeroAnimation() {
    var heroes = document.querySelectorAll('.hero-animate');
    if (!heroes.length) return;
    setTimeout(function () {
      heroes.forEach(function (el) { el.classList.add('is-visible'); });
    }, 100);
  }

  // === Scroll Reveal ===
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
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    elements.forEach(function (el) { observer.observe(el); });
  }

  // === Split Text Animation ===
  function initSplitText() {
    if (prefersReducedMotion) return;
    var headings = document.querySelectorAll('[data-split-text]');
    headings.forEach(function (el) {
      var text = el.textContent;
      el.innerHTML = '';
      el.setAttribute('aria-label', text);
      var chars = text.split('');
      chars.forEach(function (ch) {
        if (ch === ' ') {
          var space = document.createElement('span');
          space.className = 'split-space';
          space.innerHTML = '&nbsp;';
          el.appendChild(space);
        } else {
          var span = document.createElement('span');
          span.className = 'split-char';
          span.textContent = ch;
          span.setAttribute('aria-hidden', 'true');
          el.appendChild(span);
        }
      });
    });

    // Observe and reveal chars
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var chars = entry.target.querySelectorAll('.split-char');
          chars.forEach(function (ch, i) {
            ch.style.transitionDelay = (i * 0.025) + 's';
            setTimeout(function () { ch.classList.add('is-visible'); }, 10);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    headings.forEach(function (el) { observer.observe(el); });
  }

  // === Image Reveal ===
  function initImageReveal() {
    if (prefersReducedMotion) return;
    var images = document.querySelectorAll('.image-reveal');
    if (!images.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    images.forEach(function (el) { observer.observe(el); });
  }

  // === Number Counter (smooth easing) ===
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length || prefersReducedMotion) return;
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
    var match = text.match(/^([^0-9]*)([0-9,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    var prefix = match[1];
    var targetStr = match[2].replace(/,/g, '');
    var suffix = match[3];
    var target = parseFloat(targetStr);
    var hasDecimal = targetStr.indexOf('.') !== -1;
    var hasComma = match[2].indexOf(',') !== -1;
    var duration = 1600;
    var start = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutExpo(progress);
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
      } else {
        el.classList.add('stat-bounce');
      }
    }
    requestAnimationFrame(step);
  }

  // === Parallax Layers ===
  function initParallaxLayers() {
    if (prefersReducedMotion || isTouchDevice) return;
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          layers.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
              var yPos = (scrollY - el.offsetTop) * speed;
              el.style.transform = 'translate3d(0,' + yPos + 'px,0)';
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // === Enhanced Parallax (hero image) ===
  function initEnhancedParallax() {
    var heroImg = document.querySelector('.hero-image-container img');
    if (!heroImg || prefersReducedMotion) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = heroImg.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            heroImg.style.transform = 'translate3d(0,' + (window.pageYOffset * 0.2) + 'px,0)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // === Magnetic Hover on Buttons ===
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;
    var btns = document.querySelectorAll('.nav-contact, .form-submit, .connect-link, .btn, .cta-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) * 0.25;
        var dy = (e.clientY - cy) * 0.25;
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(function () { btn.style.transition = ''; }, 400);
      });
    });
  }

  // === 3D Card Tilt ===
  function initCardTilt() {
    if (isTouchDevice || prefersReducedMotion) return;
    var cards = document.querySelectorAll('.work-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 3) + 'deg) rotateX(' + (-y * 3) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // === Ripple Effect on CTA Buttons ===
  function initRipple() {
    if (prefersReducedMotion) return;
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.form-submit, .nav-contact, .btn, .cta-btn, .connect-link');
      if (!btn) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  }

  // === Page Transitions ===
  function initPageTransitions() {
    if (prefersReducedMotion) return;
    var overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') ||
          link.target === '_blank' || href.startsWith('http')) return;

      e.preventDefault();
      document.body.style.transform = 'translateY(-10px)';
      document.body.style.opacity = '0';
      document.body.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      setTimeout(function () { window.location.href = href; }, 300);
    });
  }

  // === Ken Burns ===
  function initKenBurns() {
    if (prefersReducedMotion) return;
    var imgs = document.querySelectorAll('.img-section, .img-hero');
    imgs.forEach(function (img) { img.classList.add('ken-burns'); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    imgs.forEach(function (img) { observer.observe(img); });
  }

  // === Smooth Scroll ===
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

  // === Auto-Tag Elements ===
  function autoTagElements() {
    /* Disabled: split-text hides headings until observer fires — causes blank headlines */
    /* document.querySelectorAll('.divisions-header h2, .work-header h2').forEach(function (el) {
      if (!el.hasAttribute('data-split-text') && !el.hasAttribute('data-animate')) {
        el.setAttribute('data-split-text', '');
      }
    }); */

    // Clip reveal on other headings
    /* Disabled: these headings should be visible immediately, not animation-gated */
    /* document.querySelectorAll('.contact h2, .connect-promo h2').forEach(function (el) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'clip-reveal');
      }
    }); */

    // Image containers — add image reveal
    document.querySelectorAll('.img-container').forEach(function (el) {
      if (!el.classList.contains('image-reveal')) {
        el.classList.add('image-reveal');
      }
    });
    // Hero image container as fade-up
    document.querySelectorAll('.hero-image-container').forEach(function (el) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Work cards — cascade
    document.querySelectorAll('.work-card').forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'card-cascade');
        el.setAttribute('data-animate-delay', String(i + 1));
      }
    });

    // Connect stats
    document.querySelectorAll('.connect-stat').forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', 'card-cascade');
        el.setAttribute('data-animate-delay', String(i + 1));
      }
    });

    // Division items — staggered slide
    document.querySelectorAll('.division-item').forEach(function (el, i) {
      if (!el.hasAttribute('data-animate')) {
        el.setAttribute('data-animate', i % 2 === 0 ? 'slide-left' : 'slide-right');
        el.style.transitionDelay = (i * 150) + 'ms';
      }
    });

    // Stat counters
    document.querySelectorAll('.hero-stat-value, .connect-stat-value').forEach(function (el) {
      if (!el.hasAttribute('data-counter')) {
        el.setAttribute('data-counter', '');
      }
    });

    // Parallax on images (not hero)
    document.querySelectorAll('.clients .img-container img').forEach(function (el) {
      if (!el.hasAttribute('data-parallax')) {
        el.setAttribute('data-parallax', '0.08');
      }
    });

    // Hero elements
    var hero = document.querySelector('.hero');
    if (hero) {
      var heroP = hero.querySelector('.hero-right > p');
      var heroStats = hero.querySelector('.hero-stats');
      if (heroP && !heroP.classList.contains('hero-animate')) {
        heroP.classList.add('hero-animate');
        heroP.setAttribute('data-hero-delay', '1');
      }
      if (heroStats && !heroStats.classList.contains('hero-animate')) {
        heroStats.classList.add('hero-animate');
        heroStats.setAttribute('data-hero-delay', '2');
      }
    }

    // Generic cards on subpages
    document.querySelectorAll('.service-card, .case-card, .feature-card, .stat-card, .benefit-card, .pricing-card, .industry-card, .step-card, .team-card, [class*="-card"]').forEach(function (el) {
      if (!el.hasAttribute('data-animate') && !el.classList.contains('work-card') && !el.classList.contains('connect-stat')) {
        el.setAttribute('data-animate', 'fade-up');
      }
    });

    // Parallax on hero image
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
    initScrollProgress();
    initCustomCursor();
    initHeroCinematic();
    initRotatingText();
    initHeroParallax();
    initHeroAnimation();
    initScrollReveal();
    initSplitText();
    initImageReveal();
    initCounters();
    initEnhancedParallax();
    initParallaxLayers();
    initMagneticButtons();
    initCardTilt();
    initRipple();
    initPageTransitions();
    initKenBurns();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
