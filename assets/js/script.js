/* Dr. Mostafa Walyallah — site behavior
   Tiny, progressive enhancements. No framework. */

(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Footer year stamp ----------
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Scroll-reveal (progressive enhancement) ----------
  // Arm each .reveal element only when JS is running. If JS fails for any reason,
  // CSS leaves the element fully visible (no blank gaps).
  var allReveals = document.querySelectorAll('.reveal');
  allReveals.forEach(function (el) { el.classList.add('armed'); });

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 120px 0px' });
    allReveals.forEach(function (el) { revealObs.observe(el); });
    // Safety net: any reveal still hidden after 1.5s gets shown anyway.
    setTimeout(function () {
      allReveals.forEach(function (el) {
        if (!el.classList.contains('in')) el.classList.add('in');
      });
    }, 1500);
  } else {
    allReveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Number counter animation ----------
  function animateNumber(el) {
    var target = parseFloat(el.getAttribute('data-count') || el.textContent.replace(/[^\d.]/g, '')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var v = Math.round(target * eased);
      el.textContent = v + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateNumber(e.target);
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-count]').forEach(function (el) { statObs.observe(el); });
  }

  // ---------- Lightbox for gallery (CSS-driven, JS only opens overlay) ----------
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lb-cap');
    document.querySelectorAll('.gi img').forEach(function (img) {
      img.addEventListener('click', function () {
        if (!img.getAttribute('src')) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        var capEl = img.parentElement.querySelector('.caption');
        lbCap.innerHTML = capEl ? capEl.innerHTML : '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
      img.style.cursor = 'zoom-in';
    });
    function closeLb() {
      lightbox.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lb-close')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLb();
    });
  }
})();
